/**
 * @file components/ui/Reveal.jsx
 * @description Enveloppe qui fait apparaître son contenu (fondu + léger glissement)
 * quand il entre dans l'écran. S'appuie sur le hook useReveal.
 *
 * Props :
 * - as : balise HTML à utiliser (défaut "div")
 * - delay : retard de l'apparition en millisecondes (pour un effet en cascade)
 * - className : classes supplémentaires
 *
 * Exemple :
 * <Reveal delay={120}><h2>Projets</h2></Reveal>
 */

import { useReveal } from "../../hooks/useReveal";

export function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
