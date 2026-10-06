/**
 * @file components/layout/Navbar.jsx
 * @description Barre de navigation fixe du portfolio.
 * Gère l'affichage desktop (liens centrés) et mobile (menu burger).
 * Inclut le switch light/dark mode.
 * Le lien CV ouvre un petit menu : CV (PDF) ou parcours raconté (présentation animée).
 * 
 * Props:
 * - activeLink: Lien actuellement actif
 * - menuOpen: État du menu mobile
 * - onNavClick: Callback lors du clic sur un lien
 * - onToggleMenu: Callback pour ouvrir/fermer le menu mobile
 * - isDark: État du thème (true = dark)
 * - onToggleTheme: Callback pour changer de thème
 */

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, PARCOURS_URL } from "../../data/constants";
import { SunIcon, MoonIcon } from "../../assets/icons";
import cvPdf from "../../assets/docs/CV-Ludovic-Fremaut-2.pdf";


/** Les deux formats du CV proposés dans le menu */
const CV_ITEMS = [
  { label: "CV (PDF)", hint: "Le CV classique", href: cvPdf },
  { label: "Parcours raconté · 8 min", hint: "Mon parcours en animation narrée", href: PARCOURS_URL },
];

/**
 * Menu déroulant [CV] (desktop) : CV PDF ou parcours raconté.
 * Se ferme au clic extérieur, avec Échap ou après un choix.
 */
function CvMenu({ label, isDark }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`text-xs font-medium tracking-[0.15em] transition-colors ${
          open
            ? isDark ? "text-white" : "text-slate-900"
            : isDark ? "text-slate-500 hover:text-white" : "text-slate-500 hover:text-slate-900"
        }`}
      >
        [{label}]
      </button>
      {open && (
        <div
          className={`absolute right-0 top-full mt-3 w-64 rounded-xl border p-2 shadow-xl ${
            isDark ? "bg-[#14141d] border-white/10" : "bg-white border-slate-200"
          }`}
        >
          {CV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 transition-colors ${
                isDark ? "hover:bg-white/10" : "hover:bg-slate-100"
              }`}
            >
              <span className={`block text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                {item.label}
              </span>
              <span className="block text-xs text-slate-500">{item.hint}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

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
            // Le lien CV ouvre un menu : CV PDF ou parcours raconté
            if (link.id === "cv") {
              return <CvMenu key={link.id} label={link.label} isDark={isDark} />;
            }
            
            // Autres liens : smooth scroll
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => onNavClick(link.label)}
                className={`text-xs font-medium tracking-[0.15em] transition-colors ${
                  activeLink === link.label
                    ? isDark ? "text-white" : "text-slate-900"
                    : isDark ? "text-slate-500 hover:text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                [{link.label}]
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
            // Les deux formats du CV, l'un sous l'autre
            if (link.id === "cv") {
              return CV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium tracking-widest text-slate-500"
                >
                  [{item.label.toUpperCase()}]
                </a>
              ));
            }
            
            // Autres liens : smooth scroll
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => onNavClick(link.label)}
                className={`text-sm font-medium tracking-widest ${
                  activeLink === link.label 
                    ? isDark ? "text-white" : "text-slate-900"
                    : "text-slate-500"
                }`}
              >
                [{link.label}]
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
