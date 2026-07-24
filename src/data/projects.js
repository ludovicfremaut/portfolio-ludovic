/**
 * @file data/projects.js
 * @description Liste des projets affichés dans le portfolio.
 * Chaque projet contient :
 * - title: Nom du projet
 * - tech: Technologies utilisées (tableau de tags)
 * - desc: Description courte
 * - preview: URL de l'image de prévisualisation
 * - url: (optionnel) Lien externe vers le projet en ligne
 * - previewPosition: (optionnel) Position CSS object-position pour la preview (ex: "top")
 * 
 * Les tags "spéciaux" comme "Sortie Imminente" sont stylisés différemment.
 */

// ═══════════════════════════════════════════════════════════════════════════════
// LISTE DES PROJETS
// ═══════════════════════════════════════════════════════════════════════════════

export const PROJECTS = [
  {
    title: "JobPilot — Assistant IA d'emploi",
    tech: ["Agents IA", "Automatisation", "Node.js", "En cours"],
    tags: ["LLM / IA générative", "Agents planifiés", "API France Travail", "Node.js", "Notion API", "Prompt engineering", "Automatisation"],
    desc: "J'ai automatisé ma propre recherche d'emploi : veille, tri et rédaction assistées par IA.",
    longDesc: "Méta-projet : un assistant qui pilote ma recherche d'emploi de bout en bout. Chaque matin, des agents planifiés scrutent les sources d'offres (France Travail, Hellowork), filtrent selon mes profils cibles (dev full-stack, dev IA, technicien IT — alternance & CDI), sélectionnent le bon CV et rédigent un message de candidature personnalisé via un LLM. Tout est centralisé dans un pipeline de suivi (Notion) avec notifications sur Mac et iPhone, et une salle de contrôle visuelle. Point clé : human-in-the-loop — rien n'est envoyé sans ma validation. Une démonstration concrète d'intégration d'IA, d'automatisation et d'orchestration d'agents au service d'un usage réel.",
    preview: "/projects/copilot-emploi.png",
    previewPosition: "top",
  },
  {
    title: "Nicolas Lefebvre Immobilier",
    tech: ["HTML5", "CSS3", "Mobile First", "Client"],
    tags: ["HTML5", "CSS3", "Mobile First", "Responsive", "Landing Page", "QR Code", "SEO local"],
    desc: "Landing page mobile d'un agent immobilier, accès via QR code.",
    longDesc: "Site vitrine one-page pour Nicolas Lefebvre, conseiller immobilier indépendant dans les Hauts-de-France (REFLEX EN S'HOME). Développé en HTML/CSS pur sans framework, avec une approche mobile-first puisque la majorité du trafic arrive depuis un QR code distribué sur supports physiques (cartes de visite, flyers, vitrines). Mise en avant des services (estimation, vente, recherche de bien), présentation du conseiller et contact WhatsApp intégré. Design sobre aligné sur l'identité de la marque.",
    preview: "/projects/nicolas-immo.png",
    previewPosition: "top",
    url: "https://nicolaslefebvre-immo-hauts-de-france.fr",
  },
  {
    title: "GoSportNow",
    tech: ["Mobile", "Géolocalisation", "Collaboration", "Disponible"],
    tags: ["React Native", "Node.js", "Micro-services", "Géolocalisation", "Docker", "API REST"],
    desc: "Plateforme de réservation d'activités sportives.",
    longDesc: "Plateforme de réservation d'activités sportives en toute sécurité, développée à trois en méthode agile. Architecture micro-services avec géolocalisation en temps réel, système de réservation, paiement sécurisé et notifications push. Application mobile React Native connectée à un backend Node.js conteneurisé avec Docker.",
    preview: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://gosportnow.fr",
    // Équipe du projet (collaboration agile) — isMe met en avant le propriétaire du portfolio
    team: [
      { name: "Ludovic Fremaut", role: "Lead Frontend", isMe: true },
      { name: "Anthony", role: "Tech Lead" },
      { name: "Nicolas", role: "Lead Backend" },
    ],
    // Liens de téléchargement (App Store / Google Play)
    stores: {
      ios: "https://apps.apple.com/fr/app/gosportnow/id6760923778",
      android: "https://play.google.com/store/apps/details?id=com.gosportnow.app&hl=fr",
    },
    // URL universelle de téléchargement (QR code) → redirige selon la plateforme
    downloadUrl: "https://gosportnow.fr/download",
  },
  {
    title: "Stage 97Pass",
    tech: ["React", "Supabase", "Agile", "Dashboard"],
    tags: ["React", "Supabase", "Tailwind CSS", "Agile / Scrum", "Dashboard", "API REST"],
    desc: "Plateforme coopérative de réductions locales.",
    longDesc: "Plateforme coopérative de réductions locales destinée aux commerçants de l'île de la Réunion. Développement d'un dashboard complet avec gestion des utilisateurs, statistiques en temps réel et système de coupons. Intégration de Supabase pour l'authentification et la base de données, le tout dans un workflow Agile avec sprints hebdomadaires.",
    preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "SkillSwap",
    tech: ["Node.js", "Express", "MVC", "JWT"],
    tags: ["Node.js", "Express", "MongoDB", "JWT", "MVC", "Agile", "API REST"],
    desc: "Application d'échange de services entre particuliers.",
    longDesc: "Projet de fin d'études — Application d'échange de services entre particuliers réalisée en mode Agile. Architecture MVC complète avec authentification JWT, gestion des profils, système de matching et messagerie intégrée. Backend Node.js/Express avec base de données MongoDB et déploiement Docker.",
    preview: "https://media.istockphoto.com/id/1249140513/fr/photo/idée-parfaite.jpg?s=612x612&w=is&k=20&c=vSbGw2V3MsdtlfQS1VGrTbSF8Ezj5UJD6GVaIuwUBhY=",
  },
  {
    title: "AuditSense (SaaS)",
    tech: ["Web", "Accessibilité", "RGPD", "Conception"],
    tags: ["Next.js", "TypeScript", "Accessibilité", "RGPD", "SaaS", "Puppeteer"],
    desc: "Plateforme d'audit web technique.",
    longDesc: "Plateforme d'audit web technique qui va au-delà des scores automatiques. Analyse approfondie de l'accessibilité (WCAG), conformité RGPD, performance et SEO. Interface Next.js/TypeScript avec rapports détaillés, suivi historique des scores et recommandations personnalisées. Utilisation de Puppeteer pour le crawling automatisé.",
    preview: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&q=80",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// TAGS SPÉCIAUX (stylisés différemment)
// ═══════════════════════════════════════════════════════════════════════════════

/** Tags qui reçoivent un style accent (violet) */
export const ACCENT_TAGS = ["Sortie Imminente", "Disponible", "Collaboration"];
