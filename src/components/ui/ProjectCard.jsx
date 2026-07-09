/**
 * @file components/ui/ProjectCard.jsx
 * @description Carte de projet en 2 versions :
 * - ProjectCard : version compacte (grille)
 * - ProjectCardExpanded : version détaillée (overlay au hover desktop)
 * 
 * Supporte light/dark mode.
 */

import QRCode from "react-qr-code";
import { ACCENT_TAGS } from "../../data/projects";

// ═══════════════════════════════════════════════════════════════════════════════
// BOUTONS DE TÉLÉCHARGEMENT (stores)
// ═══════════════════════════════════════════════════════════════════════════════

/** Logo Apple */
function AppleIcon() {
  return (
    <svg viewBox="0 0 384 512" className="w-6 h-6 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

/** Logo Google Play */
function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 512 512" className="w-5 h-5 shrink-0" aria-hidden="true">
      <path fill="#00d0ff" d="M47 33.2c-4.2 4.5-6.7 11.5-6.7 20.5v404.6c0 9 2.5 16 6.7 20.5l1.4 1.3 226.6-226.6v-5.3L48.4 31.8z" />
      <path fill="#00e677" d="M50 33l225.9 225.9 75.2-75.2L84 30.1C69.3 21.7 55.9 21 50 33z" transform="translate(-1.6 -.9)" />
      <path fill="#ff3a44" d="M349.5 182.8 274.9 258l75.7 75.7 84.3-47.9c14.4-8.2 14.4-21.6 0-29.8z" />
      <path fill="#ffc900" d="M48.4 480.2c4.6 4.9 12.3 5.5 20.9.7l282.2-160.3-75.7-75.7z" transform="translate(-1.6 -.9)" />
    </svg>
  );
}

