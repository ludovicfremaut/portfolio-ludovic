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

// MENTIONS LÉGALES & RGPD

/** Informations légales (LCEN + RGPD) affichées dans la modale du footer */
export const LEGAL_INFO = {
  siteUrl: "https://ludovic-dev.com",
  contactEmail: "contact@ludovic-dev.com",
  editor: {
    name: "Ludovic Fremaut",
    location: "Marcelcave, Hauts-de-France, France",
    director: "Ludovic Fremaut",
  },
  host: {
    name: "Cloudflare, Inc.",
    address: "101 Townsend Street, San Francisco, CA 94107, USA",
    website: "https://www.cloudflare.com",
  },
  privacy: {
    dataCollected: "Nom, adresse email et contenu du message saisis via le formulaire de contact.",
    purpose: "Répondre à votre demande de contact.",
    legalBasis: "Consentement explicite lors de l'envoi du formulaire (art. 6.1.a du RGPD).",
    retention: "3 ans à compter du dernier échange, puis suppression automatique.",
    recipients: "Aucune donnée n'est transmise à des tiers. Seul l'éditeur y a accès.",
    rights: "Conformément aux articles 15 à 22 du RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, de portabilité, de limitation et d'opposition sur vos données.",
    cnil: "En cas de litige, vous pouvez saisir la CNIL (www.cnil.fr).",
  },
};
