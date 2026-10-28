/**
 * @file components/sections/Projects.jsx
 * @description Section affichant la grille des projets.
 * - Filtres au-dessus de la grille (Tous, Sites web, Applications, IA, En équipe),
 *   avec le nombre de projets par filtre.
 * - Chaque carte mène à la page du projet (/projets/:slug), avec une transition animée.
 * - Les cartes apparaissent en cascade quand la grille entre dans l'écran.
 * - Un bouton "Voir plus" révèle les projets restants par paquets de 3.
 * Supporte light/dark mode.
 */

import { useMemo, useState } from "react";
import { ProjectCard } from "../ui/ProjectCard";
import { Reveal } from "../ui/Reveal";
import { PROJECTS, PROJECT_FILTERS } from "../../data/projects";

const INITIAL_VISIBLE = 6;
const STEP = 3;

/** Projets correspondant à un filtre */
const filterProjects = (filterId) =>
  filterId === "all" ? PROJECTS : PROJECTS.filter((p) => p.categories?.includes(filterId));

// Filtre et nombre de cartes gardés en mémoire entre deux pages : au retour
// d'une page projet, la grille est retrouvée telle qu'on l'a laissée.
const memory = { filter: "all", visibleCount: INITIAL_VISIBLE };
const remember = (patch) => Object.assign(memory, patch);

/**
 * Section Projects avec filtres et grille de cartes
 */
export function Projects({ isDark = true }) {
  const [filter, setFilterState] = useState(memory.filter);
  const [visibleCount, setVisibleCountState] = useState(memory.visibleCount);
  const setFilter = (v) => {
    remember({ filter: v });
    setFilterState(v);
  };
  const setVisibleCount = (next) => {
    remember({ visibleCount: next });
    setVisibleCountState(next);
  };

  const filteredProjects = useMemo(() => filterProjects(filter), [filter]);
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleFilter = (id) => {
    setFilter(id);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const handleShowMore = () => {
    setVisibleCount(Math.min(visibleCount + STEP, filteredProjects.length));
  };

  return (
    <section id="projets" className={`py-20 px-6 transition-colors duration-300 ${
      isDark ? "bg-transparent" : "bg-slate-100"
    }`}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <h2 className={`text-center text-2xl font-bold uppercase tracking-[0.3em] mb-8 ${
            isDark ? "text-white" : "text-slate-800"
          }`}>
            Projets
          </h2>
        </Reveal>

        {/* Filtres */}
        <Reveal delay={100} className="mb-10">
          <div role="group" aria-label="Filtrer les projets" className="flex flex-wrap justify-center gap-2">
            {PROJECT_FILTERS.map(({ id, label }) => {
              const count = filterProjects(id).length;
              if (count === 0) return null;
              const selected = filter === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleFilter(id)}
                  aria-pressed={selected}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                    selected
                      ? isDark
                        ? "bg-cyan-500/15 border-cyan-500/60 text-cyan-200"
                        : "bg-slate-800 border-slate-800 text-white"
                      : isDark
                        ? "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
                        : "border-slate-300 text-slate-600 hover:border-slate-500 hover:text-slate-900"
                  }`}
                >
                  {label}{" "}
                  <span className="text-[10px] tabular-nums">
                    {count}
                    <span className="sr-only">{count > 1 ? " projets" : " projet"}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grille de projets (la clé relance l'apparition à chaque filtre) */}
        <ul key={filter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleProjects.map((project, index) => (
            <Reveal as="li" key={project.slug} delay={(index % 3) * 90} className="h-full">
              <ProjectCard {...project} isDark={isDark} />
            </Reveal>
          ))}
        </ul>

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
              Voir plus de projets ({filteredProjects.length - visibleCount})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
