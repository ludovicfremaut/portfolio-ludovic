/**
 * @file router.js
 * @description Routeur minimal basé sur l'History API (pas de dépendance).
 *
 * - usePath() : chemin courant, mis à jour au clic et au bouton « retour » du navigateur.
 * - navigate(to) : change de page avec une transition animée (View Transitions API)
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

/** Lance `update` dans une transition de vue si possible */
function withTransition(update, direction) {
  if (!document.startViewTransition || prefersReducedMotion()) {
    update();
    return;
  }
  document.documentElement.dataset.navDirection = direction;
  const transition = document.startViewTransition(update);
  transition.finished.finally(() => {
    delete document.documentElement.dataset.navDirection;
  });
}

// Le défilement est restauré à la main (la page change sans rechargement)
if (typeof window !== "undefined") {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("popstate", (e) => {
    withTransition(() => {
      flushSync(emit);
      window.scrollTo(0, e.state?.scrollY ?? 0);
    }, "back");
  });
}

const getPath = () => window.location.pathname;

/** Chemin courant (sans l'ancre) */
export function usePath() {
  return useSyncExternalStore(subscribe, getPath, () => "/");
}

/** Fait défiler jusqu'à l'ancre (ou en haut de page) après un changement de page */
function scrollToTarget(hash) {
  if (hash) {
    const el = document.getElementById(hash.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: "auto" });
      return;
    }
  }
  window.scrollTo(0, 0);
}

/**
 * Change de page. `direction` ("forward" | "back") oriente l'animation.
 * @param {string} to Chemin cible, avec ancre éventuelle
 * @param {{ direction?: "forward" | "back" }} [options]
 */
export function navigate(to, { direction = "forward" } = {}) {
  const url = new URL(to, window.location.origin);
  const samePage = url.pathname === window.location.pathname;

  // Même page : simple défilement vers l'ancre
  if (samePage) {
    if (url.hash) {
      history.replaceState(history.state, "", url.pathname + url.hash);
      const el = document.getElementById(url.hash.slice(1));
      el?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
    return;
  }

  // Mémorise la position de la page quittée, pour la retrouver au « retour »
  history.replaceState({ ...history.state, scrollY: window.scrollY }, "");

  withTransition(() => {
    history.pushState({ scrollY: 0 }, "", url.pathname + url.hash);
    flushSync(emit);
    scrollToTarget(url.hash);
  }, direction);
}

/**
 * Gestionnaire de clic pour un lien interne : laisse le navigateur faire
 * (nouvel onglet, Ctrl/Cmd+clic…) et sinon change de page sans rechargement.
 */
export function linkHandler(to, options) {
  return (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to, options);
  };
}

/** Slug d'une page projet, ou null */
export function matchProject(path) {
  const m = path.match(/^\/projets\/([a-z0-9-]+)\/?$/);
  return m ? m[1] : null;
}
