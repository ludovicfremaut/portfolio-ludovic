/**
 * @file components/sections/Hero.jsx
 * @description Section Hero du portfolio (première vue).
 * Affiche le nom, titre et CTA sur un fond split en deux images.
 * Supporte light/dark mode.
 * 
 * Layout: 1/2 gauche (image code) + 1/2 droite (image bureau)
 * Le texte est positionné à droite par-dessus les deux images.
 * Sous le titre, une phrase « Je conçois … » fait défiler ce que je fabrique,
 * un seul tour de moins de 5 s (WCAG 2.2.2) puis elle s'arrête sur la première phrase. Pas de défilement si
 * l'utilisateur a demandé moins d'animations. Les lecteurs d'écran lisent la
 * liste complète une fois.
 * Un indicateur en bas invite à faire défiler la page.
 * À gauche, la « transmission » (components/ui/Transmission.jsx) : les engrenages
 * de l'industrie entraînent la roue du code.
 */

import { useEffect, useState } from "react";
import { HERO_IMAGES, HERO_ROTATING_WORDS, PERSONAL_INFO } from "../../data/constants";
import { Transmission } from "../ui/Transmission";
import { linkHandler } from "../../router";

const ROTATE_EVERY_MS = 1500;

/** Phrase qui change toutes les ROTATE_EVERY_MS millisecondes, le temps d'un tour */
function RotatingWords({ isDark }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      setIndex(step % HERO_ROTATING_WORDS.length);
      if (step >= HERO_ROTATING_WORDS.length) clearInterval(id);
    }, ROTATE_EVERY_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={`text-base md:text-lg mb-8 min-h-[3.5em] md:min-h-0 max-w-[22rem] md:max-w-none ${isDark ? "text-slate-400" : "text-slate-600"}`}>
      <span className="sr-only">Je conçois {HERO_ROTATING_WORDS.join(", ")}.</span>
      <span aria-hidden="true">
        Je conçois{" "}
        <span
          key={index}
          className={`inline-block font-semibold animate-word-in ${isDark ? "text-cyan-300" : "text-violet-700"}`}
        >
          {HERO_ROTATING_WORDS[index]}
        </span>
      </span>
    </p>
  );
}

/**
 * Section Hero avec fond split et présentation
 */
export function Hero({ isDark = true }) {
  const bgColor = isDark ? "#0d0d14" : "#f1f5f9";
  
  return (
    <section id="accueil" className="relative h-150 flex overflow-hidden">
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

      {/* Transmission : industrie → code (atténuée sous le texte sur mobile) */}
      <div className="absolute inset-y-0 left-0 w-full md:w-[52%] flex items-center justify-center pt-14 pointer-events-none opacity-25 md:opacity-100">
        <div className="w-[min(92%,560px)] aspect-[520/340] hero-transmission">
          <Transmission isDark={isDark} />
        </div>
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
              <p className={`text-lg md:text-xl font-medium tracking-[0.2em] uppercase mb-4 ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}>
                {PERSONAL_INFO.title}
              </p>

              {/* Ce que je fabrique (défilant) */}
              <RotatingWords isDark={isDark} />
              
              {/* CTA */}
              <a
                href="#projets"
                onClick={linkHandler("/#projets")}
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

      {/* Invitation à faire défiler */}
      <a
        href="#a-propos"
        onClick={linkHandler("/#a-propos")}
        aria-label="Faire défiler vers la section À propos"
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.3em] transition-colors ${
          isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <span aria-hidden="true">Défiler</span>
        <svg viewBox="0 0 24 24" className="w-5 h-5 animate-scroll-hint" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
