/**
 * @file components/sections/Projects.jsx
 * @description Section affichant la grille des projets.
 * Desktop: au hover, la carte s'expande au centre avec description détaillée.
 * Mobile: affichage classique en colonne.
 * Supporte light/dark mode.
 */

import { useState } from "react";
import { ProjectCard, ProjectCardExpanded } from "../ui/ProjectCard";
import { PROJECTS } from "../../data/projects";

/**
 * Section Projects avec grille de cartes et expansion au hover
 */
export function Projects({ isDark = true }) {
  // Index du projet survolé (desktop uniquement)
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="projets" className={`py-20 px-6 transition-colors duration-300 ${
      isDark ? "bg-transparent" : "bg-slate-100"
    }`}>
      <div className="max-w-5xl mx-auto">
        <h2 className={`text-center text-2xl font-bold uppercase tracking-[0.3em] mb-12 ${
          isDark ? "text-white" : "text-slate-800"
        }`}>
          Projets
        </h2>
        
        {/* Grille de projets - toujours interactive */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-300 ${
            hoveredIndex !== null ? "md:opacity-40" : ""
          }`}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {PROJECTS.map((project, index) => (
            <div
              key={project.title}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <ProjectCard {...project} isDark={isDark} isActive={hoveredIndex === index} />
            </div>
          ))}
        </div>

        {/* Carte expandée (desktop) - affichée SOUS la grille */}
        <div
          className={`hidden md:block mt-8 transition-all duration-300 ${
            hoveredIndex !== null ? "opacity-100" : "opacity-0 pointer-events-none h-0 mt-0 overflow-hidden"
          }`}
          onMouseEnter={() => setHoveredIndex(hoveredIndex)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex !== null && (
            <div className="max-w-3xl mx-auto">
              <ProjectCardExpanded
                {...PROJECTS[hoveredIndex]}
                isDark={isDark}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
