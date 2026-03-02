/**
 * @file data/constants.js
 * @description Constantes globales de l'application.
 * Contient les URLs des images, les liens de navigation et autres valeurs fixes.
 * Centraliser ces valeurs facilite la maintenance et les modifications.
 */

// NAVIGATION

/** Liens de la navbar */
export const NAV_LINKS = [
  { label: "ACCUEIL", id: "accueil" },
  { label: "À PROPOS", id: "a-propos" },
  { label: "PROJETS", id: "projets" },
  { label: "CONTACT", id: "contact" },
  { label: "CV", id: "cv" },
];

// IMAGES

/** Images de fond pour la section Hero (split gauche/droite) */
export const HERO_IMAGES = {
  left: "https://images.unsplash.com/photo-1597115964035-f49f2b555c85?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  right: "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

// LIENS EXTERNES

/** Liens réseaux sociaux */
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/ludovic-fremaut-dev/",
  github: "https://github.com/ludovicfremaut/ludovic-fremaut",
};

// INFORMATIONS PERSONNELLES

/** Informations affichées dans le portfolio */
export const PERSONAL_INFO = {
  name: "Ludovic Fremaut",
  title: "Concepteur d'Applications",
  location: "Marcelcave, Hauts-de-France",
  year: 2025,
};
