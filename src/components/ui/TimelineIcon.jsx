/**
 * @file components/ui/TimelineIcon.jsx
 * @description Composant réutilisable pour les icônes de la timeline.
 * Affiche une icône dans une boîte stylisée avec un label optionnel en dessous.
 * 
 * Props:
 * - Icon: Composant icône à afficher
 * - label: Texte sous l'icône (optionnel)
 * - color: Classe Tailwind pour la couleur de l'icône
 * - borderColor: Classe Tailwind pour la bordure de la boîte
 */

/**
 * Icône de timeline avec boîte et label
 */
export function TimelineIcon({
  icon: Icon,
  label,
  color = "text-slate-300",
  borderColor = "border-slate-600",
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Boîte de l'icône */}
      <div
        className={`w-11 h-11 rounded-xl bg-[#1a1a24] border ${borderColor} flex items-center justify-center ${color}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      
      {/* Label sous l'icône */}
      {label && (
        <span className="mt-2 text-[10px] font-bold text-slate-300 tracking-wider whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
