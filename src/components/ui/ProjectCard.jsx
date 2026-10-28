/**
 * @file components/ui/ProjectCard.jsx
 * @description Carte de projet affichée dans la grille. C'est un lien vers la page
 * du projet (/projets/:slug) : au clic, l'image de la carte « s'agrandit » jusqu'à
 * devenir l'image de la page (View Transitions, nom partagé `projet-<slug>`).
 *
 * La carte affiche un badge « En ligne » quand le projet a un lien public.
 * Supporte light/dark mode.
 *
 * Props : celles d'un projet de data/projects.js, plus `isDark`.
 *
 * Exemple :
 * <ProjectCard {...project} isDark={isDark} />
 */

import { ACCENT_TAGS } from "../../data/projects";
import { linkHandler } from "../../router";

export function ProjectCard({ slug, title, tech, desc, preview, previewPosition = "center", url, isDark = true }) {
  const href = `/projets/${slug}`;
  return (
    <a
      href={href}
      onClick={linkHandler(href)}
      className={`group h-full flex flex-col rounded-xl overflow-hidden border transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
        isDark
          ? "bg-[#14141c] border-slate-700/50 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10"
          : "bg-white border-slate-200 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-200/60"
      }`}
    >
      {/* Image de prévisualisation (partagée avec la page projet pendant la transition) */}
      <div className="h-36 overflow-hidden relative shrink-0" style={{ viewTransitionName: `projet-${slug}` }}>
        <img
          src={preview}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ objectPosition: previewPosition }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 ${
          isDark
            ? "bg-linear-to-t from-[#14141c] via-transparent to-transparent"
            : "bg-linear-to-t from-white via-transparent to-transparent"
        }`} />
        {url && (
          <span className={`absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            isDark ? "bg-black/85 text-emerald-300" : "bg-white text-emerald-700"
          }`}>
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            En ligne
          </span>
        )}
      </div>

      {/* Contenu de la carte */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className={`font-bold text-base mb-3 ${isDark ? "text-white" : "text-slate-800"}`}>
          {title}
        </h3>

        {/* Tags technologies (version courte) */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tech.map((t) => (
            <span
              key={t}
              className={`text-[9px] font-semibold px-2 py-0.5 rounded border ${
                ACCENT_TAGS.includes(t)
                  ? "bg-cyan-600 text-white border-purple-500/40"
                  : isDark
                    ? "bg-slate-800/50 text-slate-300 border-slate-600/50"
                    : "bg-slate-100 text-slate-600 border-slate-300"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Description courte */}
        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          {desc}
        </p>

        {/* Invitation à ouvrir la page du projet */}
        <span className={`mt-auto pt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest transition-colors ${
          isDark ? "text-slate-400 group-hover:text-cyan-300" : "text-slate-600 group-hover:text-violet-700"
        }`}>
          Voir le projet
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </a>
  );
}
