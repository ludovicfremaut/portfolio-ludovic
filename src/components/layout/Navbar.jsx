/**
 * @file components/layout/Navbar.jsx
 * @description Barre de navigation fixe du portfolio.
 * Gère l'affichage desktop (liens centrés) et mobile (menu burger).
 * Inclut le switch light/dark mode.
 * 
 * Props:
 * - activeLink: Lien actuellement actif
 * - menuOpen: État du menu mobile
 * - onNavClick: Callback lors du clic sur un lien
 * - onToggleMenu: Callback pour ouvrir/fermer le menu mobile
 * - isDark: État du thème (true = dark)
 * - onToggleTheme: Callback pour changer de thème
 */

import { NAV_LINKS } from "../../data/constants";
import { SunIcon, MoonIcon } from "../../assets/icons";
import cvPdf from "../../assets/docs/CV-Fremaut-Ludovic.pdf";

/**
 * Barre de navigation responsive
 */
export function Navbar({ activeLink, menuOpen, onNavClick, onToggleMenu, isDark, onToggleTheme }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-colors duration-300 ${
      isDark 
        ? "bg-[#0d0d14]/95 border-white/5" 
        : "bg-white/95 border-slate-200"
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Switch thème - gauche */}
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-lg transition-colors ${
            isDark 
              ? "hover:bg-white/10 text-slate-400 hover:text-white" 
              : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
          }`}
          aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
        >
          {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>

        {/* Liens desktop - centrés */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            // Le lien CV ouvre le PDF dans un nouvel onglet
            if (link === "CV") {
              return (
                <a
                  key={link}
                  href={cvPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-medium tracking-[0.15em] transition-colors ${
                    isDark ? "text-slate-500 hover:text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  [{link}]
                </a>
              );
            }
            
            // Autres liens : smooth scroll
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => onNavClick(link)}
                className={`text-xs font-medium tracking-[0.15em] transition-colors ${
                  activeLink === link
                    ? isDark ? "text-white" : "text-slate-900"
                    : isDark ? "text-slate-500 hover:text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                [{link}]
              </a>
            );
          })}
        </div>

        {/* Bouton burger mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={onToggleMenu}
          aria-label="Menu"
        >
          <span
            className={`block h-0.5 w-5 transition-all duration-200 ${
              isDark ? "bg-white" : "bg-slate-900"
            } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 transition-all duration-200 ${
              isDark ? "bg-white" : "bg-slate-900"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 transition-all duration-200 ${
              isDark ? "bg-white" : "bg-slate-900"
            } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>

        {/* Espace invisible pour équilibrer (desktop) */}
        <div className="hidden md:block w-9" />
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className={`md:hidden border-t px-6 py-4 flex flex-col gap-4 ${
          isDark 
            ? "bg-[#0d0d14] border-white/5" 
            : "bg-white border-slate-200"
        }`}>
          {NAV_LINKS.map((link) => {
            // Le lien CV ouvre le PDF dans un nouvel onglet
            if (link === "CV") {
              return (
                <a
                  key={link}
                  href={cvPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium tracking-widest ${
                    isDark ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  [{link}]
                </a>
              );
            }
            
            // Autres liens : smooth scroll
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => onNavClick(link)}
                className={`text-sm font-medium tracking-widest ${
                  activeLink === link 
                    ? isDark ? "text-white" : "text-slate-900"
                    : "text-slate-500"
                }`}
              >
                [{link}]
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
