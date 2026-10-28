/**
 * @file components/pages/ProjectPage.jsx
 * @description Page d'un projet (/projets/:slug).
 * - L'image en tête reprend celle de la carte (transition `projet-<slug>`).
 * - Description complète, technologies, équipe, liens, téléchargement (stores + QR code).
 * - Navigation vers le projet précédent / suivant et retour à la grille.
 * - Met à jour le titre de l'onglet. Le focus est placé sur le titre à l'arrivée
 *   par le routeur (annonce du changement de page pour les lecteurs d'écran).
 *
 * Props :
 * - project : un projet de data/projects.js
 * - isDark : thème sombre
 *
 * Exemple :
 * <ProjectPage project={findProject("gosportnow")} isDark />
 */

import { useEffect } from "react";
import QRCode from "react-qr-code";
import { PROJECTS, ACCENT_TAGS } from "../../data/projects";
import { linkHandler } from "../../router";
import { StoreButton, AppleIcon, GooglePlayIcon } from "../ui/StoreButtons";

// Titre de la page d'accueil (voir index.html), remis en place en quittant la page projet
const DEFAULT_TITLE = "Ludovic Fremaut · Développeur web et mobile";

export function ProjectPage({ project, isDark = true }) {
  const { slug, title, tags, longDesc, preview, previewPosition = "center", url, links, stores, team, downloadUrl } = project;

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  useEffect(() => {
    document.title = `${title} · Ludovic Fremaut`;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);

  const muted = isDark ? "text-slate-400" : "text-slate-600";
  const heading = isDark ? "text-white" : "text-slate-800";
  const accent = isDark ? "text-cyan-300" : "text-violet-700";
  const panel = isDark ? "bg-[#14141c] border-slate-700/60" : "bg-white border-slate-200";
  const button = isDark
    ? "bg-[#2a2a3a] hover:bg-[#3a3a4a] border-slate-600 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/30 text-white"
    : "bg-slate-800 hover:bg-slate-700 border-slate-800 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-300/50 text-white";

  return (
    <main className="pt-24 pb-20 px-6">
      <article className="max-w-5xl mx-auto">
        {/* Retour à la grille */}
        <a
          href="/#projets"
          onClick={linkHandler("/#projets", { back: true })}
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] mb-8 transition-colors ${
            isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span aria-hidden="true">←</span> Tous les projets
        </a>

        {/* Image partagée avec la carte */}
        <div
          className={`relative overflow-hidden rounded-2xl border aspect-[16/9] max-h-[62vh] w-full ${panel}`}
          style={{ viewTransitionName: `projet-${slug}` }}
        >
          <img
            src={preview}
            alt={`Aperçu du projet ${title}`}
            style={{ objectPosition: previewPosition }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="project-page-body mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_17rem]">
          {/* Colonne principale */}
          <div>
            <h1
              tabIndex={-1}
              className={`text-[clamp(2rem,5vw,3.25rem)] font-black leading-[1.05] tracking-tight mb-6 focus:outline-none ${heading}`}
            >
              {title}
            </h1>
            <p className={`text-base md:text-lg leading-relaxed max-w-[65ch] ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              {longDesc}
            </p>

            {/* Actions */}
            {(url || links?.length > 0) && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg uppercase tracking-widest text-xs transition-all duration-200 border ${button}`}
                  >
                    Voir le site
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {links?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-semibold underline underline-offset-4 ${accent} ${
                      isDark ? "decoration-cyan-500/40 hover:decoration-cyan-300" : "decoration-violet-300 hover:decoration-violet-700"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* Téléchargement : stores + QR code */}
            {(stores || downloadUrl) && (
              <div className="flex flex-wrap items-end gap-6 mt-8">
                {stores && (
                  <div className="flex flex-wrap gap-3">
                    {stores.ios && (
                      <StoreButton href={stores.ios} isDark={isDark} label="App Store" caption="Télécharger sur l'">
                        <AppleIcon />
                      </StoreButton>
                    )}
                    {stores.android && (
                      <StoreButton href={stores.android} isDark={isDark} label="Google Play" caption="Disponible sur">
                        <GooglePlayIcon />
                      </StoreButton>
                    )}
                  </div>
                )}
                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5"
                    aria-label={`Télécharger ${title} (QR code)`}
                  >
                    <div className="rounded-xl bg-white p-2 shadow-sm">
                      <QRCode value={downloadUrl} size={84} style={{ height: "84px", width: "84px" }} viewBox="0 0 84 84" />
                    </div>
                    <span className={`text-[10px] ${muted}`}>Scanner pour installer</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Colonne latérale : technologies et équipe */}
          <aside className="space-y-8">
            <section>
              <h2 className={`text-xs font-bold uppercase tracking-[0.25em] mb-3 ${accent}`}>Technologies</h2>
              <ul className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                      ACCENT_TAGS.includes(tag)
                        ? "bg-cyan-600 text-white border-cyan-500/40"
                        : isDark
                          ? "bg-slate-800/80 text-cyan-200 border-cyan-500/30"
                          : "bg-violet-50 text-violet-800 border-violet-300/60"
                    }`}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </section>

            {team?.length > 0 && (
              <section>
                <h2 className={`text-xs font-bold uppercase tracking-[0.25em] mb-3 ${accent}`}>Équipe</h2>
                <ul className="space-y-2">
                  {team.map((member) => (
                    <li
                      key={member.name}
                      className={`rounded-lg border px-3 py-2 ${
                        member.isMe
                          ? isDark ? "bg-cyan-500/10 border-cyan-500/50" : "bg-violet-50 border-violet-300"
                          : panel
                      }`}
                    >
                      <span className={`block text-sm font-bold ${heading}`}>
                        {member.name}{member.isMe && " (moi)"}
                      </span>
                      <span className={`block text-xs ${muted}`}>{member.role}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>

        {/* Projet précédent / suivant */}
        <nav aria-label="Autres projets" className="mt-16 grid gap-4 sm:grid-cols-2">
          {[
            { p: prev, label: "Projet précédent", dir: "back", align: "text-left" },
            { p: next, label: "Projet suivant", dir: "forward", align: "sm:text-right" },
          ].map(({ p, label, dir, align }) => (
            <a
              key={label}
              href={`/projets/${p.slug}/`}
              onClick={linkHandler(`/projets/${p.slug}/`, { direction: dir })}
              className={`group rounded-xl border p-5 transition-colors ${align} ${panel} ${
                isDark ? "hover:border-cyan-500/50" : "hover:border-violet-400"
              }`}
            >
              <span className={`block text-xs ${muted}`}>{label}</span>
              <span className={`block mt-1 font-bold ${heading}`}>
                {dir === "back" && <span aria-hidden="true">← </span>}
                {p.title}
                {dir === "forward" && <span aria-hidden="true"> →</span>}
              </span>
            </a>
          ))}
        </nav>

        {/* Appel au contact */}
        <div className={`mt-10 rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 ${panel}`}>
          <p className={`text-lg font-semibold ${heading}`}>
            Un projet qui ressemble à celui-ci ? Parlons-en.
          </p>
          <a
            href="/#contact"
            onClick={linkHandler("/#contact")}
            className={`self-start md:self-auto inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg uppercase tracking-widest text-xs transition-all duration-200 border ${button}`}
          >
            Écrire à Ludovic
          </a>
        </div>
      </article>
    </main>
  );
}
