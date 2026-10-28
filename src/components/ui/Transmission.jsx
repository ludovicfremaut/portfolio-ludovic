/**
 * @file components/ui/Transmission.jsx
 * @description La « transmission » du Hero : deux roues dentées couleur acier
 * (vingt ans de maintenance industrielle) entraînent une troisième roue, aux
 * couleurs du site, dont le moyeu affiche </> (le code). Le parcours en une image.
 *
 * Mouvement :
 * - au chargement, la transmission démarre et ralentit (un seul moment animé) ;
 * - ensuite elle ne tourne qu'en réponse au visiteur : défilement de la page
 *   et déplacement du pointeur ;
 * - les roues restent correctement engrenées (rapport des nombres de dents) ;
 * - mouvement réduit : roues immobiles, sauf au défilement (action du visiteur).
 *
 * Décoratif : aria-hidden. Les transformations sont écrites directement dans le DOM
 * (requestAnimationFrame), sans rendu React à chaque image.
 *
 * Props : isDark (thème sombre)
 *
 * Exemple :
 * <Transmission isDark />
 */

import { useEffect, useRef } from "react";
import { gearPath } from "../../utils/gear";

const MODULE = 12; // taille des dents : rayon primitif = MODULE × dents / 2
const C = 0.09; // décalage du centre d'une dent dans gearPath (en fraction de pas)

/** Définition des roues : la première mène, les suivantes s'engrènent sur la précédente */
const GEARS = (() => {
  const specs = [
    { teeth: 18, direction: 0, tone: "steel" }, // menante
    { teeth: 10, direction: -38, tone: "steel" }, // angle (degrés) depuis la roue précédente
    { teeth: 14, direction: 22, tone: "code" },
  ];
  const out = [];
  specs.forEach((s, i) => {
    const r = (MODULE * s.teeth) / 2;
    const step = 360 / s.teeth;
    if (i === 0) {
      out.push({ ...s, r, step, x: 250, y: 330, ratio: 1, phase: 0 });
      return;
    }
    const p = out[i - 1];
    const dist = p.r + r;
    const phi = s.direction; // direction de p vers la nouvelle roue
    const rad = (phi * Math.PI) / 180;
    const x = p.x + dist * Math.cos(rad);
    const y = p.y + dist * Math.sin(rad);
    const ratio = -p.ratio * (p.teeth / s.teeth);
    // Quand une dent de p est sur la ligne des centres, un creux de la nouvelle roue lui fait face
    const alphaStar = (phi - C * p.step - p.phase) / p.ratio; // angle « moteur » où une dent de p est en contact
    const phase = phi + 180 - (0.5 + C) * step - ratio * alphaStar;
    out.push({ ...s, r, step, x, y, ratio, phase });
  });
  return out.map((g) => ({
    ...g,
    d: gearPath({ teeth: g.teeth, radius: g.r, depth: MODULE * 1.15, hole: g.tone === "code" ? 0 : g.r * 0.22 }),
  }));
})();

const CODE = GEARS[GEARS.length - 1];

export function Transmission({ isDark = true }) {
  const gearRefs = useRef([]);
  const groupRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let angle = 0; // angle de la roue menante (degrés)
    let spin = reduce ? 0 : 540; // élan du démarrage
    let last = performance.now();
    let pointerX = null;
    let frame = 0;
    let scrollBase = window.scrollY;

    const render = () => {
      GEARS.forEach((g, i) => {
        const a = g.phase + g.ratio * angle;
        gearRefs.current[i]?.setAttribute("transform", `translate(${g.x.toFixed(1)} ${g.y.toFixed(1)}) rotate(${a.toFixed(2)})`);
      });
    };

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      angle += spin * dt;
      spin *= Math.pow(0.18, dt); // le démarrage ralentit doucement
      render();
      frame = Math.abs(spin) > 2 ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      angle += (y - scrollBase) * 0.35;
      scrollBase = y;
      if (!frame) render();
    };

    const onPointer = (e) => {
      if (reduce) return;
      if (pointerX !== null) {
        spin += (e.clientX - pointerX) * 6;
        spin = Math.max(-400, Math.min(400, spin));
        kick();
      }
      pointerX = e.clientX;
      // Léger relief : la transmission suit un peu le pointeur
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      groupRef.current?.setAttribute("transform", `translate(${(nx * 16).toFixed(1)} ${(ny * 12).toFixed(1)})`);
    };

    render();
    if (spin) kick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  const steel = isDark
    ? { fill: "fill-slate-600/50", stroke: "stroke-slate-400/60" }
    : { fill: "fill-slate-300/70", stroke: "stroke-slate-400" };
  const code = isDark
    ? { fill: "fill-cyan-500/15", stroke: "stroke-cyan-400", text: "fill-cyan-300", hub: "fill-[#0d0d14]" }
    : { fill: "fill-violet-500/15", stroke: "stroke-violet-600", text: "fill-violet-700", hub: "fill-white" };

  return (
    <svg
      viewBox="110 130 520 340"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      aria-hidden="true"
      focusable="false"
    >
      <g ref={groupRef}>
        {GEARS.map((g, i) => {
          const isCode = g.tone === "code";
          return (
            <g key={i} ref={(el) => { gearRefs.current[i] = el; }}>
              <path
                d={g.d}
                fillRule="evenodd"
                strokeWidth="2"
                strokeLinejoin="round"
                className={isCode ? `${code.fill} ${code.stroke}` : `${steel.fill} ${steel.stroke}`}
              />
              {!isCode && (
                <circle r={g.r * 0.55} fill="none" strokeWidth="1.5" strokeDasharray="3 7" className={steel.stroke} />
              )}
            </g>
          );
        })}
        {/* Moyeu de la roue « code » : ne tourne pas, reste lisible */}
        <g transform={`translate(${CODE.x.toFixed(1)} ${CODE.y.toFixed(1)})`}>
          <circle r={CODE.r * 0.5} strokeWidth="2" className={`${code.hub} ${code.stroke}`} />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            className={`${code.text} font-black`}
            style={{ fontSize: CODE.r * 0.42, letterSpacing: "-0.04em" }}
          >
            {"</>"}
          </text>
        </g>
      </g>
    </svg>
  );
}
