/**
 * @file components/ui/ProjectCard.jsx
 * @description Carte de projet avec image de prévisualisation et tags.
 * Utilisée dans la section Projects pour afficher chaque projet.
 * Supporte light/dark mode.
 * 
 * Props:
 * - title: Nom du projet
 * - tech: Tableau de technologies/tags
 * - desc: Description du projet
 * - preview: URL de l'image de prévisualisation
 * - isDark: État du thème
 * 
 * Features:
 * - Hover effect avec scale et shadow
 * - Tags avec style spécial pour certains mots-clés
 */

import { ACCENT_TAGS } from "../../data/projects";

/**
 * Carte de présentation d'un projet
 */
export function ProjectCard({ title, tech, desc, preview, isDark = true }) {
  return (
    <div className={`rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 group ${
      isDark 
        ? "bg-[#14141c] border-slate-700/50 hover:border-slate-600 hover:shadow-xl hover:shadow-cyan-500/50" 
        : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-300/50"
    }`}>
      {/* Image de prévisualisation */}
      <div className="h-32 overflow-hidden relative">
        <img
          src={preview}
          alt={title}
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
        
        {/* Tags technologies */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tech.map((t) => (
            <span
              key={t}
              className={`text-[9px] font-semibold px-2 py-0.5 rounded border ${
                ACCENT_TAGS.includes(t)
                  ? "bg-purple-900/40 text-purple-300 border-purple-500/40"
                  : isDark 
                    ? "bg-slate-800/50 text-slate-300 border-slate-600/50"
                    : "bg-slate-100 text-slate-600 border-slate-300"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        
        {/* Description */}
        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          {desc}
        </p>
      </div>
    </div>
  );
}
