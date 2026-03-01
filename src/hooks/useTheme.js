/**
 * @file hooks/useTheme.js
 * @description Hook personnalisé pour gérer le thème light/dark.
 * Persiste le choix dans localStorage et applique la classe sur <html>.
 */

import { useState, useEffect } from "react";

/**
 * Hook pour le switch light/dark mode
 * @returns {{ isDark: boolean, toggleTheme: function }}
 */
export function useTheme() {
  // Initialiser avec le thème sauvegardé ou dark par défaut
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "dark" : true; // Dark par défaut
    }
    return true;
  });

  // Appliquer le thème sur le document
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Toggle le thème
  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme };
}
