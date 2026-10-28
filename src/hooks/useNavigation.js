/**
 * @file hooks/useNavigation.js
 * @description Hook personnalisé pour gérer la navigation.
 * Encapsule :
 * - L'état du lien actif
 * - L'état du menu mobile (ouvert/fermé)
 * - La fonction de navigation
 * - Le suivi du défilement : le lien actif suit la section visible
 * 
 * Usage:
 * const { activeLink, menuOpen, handleNav, toggleMenu } = useNavigation();
 */

import { useState } from "react";
import { NAV_LINKS } from "../data/constants";
import { useScrollSpy } from "./useScrollSpy";

/** Sections de la page suivies au défilement (le CV n'est pas une section) */
const SECTION_IDS = NAV_LINKS.filter((link) => link.id !== "cv").map((link) => link.id);

/**
 * Hook pour gérer la navigation du portfolio
 * @param {string} initialLink - Lien actif initial (default: "ACCUEIL")
 * @param {string} path - Page courante : le suivi des sections repart à chaque changement de page
 * @returns {Object} État et fonctions de navigation
 */
export function useNavigation(initialLink = "ACCUEIL", path = "/") {
  const [menuOpen, setMenuOpen] = useState(false);
  const initialId = NAV_LINKS.find((l) => l.label === initialLink)?.id ?? SECTION_IDS[0];
  // Section visible : suivie au défilement, forcée au clic sur un lien
  const [visibleSection, setVisibleSection] = useScrollSpy(SECTION_IDS, initialId, path);
  const activeLink = NAV_LINKS.find((l) => l.id === visibleSection)?.label ?? initialLink;

  /**
   * Navigue vers une section et ferme le menu mobile
   * @param {string} link - Nom de la section
   */
  const handleNav = (link) => {
    const target = NAV_LINKS.find((l) => l.label === link);
    if (target) setVisibleSection(target.id);
    setMenuOpen(false);
  };

  /**
   * Bascule l'état du menu mobile
   */
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return {
    activeLink,
    menuOpen,
    handleNav,
    toggleMenu,
  };
}
