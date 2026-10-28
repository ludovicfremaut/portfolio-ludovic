/**
 * @file components/ui/StoreButtons.jsx
 * @description Boutons de téléchargement App Store / Google Play et logos associés,
 * utilisés sur la page d'un projet mobile (ex. GoSportNow).
 *
 * Exemple :
 * <StoreButton href={url} isDark label="App Store" caption="Télécharger sur l'"><AppleIcon /></StoreButton>
 */

// ═══════════════════════════════════════════════════════════════════════════════
// BOUTONS DE TÉLÉCHARGEMENT (stores)
// ═══════════════════════════════════════════════════════════════════════════════

/** Logo Apple */
export function AppleIcon() {
  return (
    <svg viewBox="0 0 384 512" className="w-6 h-6 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

/** Logo Google Play */
export function GooglePlayIcon() {
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
export function StoreButton({ href, isDark, label, caption, children }) {
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
