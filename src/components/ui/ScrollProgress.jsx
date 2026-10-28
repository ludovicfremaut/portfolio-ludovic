/**
 * @file components/ui/ScrollProgress.jsx
 * @description Fine jauge sous la navbar qui se remplit avec le défilement de la page,
 * comme un indicateur de niveau. Purement décorative (aria-hidden) : elle suit
 * une action de l'utilisateur, elle reste donc active même en mouvement réduit.
 *
 * Props : isDark (thème sombre)
 *
 * Exemple :
 * <ScrollProgress isDark />
 */

import { useEffect, useRef } from "react";

export function ScrollProgress({ isDark = true }) {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed top-14 left-0 right-0 z-50 h-0.5 pointer-events-none">
      <div
        ref={barRef}
        className={`h-full origin-left ${isDark ? "bg-cyan-400" : "bg-violet-600"}`}
        style={{ transform: "scaleX(0)", viewTransitionName: "scroll-progress" }}
      />
    </div>
  );
}
