/**
 * @file components/layout/Footer.jsx
 * @description Pied de page du portfolio.
 * Contient les liens vers les réseaux sociaux et le copyright.
 * Supporte light/dark mode.
 */

import { LinkedInIcon, GitHubIcon, StarIcon } from "../../assets/icons";
import { SOCIAL_LINKS, PERSONAL_INFO } from "../../data/constants";

/**
 * Footer avec liens sociaux et copyright
 */
export function Footer({ isDark = true }) {
  return (
    <footer className={`border-t py-10 text-center transition-colors duration-300 ${
      isDark 
        ? "bg-transparent border-white/5" 
        : "bg-slate-100 border-slate-200"
    }`}>
      {/* Liens réseaux sociaux */}
      <div className="flex justify-center items-center gap-5 mb-6">
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noreferrer"
          className={`transition-colors ${
            isDark ? "text-slate-500 hover:text-white hover:shadow-xl hover:shadow-cyan-500/50" : "text-slate-500 hover:text-slate-800 hover:shadow-xl hover:shadow-slate-300/50"
          }`}
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noreferrer"
          className={`transition-colors ${
            isDark ? "text-slate-500 hover:text-white hover:shadow-xl hover:shadow-cyan-500/50" : "text-slate-500 hover:text-slate-800 hover:shadow-xl hover:shadow-slate-300/50"
          }`}
          aria-label="GitHub"
        >
          <GitHubIcon />
        </a>
      </div>

      {/* Étoile décorative */}
      <div className="flex justify-center mb-4">
        <StarIcon className={`w-4 h-4 ${isDark ? "text-cyan-500" : "text-slate-300"}`} />
      </div>

      {/* Copyright */}
      <p className={`text-xs tracking-wider ${isDark ? "text-white" : "text-slate-700"}`}>
        © {PERSONAL_INFO.year} {PERSONAL_INFO.name} — {PERSONAL_INFO.location}.
      </p>
    </footer>
  );
}
