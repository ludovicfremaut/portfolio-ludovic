/**
 * @file router.js
 * @description Routeur minimal basé sur l'History API (pas de dépendance).
 *
 * - usePath() : chemin courant, mis à jour au clic et au bouton « retour » du navigateur.
 * - navigate(to) : change de page avec une transition animée (View Transitions API)
 *   puis place le focus sur l'ancre ou le titre principal de la nouvelle page
 *   quand le navigateur la connaît et que l'utilisateur n'a pas demandé moins d'animations.
 *   `to` peut contenir une ancre (ex. "/#contact") : la page défile alors jusqu'à elle.
 * - matchProject(path) : renvoie le slug si le chemin est une page projet (/projets/:slug).
 *
 * Le serveur (Cloudflare, `not_found_handling: single-page-application`) renvoie
 * index.html pour toutes les URL, et le build pré-génère une page HTML par projet
 * pour les aperçus de liens (voir vite.config.js).
 *
 * Exemple :
 * const path = usePath();
 * <a href="/projets/gosportnow" onClick={linkHandler("/projets/gosportnow")}>…</a>
 */

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

let currentTransition = null;

/** Lance `update` dans une transition de vue si possible */
function withTransition(update, direction) {
  if (!document.startViewTransition || prefersReducedMotion()) {
    update();
    return;
  }
  const root = document.documentElement;
  root.dataset.navDirection = direction;
  const transition = document.startViewTransition(update);
  currentTransition = transition;
  transition.finished.finally(() => {
    // Une transition plus récente a pu prendre la main : on ne nettoie que la sienne
    if (currentTransition === transition) {
      delete root.dataset.navDirection;
      currentTransition = null;
    }
  });
}

/**
 * Place le focus sur la cible de la page (ancre, sinon titre principal) pour que
 * le clavier et les lecteurs d'écran suivent le changement de page.
 */
function focusTarget(hash) {
  const el = (hash && document.getElementById(hash.slice(1))) || document.querySelector("main h1");
  if (!el) return;
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/** Défile sans animation (le CSS `scroll-behavior: smooth` gâcherait la transition) */
function jumpTo(hash, y = 0) {
  const el = hash && document.getElementById(hash.slice(1));
  if (el) el.scrollIntoView({ behavior: "instant" });
  else window.scrollTo({ top: y, behavior: "instant" });
}

let lastPath = typeof window !== "undefined" ? window.location.pathname : "/";

// Projet dont l'image fait le lien entre carte et page pendant la transition.
// Une seule carte porte ce nom à la fois (sinon toutes seraient capturées).
let transitionSlug = null;
export const getTransitionSlug = () => transitionSlug;
export const setTransitionSlug = (slug) => {
  transitionSlug = slug;
};

// Le défilement est restauré à la main (la page change sans rechargement)
if (typeof window !== "undefined") {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("popstate", (e) => {
    const { pathname, hash } = window.location;
    // Seule l'ancre a changé : le navigateur s'occupe du défilement
    if (pathname === lastPath) {
      if (!e.state?.scrollY && hash) jumpTo(hash);
      return;
    }
    const leftProject = matchProject(lastPath);
    if (leftProject) transitionSlug = leftProject;
    lastPath = pathname;
    withTransition(() => {
      flushSync(emit);
      if (e.state && "scrollY" in e.state) jumpTo(null, e.state.scrollY);
      else jumpTo(hash);
      // De retour sur la grille : le focus revient sur la carte du projet quitté
      const card = leftProject && document.querySelector(`[data-project-link="${leftProject}"]`);
      if (card) card.focus({ preventScroll: true });
      else focusTarget(null);
    }, "back");
  });
}

const getPath = () => window.location.pathname;

/** Chemin courant (sans l'ancre) */
export function usePath() {
  return useSyncExternalStore(subscribe, getPath, () => "/");
}

/**
 * À appeler une fois l'application affichée : une adresse ouverte directement
 * avec une ancre (ex. /#contact dans un nouvel onglet) défile jusqu'à elle.
 */
export function scrollToInitialHash() {
  if (window.location.hash) jumpTo(window.location.hash);
}

/** Remplace l'adresse courante sans animation (ex. projet introuvable → accueil) */
export function redirect(to) {
  history.replaceState({ scrollY: 0 }, "", to);
  lastPath = window.location.pathname;
  emit();
  window.scrollTo({ top: 0, behavior: "instant" });
}

/**
 * Change de page. `direction` ("forward" | "back") oriente l'animation.
 * @param {string} to Chemin cible, avec ancre éventuelle
 * @param {{ direction?: "forward" | "back" }} [options]
 */
export function navigate(to, { direction = "forward" } = {}) {
  const url = new URL(to, window.location.origin);
  const samePage = url.pathname === window.location.pathname;
  const leftProject = matchProject(window.location.pathname);
  if (leftProject && !samePage) transitionSlug = leftProject;

  // Même page : simple défilement vers l'ancre
  if (samePage) {
    if (url.hash) {
      history.replaceState(history.state, "", url.pathname + url.hash);
      const el = document.getElementById(url.hash.slice(1));
      el?.scrollIntoView({ behavior: prefersReducedMotion() ? "instant" : "smooth" });
      focusTarget(url.hash);
    }
    return;
  }

  // Mémorise la position de la page quittée, pour la retrouver au « retour »
  history.replaceState({ ...history.state, scrollY: window.scrollY }, "");
  const from = window.location.pathname;

  withTransition(() => {
    history.pushState({ scrollY: 0, from }, "", url.pathname + url.hash);
    lastPath = url.pathname;
    flushSync(emit);
    jumpTo(url.hash);
    focusTarget(url.hash);
  }, direction);
}

/**
 * Revient à `to`. Si la page précédente de l'historique est justement `to`,
 * on fait un vrai « retour » (position de défilement retrouvée), sinon on y va.
 */
export function goBackTo(to) {
  const url = new URL(to, window.location.origin);
  if (history.state?.from === url.pathname) history.back();
  else navigate(to, { direction: "back" });
}

/**
 * Gestionnaire de clic pour un lien interne : laisse le navigateur faire
 * (nouvel onglet, Ctrl/Cmd+clic…) et sinon change de page sans rechargement.
 * `options.back` : utiliser goBackTo (retour dans l'historique si possible).
 */
export function linkHandler(to, options = {}) {
  return (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (options.back) goBackTo(to);
    else navigate(to, options);
  };
}

/** Slug d'une page projet, ou null */
export function matchProject(path) {
  const m = path.match(/^\/projets\/([a-z0-9-]+)\/?$/);
  return m ? m[1] : null;
}
