/**
 * @file hooks/useNavigation.js
 * @description Hook personnalisé pour gérer la navigation.
 * Encapsule :
 * - L'état du lien actif
 * - L'état du menu mobile (ouvert/fermé)
 * - La fonction de navigation
 * 
 * Usage:
 * const { activeLink, menuOpen, handleNav, toggleMenu } = useNavigation();
 */

import { useState } from "react";

/**
 * Hook pour gérer la navigation du portfolio
 * @param {string} initialLink - Lien actif initial (default: "HOME")
 * @returns {Object} État et fonctions de navigation
 */
export function useNavigation(initialLink = "HOME") {
  const [activeLink, setActiveLink] = useState(initialLink);
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Navigue vers une section et ferme le menu mobile
   * @param {string} link - Nom de la section
   */
  const handleNav = (link) => {
    setActiveLink(link);
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
