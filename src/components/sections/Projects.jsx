/**
 * @file components/sections/Projects.jsx
 * @description Section affichant la grille des projets.
 * Au clic sur une card : elle devient active, la vue expandée s'affiche
 *   - sur mobile : directement en dessous de la card cliquée
 *   - sur desktop : sous toute la grille, pleine largeur
 * Un bouton "Voir plus" révèle progressivement les projets par paquets de 3.
 * Supporte light/dark mode.
 */

import { Fragment, useState } from "react";
import { ProjectCard, ProjectCardExpanded } from "../ui/ProjectCard";
import { PROJECTS } from "../../data/projects";

const INITIAL_VISIBLE = 3;
const STEP = 3;

/**
 * Section Projects avec grille de cartes et expansion au clic
 */
export function Projects({ isDark = true }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const visibleProjects = PROJECTS.slice(0, visibleCount);
  const hasMore = visibleCount < PROJECTS.length;

  const handleToggle = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  const handleShowMore = () => {
    setVisibleCount((count) => Math.min(count + STEP, PROJECTS.length));
  };

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

        {/* Grille de projets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleProjects.map((project, index) => {
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;
            return (
              <Fragment key={project.title}>
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isActive}
                  aria-controls={`project-expanded-${index}`}
                  className={`text-left w-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl ${
                    isDimmed ? "md:opacity-40" : "opacity-100"
                  } ${index >= INITIAL_VISIBLE ? "animate-card-reveal" : ""}`}
                >
                  <ProjectCard {...project} isDark={isDark} isActive={isActive} />
                </button>

                {/* Mobile : expand inline sous la card cliquée */}
                {isActive && (
                  <div id={`project-expanded-${index}`} className="md:hidden">
                    <ProjectCardExpanded {...project} isDark={isDark} />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* Desktop : expand pleine largeur sous la grille */}
        <div
          className={`hidden md:block mt-8 transition-all duration-300 ${
            activeIndex !== null ? "opacity-100" : "opacity-0 pointer-events-none h-0 mt-0 overflow-hidden"
          }`}
        >
          {activeIndex !== null && (
            <div id={`project-expanded-desktop-${activeIndex}`} className="max-w-3xl mx-auto">
              <ProjectCardExpanded {...PROJECTS[activeIndex]} isDark={isDark} />
            </div>
          )}
        </div>

        {/* Bouton "Voir plus" */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleShowMore}
              className={`font-semibold px-8 py-3 rounded-lg uppercase tracking-widest text-sm transition-all duration-200 border ${
                isDark
                  ? "bg-[#2a2a3a] hover:bg-[#3a3a4a] border-slate-600 hover:border-slate-500 hover:shadow-xl hover:shadow-cyan-500/50 text-white"
                  : "bg-slate-800 hover:bg-slate-700 border-slate-800 hover:border-slate-600 hover:shadow-xl hover:shadow-slate-300/50 text-white"
              }`}
            >
              Voir plus de projets
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
