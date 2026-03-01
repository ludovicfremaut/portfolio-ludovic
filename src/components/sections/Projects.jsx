/**
 * @file components/sections/Projects.jsx
 * @description Section affichant la grille des projets.
 * Utilise le composant ProjectCard pour chaque projet.
 * Supporte light/dark mode.
 * 
 * Layout: Grille responsive (1 col mobile, 2 cols tablette, 4 cols desktop)
 */

import { ProjectCard } from "../ui/ProjectCard";
import { PROJECTS } from "../../data/projects";

/**
 * Section Projects avec grille de cartes
 */
export function Projects({ isDark = true }) {
  return (
    <section id="projects" className={`py-20 px-6 transition-colors duration-300 ${
      isDark ? "bg-transparent" : "bg-slate-100"
    }`}>
      <div className="max-w-5xl mx-auto">
        <h2 className={`text-center text-2xl font-bold uppercase tracking-[0.3em] mb-12 ${
          isDark ? "text-white" : "text-slate-800"
        }`}>
          Projects
        </h2>
        
        {/* Grille de projets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
