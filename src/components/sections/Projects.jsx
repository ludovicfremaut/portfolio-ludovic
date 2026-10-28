/**
 * @file components/sections/Projects.jsx
 * @description Section affichant la grille des projets.
 * - Filtres au-dessus de la grille (Tous, Sites web, Applications, IA, En équipe),
 *   avec le nombre de projets par filtre.
 * - Les cartes apparaissent en cascade quand la grille entre dans l'écran.
 * - Au clic sur une card : elle devient active, la vue détaillée s'affiche
 *     - sur mobile : directement en dessous de la card cliquée
 *     - sur desktop : sous toute la grille, pleine largeur, et la page défile jusqu'à elle
 *   (une seule vue détaillée est rendue à la fois, selon la largeur d'écran)
 *   Échap (focus dans la section) ou le bouton « Fermer » referme la vue détaillée
 *   et rend le focus à la carte.
 * - Un bouton "Voir plus" révèle progressivement les projets par paquets de 3.
 * Supporte light/dark mode.
 */

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProjectCard, ProjectCardExpanded } from "../ui/ProjectCard";
import { Reveal } from "../ui/Reveal";
import { PROJECTS, PROJECT_FILTERS } from "../../data/projects";

const INITIAL_VISIBLE = 6;
const STEP = 3;

/** Vrai sur écran large (md et plus) : la vue détaillée s'affiche alors sous la grille */
function useIsDesktop() {
  const query = "(min-width: 768px)";
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia?.(query).matches ?? true);
  useEffect(() => {
    const mql = window.matchMedia?.(query);
    if (!mql) return;
    const onChange = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

/** Projets correspondant à un filtre */
const filterProjects = (filterId) =>
  filterId === "all" ? PROJECTS : PROJECTS.filter((p) => p.categories?.includes(filterId));

/**
 * Section Projects avec filtres, grille de cartes et expansion au clic
 */
export function Projects({ isDark = true }) {
  const [filter, setFilter] = useState("all");
  // Le projet ouvert est repéré par son titre (stable quand on change de filtre)
  const [activeTitle, setActiveTitle] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const desktopPanelRef = useRef(null);
  const cardRefs = useRef({});
  const sectionRef = useRef(null);
  const isDesktop = useIsDesktop();

  const filteredProjects = useMemo(() => filterProjects(filter), [filter]);
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;
  const activeProject = visibleProjects.find((p) => p.title === activeTitle) ?? null;

  const handleToggle = (title) => {
    setActiveTitle((current) => (current === title ? null : title));
  };

  // Ferme le détail ; rend le focus à la carte seulement s'il était dans la section
  const handleClose = useCallback(() => {
    const focusInSection = sectionRef.current?.contains(document.activeElement);
    const card = cardRefs.current[activeTitle];
    setActiveTitle(null);
    if (focusInSection) card?.focus();
  }, [activeTitle]);

  const handleFilter = (id) => {
    setFilter(id);
    setActiveTitle(null);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const handleShowMore = () => {
    setVisibleCount((count) => Math.min(count + STEP, filteredProjects.length));
  };

  // Desktop : amène la vue détaillée à l'écran (elle s'affiche sous la grille)
  useEffect(() => {
    if (!activeProject) return;
    const panel = desktopPanelRef.current;
    if (!panel) return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    panel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }, [activeProject, isDesktop]);

  // Échap referme la vue détaillée, seulement quand le focus est dans la section Projets
  // (pas pendant la saisie du formulaire de contact ni dans une modale ou un menu)
  useEffect(() => {
    if (!activeTitle) return;
    const onKey = (e) => {
      if (e.key !== "Escape" || e.defaultPrevented) return;
      if (!sectionRef.current?.contains(document.activeElement)) return;
      handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeTitle, handleClose]);

  return (
    <section id="projets" ref={sectionRef} className={`py-20 px-6 transition-colors duration-300 ${
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
        <div key={filter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleProjects.map((project, index) => {
            const isActive = activeTitle === project.title;
            const isDimmed = activeProject !== null && !isActive;
            const panelId = "project-expanded";
            return (
              <Fragment key={project.title}>
                <Reveal delay={(index % 3) * 90} className="h-full">
                  <button
                    ref={(el) => { cardRefs.current[project.title] = el; }}
                    type="button"
                    onClick={() => handleToggle(project.title)}
                    aria-expanded={isActive}
                    aria-controls={isActive ? panelId : undefined}
                    className={`text-left w-full h-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl ${
                      isDimmed ? "md:opacity-40" : "opacity-100"
                    }`}
                  >
                    <ProjectCard {...project} isDark={isDark} isActive={isActive} />
                  </button>
                </Reveal>

                {/* Mobile : vue détaillée sous la card cliquée */}
                {isActive && !isDesktop && (
                  <div id={panelId} className="sm:col-span-2">
                    <ProjectCardExpanded {...project} isDark={isDark} onClose={handleClose} />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* Desktop : vue détaillée pleine largeur sous la grille */}
        {isDesktop && activeProject && (
          <div ref={desktopPanelRef} id="project-expanded" className="mt-8 max-w-3xl mx-auto scroll-mt-24">
            <ProjectCardExpanded key={activeProject.title} {...activeProject} isDark={isDark} onClose={handleClose} />
          </div>
        )}

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
