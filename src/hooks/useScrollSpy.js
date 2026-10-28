/**
 * @file hooks/useScrollSpy.js
 * @description Repère la section visible pendant le défilement et renvoie son id.
 * Sert à mettre à jour le lien actif de la navbar quand on fait défiler la page
 * (et pas seulement au clic).
 *
 * Une section est « active » quand elle traverse une fine bande située
 * vers le tiers haut de l'écran.
 *
 * Usage :
 * const [activeId, setActiveId] = useScrollSpy(["accueil", "a-propos", "projets", "contact"]);
 * (setActiveId permet de forcer la section active, par exemple au clic sur un lien)
 */

import { useEffect, useState } from "react";

/**
 * @param {string[]} ids Identifiants des sections à surveiller, dans l'ordre de la page
 * @param {string} [initialId] Section active au chargement (défaut : la première)
 * @param {string} [refreshKey] Change quand la page change : les sections sont alors recherchées à nouveau
 * @returns {[string|null, (id: string) => void]} Section visible et fonction pour la forcer
 */
export function useScrollSpy(ids, initialId = ids[0] ?? null, refreshKey = "") {
  const [activeId, setActiveId] = useState(initialId);
  const key = ids.join("|");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // Bande de détection : de 30 % à 40 % de la hauteur de l'écran
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key, refreshKey]);

  return [activeId, setActiveId];
}
