/**
 * @file hooks/useReveal.js
 * @description Fait apparaître un élément quand il entre dans l'écran.
 * Ajoute la classe `is-revealed` sur l'élément ciblé (une seule fois).
 * Le style de l'apparition est dans index.css (classe `.reveal`).
 *
 * Accessibilité : si l'utilisateur a demandé moins d'animations
 * (prefers-reduced-motion), ou si IntersectionObserver n'existe pas,
 * l'élément est affiché tout de suite.
 *
 * Usage :
 * const ref = useReveal();
 * <div ref={ref} className="reveal">…</div>
 */

import { useEffect, useRef } from "react";

/**
 * @param {Object} [options]
 * @param {number} [options.threshold=0.15] Part visible de l'élément avant l'apparition
 * @returns {import("react").RefObject<HTMLElement>}
 */
export function useReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
