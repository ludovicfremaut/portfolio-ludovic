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
 * - categories: Catégories utilisées par les filtres de la section Projets (voir PROJECT_FILTERS)
 * - links: (optionnel) Liens secondaires affichés dans la vue détaillée ({ label, href })
 *
 * Les tags "spéciaux" comme "Sortie Imminente" sont stylisés différemment.
 */

// ═══════════════════════════════════════════════════════════════════════════════
// LISTE DES PROJETS
// ═══════════════════════════════════════════════════════════════════════════════

export const PROJECTS = [
  {
    title: "Le Temps d'un Site",
    tech: ["Astro", "Accessibilité", "SEO local", "Mon entreprise"],
    tags: ["Astro 5", "TypeScript", "Cloudflare Pages", "Cloudflare Functions", "Keystatic", "Resend", "Turnstile", "RGAA AA", "Lighthouse CI", "JSON-LD"],
    desc: "Mon activité de création de sites pour les artisans et commerces de la Somme, et son site vitrine.",
    longDesc: "Ma micro-entreprise de développeur web freelance, basée à Marcelcave, pour les artisans, commerces et indépendants de la Somme. Le site vitrine est construit avec Astro et hébergé sur Cloudflare Pages : formulaire de contact protégé par Turnstile et envoyé par Resend via une fonction Cloudflare, blog sur la visibilité locale, diagnostic de visibilité en six questions qui recommande un forfait, données structurées pour Google et contrôle Lighthouse à chaque modification (accessibilité et SEO au-dessus de 95). Il sert aussi de modèle pour les sites de mes clients.",
    preview: "/projects/letempsdunsite.jpg",
    previewPosition: "left top",
    url: "https://letempsdunsite.fr",
    links: [
      { label: "Site de démonstration (boulangerie fictive)", href: "https://letempsdunsite.fr/demos/boulangerie-martin/" },
      { label: "Diagnostic de visibilité", href: "https://letempsdunsite.fr/diagnostic/" },
    ],
    categories: ["web"],
  },
  {
    title: "JobPilot, assistant d'emploi à agents IA",
    tech: ["Agents IA", "Node.js", "PostgreSQL", "En production"],
    tags: ["Agents IA", "API Claude", "API France Travail", "Node.js", "Express", "PostgreSQL", "React", "Docker"],
    desc: "Sept agents aux rôles séparés, de la veille des offres à la relecture des lettres, toujours validés par un humain.",
    longDesc: "Un assistant qui pilote ma recherche d'emploi de bout en bout. Sept agents aux rôles séparés, enchaînés par le code : veille des offres France Travail et La Bonne Alternance, notation de chaque offre face à mon profil réel, enquête sur l'entreprise, rédaction de la lettre, puis relecture par un contrôle anti-IA en français qui vérifie chaque affirmation. Rien n'est envoyé sans ma validation : l'agent de suivi crée seulement des brouillons Gmail et lit les réponses. Comptes multi-utilisateurs, journal de chaque passage d'agent, déployé avec Docker sur mon serveur, avec mise en ligne automatique.",
    preview: "/projects/copilot-emploi.png",
    previewPosition: "top",
    categories: ["ia", "apps"],
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
    categories: ["web"],
  },
  {
    title: "GoSportNow",
    tech: ["Mobile", "Géolocalisation", "Collaboration", "Sur les stores"],
    tags: ["React Native", "Expo", "TypeScript", "NestJS", "PostgreSQL", "Redis", "Socket.io", "Docker"],
    desc: "Application mobile qui met en relation des sportifs proches selon leur niveau et leurs disponibilités.",
    longDesc: "Application mobile qui met en relation des sportifs proches selon leur niveau et leurs disponibilités, publiée sur l'App Store et Google Play. Nous l'avons construite à trois, de la conception en MERISE jusqu'au lancement public. J'ai mené le frontend et contribué au backend, et je m'occupe aussi de la promotion auprès des premiers utilisateurs.",
    preview: "/projects/gosportnow.jpg",
    categories: ["apps", "equipe"],
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
    title: "Mon itinéraire professionnel",
    tech: ["SVG", "JavaScript", "Animation", "Narration"],
    tags: ["JavaScript", "SVG animé", "Narration audio", "Accessibilité", "Plein écran"],
    desc: "Mon parcours, de la maintenance industrielle au code, raconté en animation et avec ma voix.",
    longDesc: "Une présentation animée et narrée de mon parcours, de la maintenance industrielle au développement : 54 étapes, un personnage qui évolue le long d'un chemin, ma propre voix en narration, lecture automatique ou pas à pas. Un format que je peux aussi réaliser pour raconter une entreprise, un savoir-faire ou un projet.",
    preview: "/projects/itineraire-pro.jpg",
    previewPosition: "top",
    url: "https://parcours.letempsdunsite.fr",
    categories: ["web"],
  },
  {
    title: "Stage 97Pass",
    tech: ["Next.js", "Supabase", "Agile", "Stage à distance"],
    tags: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Agile"],
    desc: "Tableau de bord administrateur d'une plateforme de réductions pour les commerçants de La Réunion.",
    longDesc: "Stage mené à distance, à 9 000 km, pour une plateforme coopérative de réductions destinée aux commerçants de l'île de La Réunion. J'ai construit le tableau de bord administrateur de bout en bout, avec l'authentification et la gestion des rôles utilisateurs sur Supabase et PostgreSQL, en méthode agile avec revues de code et en autonomie complète.",
    preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    categories: ["apps"],
  },
  {
    title: "SkillSwap",
    tech: ["React", "Node.js", "PostgreSQL", "Lead frontend"],
    tags: ["React 19", "TypeScript", "Tailwind", "Zustand", "Express", "Sequelize", "PostgreSQL", "Zod"],
    desc: "Application d'échange de services entre particuliers, projet de fin de titre soutenu devant jury.",
    longDesc: "Projet de fin de titre soutenu devant jury : une application de mise en relation entre particuliers pour échanger des services. L'équipe s'est réparti les rôles et j'ai pris le frontend en charge (lead frontend), de l'architecture des composants aux règles de code et à la revue des pull requests. Côté serveur, API Node.js/Express en MVC avec authentification JWT et validation des entrées.",
    preview: "https://media.istockphoto.com/id/1249140513/fr/photo/idée-parfaite.jpg?s=612x612&w=is&k=20&c=vSbGw2V3MsdtlfQS1VGrTbSF8Ezj5UJD6GVaIuwUBhY=",
    categories: ["apps", "equipe"],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// FILTRES DE LA SECTION PROJETS
// ═══════════════════════════════════════════════════════════════════════════════

/** Filtres proposés au-dessus de la grille ("all" affiche tout) */
export const PROJECT_FILTERS = [
  { id: "all", label: "Tous" },
  { id: "web", label: "Sites web" },
  { id: "apps", label: "Applications" },
  { id: "ia", label: "IA" },
  { id: "equipe", label: "En équipe" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// TAGS SPÉCIAUX (stylisés différemment)
// ═══════════════════════════════════════════════════════════════════════════════

/** Tags qui reçoivent un style accent (violet) */
export const ACCENT_TAGS = ["Sortie Imminente", "Disponible", "Collaboration", "Mon entreprise"];
