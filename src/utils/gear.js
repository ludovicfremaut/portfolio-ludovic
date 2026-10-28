/**
 * @file utils/gear.js
 * @description Dessin d'engrenages en SVG (chemin centré sur 0,0).
 * Utilisé par la transmission du Hero et par l'oreille de Boulon.
 *
 * Exemple :
 * <path d={gearPath({ teeth: 12, radius: 40, depth: 6 })} />
 */

/**
 * Chemin d'une roue dentée.
 * @param {Object} o
 * @param {number} o.teeth Nombre de dents
 * @param {number} o.radius Rayon primitif (milieu de la denture)
 * @param {number} [o.depth] Hauteur des dents
 * @param {number} [o.hole] Rayon du trou central (0 = pas de trou)
 * @returns {string} attribut `d`
 */
export function gearPath({ teeth, radius, depth = radius * 0.16, hole = 0 }) {
  const outer = radius + depth / 2;
  const inner = radius - depth / 2;
  const step = (Math.PI * 2) / teeth;
  // Proportions d'une dent : flanc montant, sommet, flanc descendant, creux
  const f = [0.18, 0.32, 0.18, 0.32];
  const pt = (r, a) => `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step - step * 0.25;
    const a1 = a0 + step * f[0];
    const a2 = a1 + step * f[1];
    const a3 = a2 + step * f[2];
    const a4 = a3 + step * f[3];
    d += `${i === 0 ? "M" : "L"}${pt(inner, a0)} L${pt(outer, a1)} L${pt(outer, a2)} L${pt(inner, a3)} A${inner} ${inner} 0 0 1 ${pt(inner, a4)} `;
  }
  d += "Z";
  if (hole > 0) {
    // Trou central (règle evenodd côté SVG)
    d += ` M${hole} 0 A${hole} ${hole} 0 1 0 ${-hole} 0 A${hole} ${hole} 0 1 0 ${hole} 0 Z`;
  }
  return d;
}
