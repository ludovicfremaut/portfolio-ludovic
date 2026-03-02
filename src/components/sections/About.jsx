/**
 * @file components/sections/About.jsx
 * @description Section About avec timeline du parcours professionnel.
 * Supporte les modes light et dark.
 * 
 * Structure:
 * - Desktop: Timeline horizontale avec ligne continue, icônes au-dessus, points sur la ligne
 * - Mobile: Timeline verticale simplifiée
 * 
 * Affiche le parcours de l'industrie vers le développement web.
 */

import { useState } from "react";
import { TIMELINE_LEFT, TIMELINE_RIGHT, ABOUT_CONTENT } from "../../data/timeline";

// ═══════════════════════════════════════════════════════════════════════════════
// COMPOSANT UTILITAIRE POUR UN GROUPE D'ICÔNES AVEC TOOLTIP
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Groupe d'icônes avec tooltip unique au-dessus du groupe entier.
 * Au hover sur une icône, son nom apparaît en haut du conteneur.
 */
function IconGroup({ icons, bgCard, borderColor, isDark }) {
  const [hoveredName, setHoveredName] = useState(null);
  const iconCount = icons.length;

  // Rendu d'une seule icône (avec hover)
  const renderIcon = (iconData, i, size = "small") => {
    const Icon = iconData.icon;
    const isLarge = size === "large";
    return (
      <div
        key={i}
        onMouseEnter={() => setHoveredName(iconData.name)}
        onMouseLeave={() => setHoveredName(null)}
        className={`${isLarge ? 'w-12 h-12 rounded-xl' : 'w-7 h-7 rounded-md'} ${bgCard} border ${borderColor} flex items-center justify-center ${iconData.color} shadow-sm transition-transform hover:scale-110 cursor-default`}
      >
        <Icon className={isLarge ? "w-5 h-5" : "w-3.5 h-3.5"} />
      </div>
    );
  };

  return (
    <div className="relative flex items-end justify-center">
      {/* Tooltip au-dessus du groupe entier */}
      <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-wide whitespace-nowrap px-2 py-0.5 rounded z-30 transition-opacity pointer-events-none ${
        isDark ? 'bg-white/10 text-white' : 'bg-slate-800 text-white'
      } ${hoveredName ? 'opacity-100' : 'opacity-0'}`}>
        {hoveredName}
      </span>

      {/* Icônes */}
      {iconCount === 1 ? (
        renderIcon(icons[0], 0, "large")
      ) : iconCount <= 3 ? (
        <div className="flex gap-1 justify-center items-end">
          {icons.map((iconData, i) => renderIcon(iconData, i))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 justify-items-center">
          {icons.map((iconData, i) => renderIcon(iconData, i))}
        </div>
      )}
    </div>
  );
}

/**
 * Section About avec timeline responsive
 */
export function About({ isDark }) {
  return (
    <section id="about" className={`py-20 px-6 transition-colors duration-300 ${
      isDark ? 'bg-transparent' : 'bg-white'
    }`}>
      <div className="max-w-5xl mx-auto">
        <h2 className={`text-center text-2xl font-bold uppercase tracking-[0.3em] mb-16 ${
          isDark ? 'text-white' : 'text-slate-800'
        }`}>
          About
        </h2>

        {/* Timeline Desktop */}
        <DesktopTimeline isDark={isDark} />

        {/* Timeline Mobile */}
        <MobileTimeline isDark={isDark} />
      </div>
    </section>
  );
}

/**
 * Timeline version desktop (écrans md et plus)
 * Structure: Icônes → Ligne avec points dessus → Labels sous la ligne → Textes
 */
function DesktopTimeline({ isDark }) {
  // Classes de couleurs selon le thème
  const bgCard = isDark ? 'bg-[#1a1a24]' : 'bg-white';
  const bgSection = isDark ? 'border-[#0d0d14]' : 'border-white';
  const borderDefault = isDark ? 'border-slate-600' : 'border-slate-300';
  const lineColor = isDark ? 'bg-slate-700' : 'bg-slate-300';
  const arrowColor = isDark ? 'border-r-slate-500' : 'border-r-slate-400';
  const arrowColorLeft = isDark ? 'border-l-slate-500' : 'border-l-slate-400';
  const textPrimary = isDark ? 'text-white' : 'text-slate-800';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';
  const textMuted = isDark ? 'text-slate-500' : 'text-slate-500';
  const separatorColor = isDark ? 'bg-slate-600' : 'bg-slate-300';

  return (
    <div className="hidden md:block">
      {/* Container principal avec séparateur vertical continu */}
      <div className="relative px-4">
        
        {/* Séparateur vertical central - traverse toute la section */}
        <div className={`absolute left-1/2 top-0 bottom-0 w-0.5 ${separatorColor} -translate-x-1/2 z-10`} />

        {/* Section Timeline */}
        <div className="relative pb-8">
          
          {/* Timeline avec structure verticale cohérente */}
          <div className="grid grid-cols-2">
            
            {/* Colonne gauche */}
            <div className="flex justify-around pr-8">
              {TIMELINE_LEFT.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex flex-col items-center">
                    {/* Container icône avec hauteur fixe */}
                    <div className="h-16 flex items-end justify-center">
                      <div className={`w-12 h-12 rounded-xl ${bgCard} border ${borderDefault} flex items-center justify-center ${textSecondary} shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    {/* Espace fixe */}
                    <div className="h-2" />
                    {/* Point */}
                    <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'} border-2 ${bgSection}`} />
                    {/* Espace */}
                    <div className="h-4" />
                    {/* Label */}
                    <span className={`text-[10px] font-bold tracking-wider whitespace-nowrap ${textSecondary}`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Colonne droite */}
            <div className="flex justify-around pl-8">
              {TIMELINE_RIGHT.map((item, index) => {
                const borderColor = item.borderColor || borderDefault;
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    {/* Container icônes avec tooltip au-dessus du groupe */}
                    <div className="h-16 flex items-end justify-center">
                      <IconGroup
                        icons={item.icons}
                        bgCard={bgCard}
                        borderColor={borderColor}
                        isDark={isDark}
                      />
                    </div>
                    {/* Espace fixe */}
                    <div className="h-2" />
                    {/* Point - toujours centré dans la colonne */}
                    <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-slate-400' : 'bg-violet-500'} border-2 ${bgSection}`} />
                    {/* Espace */}
                    <div className="h-4" />
                    {/* Label */}
                    <span className={`text-[10px] font-bold tracking-wider whitespace-nowrap ${isDark ? 'text-slate-300' : 'text-violet-600'}`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ligne horizontale - positionnée au niveau des points */}
          <div className={`absolute left-0 right-0 h-0.5 ${lineColor}`} style={{ top: 'calc(64px + 8px + 6px)' }}>
            {/* Flèche gauche */}
            <div className={`absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-8 ${arrowColor}`} />
            {/* Flèche droite */}
            <div className={`absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-8 ${arrowColorLeft}`} />
          </div>
        </div>

        {/* Textes - 2 colonnes avec padding */}
        <div className="grid grid-cols-2 pt-8">
          {/* Colonne gauche */}
          <div className="pr-12">
            <h3 className={`text-xl font-bold uppercase mb-2 tracking-wide ${textPrimary}`}>
              {ABOUT_CONTENT.left.title}
            </h3>
            <p className={`text-sm mb-4 ${textMuted}`}>{ABOUT_CONTENT.left.subtitle}</p>
            <p className={`text-sm leading-relaxed ${textSecondary}`}>
              {ABOUT_CONTENT.left.description}
            </p>
          </div>

          {/* Colonne droite */}
          <div className="pl-12">
            <h3 className={`text-xl font-bold uppercase mb-2 tracking-wide ${textPrimary}`}>
              {ABOUT_CONTENT.right.title}
            </h3>
            <p className={`text-sm mb-4 ${textMuted}`}>{ABOUT_CONTENT.right.subtitle}</p>
            <p className={`text-sm leading-relaxed ${textSecondary}`}>
              {ABOUT_CONTENT.right.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Timeline version mobile (écrans < md)
 */
function MobileTimeline({ isDark }) {
  const LeftIcon = TIMELINE_LEFT[0].icon;
  // Récupère la première icône du premier point de droite
  const firstRightIcon = TIMELINE_RIGHT[0].icons[0];
  const RightIcon = firstRightIcon.icon;
  
  const bgCard = isDark ? 'bg-[#1a1a24]' : 'bg-white';
  const borderDefault = isDark ? 'border-slate-600' : 'border-slate-300';
  const textPrimary = isDark ? 'text-white' : 'text-slate-800';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';
  const lineColor = isDark ? 'bg-slate-700' : 'bg-slate-300';

  return (
    <div className="md:hidden space-y-8">
      {/* Passé industriel */}
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-lg ${bgCard} border ${borderDefault} flex items-center justify-center ${textSecondary}`}>
            <LeftIcon className="w-5 h-5" />
          </div>
          <div className={`w-px flex-1 ${lineColor} mt-2`} />
        </div>
        <div className="pb-6">
          <p className={`text-xs font-semibold tracking-wider mb-1 ${textSecondary}`}>
            {ABOUT_CONTENT.left.period}
          </p>
          <h3 className={`text-base font-bold uppercase mb-1 ${textPrimary}`}>
            {ABOUT_CONTENT.left.title}
          </h3>
          <p className={`text-xs mb-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{ABOUT_CONTENT.left.subtitle}</p>
          <p className={`text-sm leading-relaxed ${textSecondary}`}>
            {ABOUT_CONTENT.left.shortDescription}
          </p>
        </div>
      </div>

      {/* Présent développeur */}
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-lg ${bgCard} border ${TIMELINE_RIGHT[0].borderColor} flex items-center justify-center ${firstRightIcon.color}`}>
            <RightIcon className="w-5 h-5" />
          </div>
        </div>
        <div>
          <p className={`text-xs font-semibold tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-violet-600'}`}>
            {ABOUT_CONTENT.right.period}
          </p>
          <h3 className={`text-base font-bold uppercase mb-1 ${textPrimary}`}>
            {ABOUT_CONTENT.right.title}
          </h3>
          <p className={`text-xs mb-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{ABOUT_CONTENT.right.subtitle}</p>
          <p className={`text-sm leading-relaxed ${textSecondary}`}>
            {ABOUT_CONTENT.right.description}
          </p>
        </div>
      </div>
    </div>
  );
}
