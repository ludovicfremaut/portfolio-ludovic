/**
 * @file data/projects.js
 * @description Liste des projets affichés dans le portfolio.
 * Chaque projet contient :
 * - title: Nom du projet
 * - tech: Technologies utilisées (tableau de tags)
 * - desc: Description courte
 * - preview: URL de l'image de prévisualisation
 * 
 * Les tags "spéciaux" comme "Sortie Imminente" sont stylisés différemment.
 */

// ═══════════════════════════════════════════════════════════════════════════════
// LISTE DES PROJETS
// ═══════════════════════════════════════════════════════════════════════════════

export const PROJECTS = [
  {
    title: "Stage 97Pass",
    tech: ["React", "Supabase", "Agile", "Dashboard"],
    desc: "Plateforme coopérative de réductions locales destinés aux commerçants de l'île de la Réunion.",
    preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "SkillSwap",
    tech: ["Node.js", "Express", "MVC", "JWT"],
    desc: "Projet de fin d'études - Application d'échange de services entre particuliers réalisée en mode Agile.",
    preview: "https://media.istockphoto.com/id/1249140513/fr/photo/idée-parfaite.jpg?s=612x612&w=is&k=20&c=vSbGw2V3MsdtlfQS1VGrTbSF8Ezj5UJD6GVaIuwUBhY=",
  },
  {
    title: "GoSportNow",
    tech: ["Mobile", "Géolocalisation", "Micro-services", "Sortie Imminente"],
    desc: "Plateforme de réservation d'activités en toute sécurité.",
    preview: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "AuditSense (SaaS)",
    tech: ["Web", "Accessibilité", "RGPD", "Conception"],
    desc: "Plateforme d'audit web technique au-delà des scores automatiques.",
    preview: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&q=80",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// TAGS SPÉCIAUX (stylisés différemment)
// ═══════════════════════════════════════════════════════════════════════════════

/** Tags qui reçoivent un style accent (violet) */
export const ACCENT_TAGS = ["Sortie Imminente"];
