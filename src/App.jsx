/**
 * @file App.jsx
 * @description Composant racine du portfolio de Ludovic Fremaut.
 * 
 * Architecture:
 * - Utilise une séparation des responsabilités (SoC)
 * - Les données sont dans /data
 * - Les icônes SVG sont dans /assets/icons
 * - Les composants sont organisés par type (layout, sections, ui)
 * - La logique réutilisable est dans /hooks
 * 
 * Pages (routeur léger, voir router.js) :
 * - "/" : la page d'accueil ci-dessous
 * - "/projets/:slug" : la page d'un projet (transition animée depuis sa carte)
 * - toute autre adresse : retour à l'accueil
 *
 * Structure de la page d'accueil:
 * 1. Navbar (fixe en haut)
 * 2. Hero (présentation avec fond split)
 * 3. About (timeline du parcours)
 * 4. Projects (grille de projets)
 * 5. Contact (formulaire)
 * 6. Footer (liens sociaux)
 */

import { Navbar, Footer, Hero, About, Projects, Contact } from "./components";
import { useNavigation, useTheme } from "./hooks";
import { ProjectPage } from "./components/pages/ProjectPage";
import { Bot } from "./components/ui/Bot";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { findProject } from "./data/projects";
import { useEffect } from "react";
import { matchProject, redirect, scrollToInitialHash, usePath } from "./router";

/**
 * Composant principal de l'application
 */
export default function App() {
  const path = usePath();
  const slug = matchProject(path);
  const project = findProject(slug);
  const unknownProject = Boolean(slug) && !project;

  // Adresse de projet inconnue : retour à l'accueil (pas de page vide à cette adresse)
  useEffect(() => {
    if (unknownProject) redirect("/");
  }, [unknownProject]);

  // Ouverture directe d'une adresse avec ancre (ex. /#contact)
  useEffect(() => {
    scrollToInitialHash();
  }, []);
  const { activeLink, menuOpen, handleNav, toggleMenu } = useNavigation("ACCUEIL", path);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDark 
        ? "bg-gradient-to-b from-[#0d0d14] via-[#1a1a2e] to-[#2d2d3d] text-white" 
        : "bg-slate-100 text-slate-900"
    }`}>
      {/* Navigation */}
      <Navbar
        activeLink={activeLink}
        menuOpen={menuOpen}
        onNavClick={handleNav}
        onToggleMenu={toggleMenu}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <ScrollProgress isDark={isDark} />

      {project ? (
        <ProjectPage key={project.slug} project={project} isDark={isDark} />
      ) : (
        <main>
          <Hero isDark={isDark} />
          <About isDark={isDark} />
          <Projects isDark={isDark} />
          <Contact isDark={isDark} />
        </main>
      )}

      {/* Footer */}
      <Footer isDark={isDark} />

      {/* Petit robot qui accompagne la visite */}
      <Bot isDark={isDark} isHome={!project} />
    </div>
  );
}