/** Bouton store (App Store / Google Play) avec logo, sur-titre et libellé */
function StoreButton({ href, isDark, label, caption, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-lg border transition-all duration-200 ${
        isDark
          ? "bg-[#2a2a3a] hover:bg-[#3a3a4a] border-slate-600 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/30 text-white"
          : "bg-slate-800 hover:bg-slate-700 border-slate-800 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-300/50 text-white"
      }`}
    >
      {children}
      <span className="flex flex-col leading-none text-left">
        <span className="text-[8px] uppercase tracking-wide opacity-70">{caption}</span>
        <span className="text-sm font-semibold">{label}</span>
      </span>
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VERSION COMPACTE - affichée dans la grille
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Carte compacte dans la grille
 */
export function ProjectCard({ title, tech, desc, preview, previewPosition = "center", isDark = true, isActive = false }) {
  return (
    <div
      className={`rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 group ${
        isActive
          ? isDark
            ? "bg-[#14141c] border-cyan-500/50 shadow-lg shadow-cyan-500/10 opacity-100 scale-105!"
            : "bg-white border-violet-400 shadow-lg shadow-violet-200/50 opacity-100 scale-105!"
          : isDark
            ? "bg-[#14141c] border-slate-700/50 hover:border-slate-600 hover:shadow-xl hover:shadow-cyan-500/10"
            : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-300/50"
      }`}
    >
      {/* Image de prévisualisation */}
      <div className="h-32 overflow-hidden relative">
        <img
          src={preview}
          alt={title}
          style={{ objectPosition: previewPosition }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 ${
          isDark 
            ? "bg-linear-to-t from-[#14141c] via-transparent to-transparent" 
            : "bg-linear-to-t from-white via-transparent to-transparent"
        }`} />
      </div>

      {/* Contenu de la carte */}
      <div className="p-4">
        <h3 className={`font-bold text-base mb-3 ${isDark ? "text-white" : "text-slate-800"}`}>
          {title}
        </h3>
        
        {/* Tags technologies (version courte) */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tech.map((t) => (
            <span
              key={t}
              className={`text-[9px] font-semibold px-2 py-0.5 rounded border ${
                ACCENT_TAGS.includes(t)
                  ? "bg-cyan-600 text-white border-purple-500/40"
                  : isDark 
                    ? "bg-slate-800/50 text-slate-300 border-slate-600/50"
                    : "bg-slate-100 text-slate-600 border-slate-300"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        
        {/* Description courte */}
        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          {desc}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VERSION EXPANDÉE - affichée en overlay au hover (desktop)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Carte expandée avec description détaillée et tous les tags
 */
export function ProjectCardExpanded({ title, tags, longDesc, preview, previewPosition = "center", url, stores, team, downloadUrl, isDark = true }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border-2 shadow-2xl animate-card-expand ${
        isDark 
          ? "bg-[#14141c] border-cyan-500/30 shadow-cyan-500/20" 
          : "bg-white border-violet-300 shadow-violet-200/50"
      }`}
    >
      <div className="flex flex-col md:flex-row md:min-h-56">
        {/* Image : en haut sur mobile, à gauche sur desktop */}
        <div className="relative overflow-hidden shrink-0 w-full h-40 md:w-2/5 md:h-auto">
          <img
            src={preview}
            alt={title}
            style={{ objectPosition: previewPosition }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${
            isDark
              ? "bg-linear-to-b md:bg-linear-to-r from-transparent to-[#14141c]/80"
              : "bg-linear-to-b md:bg-linear-to-r from-transparent to-white/80"
          }`} />
        </div>

        {/* Contenu détaillé : pleine largeur sur mobile, à droite sur desktop */}
        <div className="w-full md:w-3/5 px-6 py-6 md:px-8 md:py-7 flex flex-col justify-center">
          {/* Titre */}
          <h3 className={`font-bold text-xl mb-4 ${isDark ? "text-white" : "text-slate-800"}`}>
            {title}
          </h3>

          {/* Tags détaillés */}
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                  ACCENT_TAGS.includes(tag)
                    ? "bg-cyan-600 text-white border-cyan-500/40"
                    : isDark
                      ? "bg-slate-800/80 text-cyan-300 border-cyan-500/30"
                      : "bg-violet-50 text-violet-700 border-violet-300/60"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description détaillée */}
          <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {longDesc}
          </p>

          {/* Équipe du projet (collaboration) */}
          {team && team.length > 0 && (
            <div className="mt-5">
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2.5 ${isDark ? "text-cyan-400" : "text-violet-600"}`}>
                Équipe · Méthode agile
              </p>
              <ul className="flex flex-wrap gap-2">
                {team.map((member) => (
                  <li
                    key={member.name}
                    className={`flex flex-col rounded-lg border px-3 py-1.5 ${
                      member.isMe
                        ? isDark
                          ? "bg-cyan-500/10 border-cyan-500/50"
                          : "bg-violet-50 border-violet-300"
                        : isDark
                          ? "bg-slate-800/50 border-slate-600/50"
                          : "bg-slate-100 border-slate-200"
                    }`}
                  >
                    <span className={`text-xs font-bold ${
                      member.isMe
                        ? isDark ? "text-cyan-300" : "text-violet-700"
                        : isDark ? "text-white" : "text-slate-800"
                    }`}>
                      {member.name}{member.isMe && " (moi)"}
                    </span>
                    <span className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {member.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bouton vers le site en ligne (si présent) */}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 mt-5 self-start font-semibold px-5 py-2.5 rounded-lg uppercase tracking-widest text-xs transition-all duration-200 border ${
                isDark
                  ? "bg-[#2a2a3a] hover:bg-[#3a3a4a] border-slate-600 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/30 text-white"
                  : "bg-slate-800 hover:bg-slate-700 border-slate-800 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-300/50 text-white"
              }`}
            >
              Voir le site
              <span aria-hidden="true">→</span>
            </a>
          )}

          {/* Téléchargement : boutons stores + QR code (si présents) */}
          {(stores || downloadUrl) && (
            <div className="flex flex-wrap items-end gap-5 mt-5">
              {stores && (
                <div className="flex flex-wrap gap-3">
                  {stores.ios && (
                    <StoreButton href={stores.ios} isDark={isDark} label="App Store" caption="Télécharger sur l'">
                      <AppleIcon />
                    </StoreButton>
                  )}
                  {stores.android && (
                    <StoreButton href={stores.android} isDark={isDark} label="Google Play" caption="Disponible sur">
                      <GooglePlayIcon />
                    </StoreButton>
                  )}
                </div>
              )}

              {downloadUrl && (
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 group/qr"
                  aria-label="Télécharger GoSportNow (QR code)"
                >
                  <div className="rounded-xl bg-white p-2 shadow-sm transition-transform duration-200 group-hover/qr:scale-105">
                    <QRCode
                      value={downloadUrl}
                      size={72}
                      style={{ height: "72px", width: "72px" }}
                      viewBox="0 0 72 72"
                    />
                  </div>
                  <span className={`text-[9px] uppercase tracking-wide ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Scanne pour installer
                  </span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
