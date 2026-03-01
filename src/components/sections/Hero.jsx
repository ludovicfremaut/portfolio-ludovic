/**
 * @file components/sections/Hero.jsx
 * @description Section Hero du portfolio (première vue).
 * Affiche le nom, titre et CTA sur un fond split en deux images.
 * Supporte light/dark mode.
 * 
 * Layout: 1/2 gauche (image code) + 1/2 droite (image bureau)
 * Le texte est positionné à droite par-dessus les deux images.
 */

import { HERO_IMAGES, PERSONAL_INFO } from "../../data/constants";

/**
 * Section Hero avec fond split et présentation
 */
export function Hero({ isDark = true }) {
  const bgColor = isDark ? "#0d0d14" : "#f1f5f9";
  
  return (
    <section id="home" className="relative h-150 flex">
      {/* Partie gauche - 1/2 */}
      <div className="relative w-1/2 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGES.left}')` }}
        />
        <div className={`absolute inset-0 ${isDark ? "bg-[#0d0d14]/60" : "bg-slate-100/70"}`} />
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(to right, transparent, ${bgColor}cc)` 
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{ 
          background: `linear-gradient(to top, ${bgColor}, transparent)` 
        }} />
      </div>

      {/* Partie droite - 1/2 */}
      <div className="relative w-1/2 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGES.right}')` }}
        />
        <div className={`absolute inset-0 ${isDark ? "bg-[#0d0d14]/65" : "bg-slate-100/75"}`} />
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(to left, transparent, ${bgColor}99)` 
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{ 
          background: `linear-gradient(to top, ${bgColor}, transparent)` 
        }} />
      </div>

      {/* Contenu Hero - centré sur toute la largeur */}
      <div className="absolute inset-0 flex items-center justify-center pt-14">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="flex justify-end">
            <div className="text-left">
              {/* Nom */}
              <h1 className={`text-[clamp(3rem,8vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight mb-4 ${
                isDark ? "text-white" : "text-slate-800"
              }`}>
                {PERSONAL_INFO.name.split(" ")[0].toUpperCase()}
                <br />
                {PERSONAL_INFO.name.split(" ")[1].toUpperCase()}
              </h1>
              
              {/* Titre */}
              <p className={`text-lg md:text-xl font-medium tracking-[0.2em] uppercase mb-8 ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}>
                {PERSONAL_INFO.title}
              </p>
              
              {/* CTA */}
              <a
                href="#projects"
                className={`inline-block font-semibold px-6 py-3 rounded-lg text-sm tracking-wider transition-all duration-200 hover:shadow-xl ${
                  isDark 
                    ? "bg-[#2a2a3a] hover:bg-[#3a3a4a] text-white border border-slate-600/50 hover:border-slate-500 hover:shadow-cyan-500/50" 
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:shadow-slate-400/50"
                }`}
              >
                DÉCOUVRIR MES RÉALISATIONS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
