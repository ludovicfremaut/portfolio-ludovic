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
 * Structure de la page:
 * 1. Navbar (fixe en haut)
 * 2. Hero (présentation avec fond split)
 * 3. About (timeline du parcours)
 * 4. Projects (grille de projets)
 * 5. Contact (formulaire)
 * 6. Footer (liens sociaux)
 */

import { Navbar, Footer, Hero, About, Projects, Contact } from "./components";
import { useNavigation, useTheme } from "./hooks";

/**
 * Composant principal de l'application
 */
export default function App() {
  const { activeLink, menuOpen, handleNav, toggleMenu } = useNavigation();
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

      {/* Sections */}
      <Hero isDark={isDark} />
      <About isDark={isDark} />
      <Projects isDark={isDark} />
      <Contact isDark={isDark} />

      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
}
