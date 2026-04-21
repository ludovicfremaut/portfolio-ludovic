/**
 * @file components/ui/ProjectCard.jsx
 * @description Carte de projet en 2 versions :
 * - ProjectCard : version compacte (grille)
 * - ProjectCardExpanded : version détaillée (overlay au hover desktop)
 * 
 * Supporte light/dark mode.
 */

import { ACCENT_TAGS } from "../../data/projects";

// ═══════════════════════════════════════════════════════════════════════════════
// VERSION COMPACTE - affichée dans la grille
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Carte compacte dans la grille
 */
export function ProjectCard({ title, tech, desc, preview, previewPosition = "center", isDark = true, isActive = false }) {
  return (
    <div
      className={`rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 group ${
        isActive
          ? isDark
            ? "bg-[#14141c] border-cyan-500/50 shadow-lg shadow-cyan-500/10 opacity-100 scale-105!"
            : "bg-white border-violet-400 shadow-lg shadow-violet-200/50 opacity-100 scale-105!"
          : isDark
            ? "bg-[#14141c] border-slate-700/50 hover:border-slate-600 hover:shadow-xl hover:shadow-cyan-500/10"
            : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-300/50"
      }`}
    >
      {/* Image de prévisualisation */}
      <div className="h-32 overflow-hidden relative">
        <img
          src={preview}
          alt={title}
          style={{ objectPosition: previewPosition }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 ${
          isDark 
            ? "bg-linear-to-t from-[#14141c] via-transparent to-transparent" 
            : "bg-linear-to-t from-white via-transparent to-transparent"
        }`} />
      </div>

      {/* Contenu de la carte */}
      <div className="p-4">
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
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VERSION EXPANDÉE - affichée en overlay au hover (desktop)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Carte expandée avec description détaillée et tous les tags
 */
export function ProjectCardExpanded({ title, tags, longDesc, preview, previewPosition = "center", url, isDark = true }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border-2 shadow-2xl animate-card-expand ${
        isDark 
          ? "bg-[#14141c] border-cyan-500/30 shadow-cyan-500/20" 
          : "bg-white border-violet-300 shadow-violet-200/50"
      }`}
    >
      <div className="flex min-h-56">
        {/* Image à gauche - hauteur adaptée au contenu */}
        <div className="w-2/5 relative overflow-hidden shrink-0">
          <img
            src={preview}
            alt={title}
            style={{ objectPosition: previewPosition }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${
            isDark
              ? "bg-linear-to-r from-transparent to-[#14141c]/80"
              : "bg-linear-to-r from-transparent to-white/80"
          }`} />
        </div>

        {/* Contenu détaillé à droite */}
        <div className="w-3/5 px-8 py-7 flex flex-col justify-center">
          {/* Titre */}
          <h3 className={`font-bold text-xl mb-4 ${isDark ? "text-white" : "text-slate-800"}`}>
            {title}
          </h3>

          {/* Tags détaillés */}
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                  ACCENT_TAGS.includes(tag)
                    ? "bg-cyan-600 text-white border-cyan-500/40"
                    : isDark
                      ? "bg-slate-800/80 text-cyan-300 border-cyan-500/30"
                      : "bg-violet-50 text-violet-700 border-violet-300/60"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description détaillée */}
          <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {longDesc}
          </p>

          {/* Bouton vers le site en ligne (si présent) */}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 mt-5 self-start font-semibold px-5 py-2.5 rounded-lg uppercase tracking-widest text-xs transition-all duration-200 border ${
                isDark
                  ? "bg-[#2a2a3a] hover:bg-[#3a3a4a] border-slate-600 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/30 text-white"
                  : "bg-slate-800 hover:bg-slate-700 border-slate-800 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-300/50 text-white"
              }`}
            >
              Voir le site
              <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
