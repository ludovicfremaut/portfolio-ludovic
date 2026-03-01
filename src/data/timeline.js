/**
 * @file data/timeline.js
 * @description Données de la timeline de la section About.
 * Contient les informations sur le parcours professionnel :
 * - Côté gauche : expérience industrielle passée
 * - Côté droite : reconversion développeur actuelle
 * 
 * Chaque entrée référence un composant icône depuis assets/icons.
 */

import { 
  GearIcon, 
  WrenchIcon, 
  CodeIcon, 
  ReactIcon,
  NextJsIcon,
  NodeJsIcon,
  JsIcon,
  DockerIcon,
  GitHubIcon,
  TailwindIcon,
  DatabaseIcon,
  MarkdownIcon,
  Html5Icon,
  Css3Icon
} from "../assets/icons";

// TIMELINE GAUCHE - PASSÉ INDUSTRIEL

export const TIMELINE_LEFT = [
  {
    icon: GearIcon,
    label: "2003",
  },
  {
    icon: WrenchIcon,
    label: "2024",
  },
];

// TIMELINE DROITE - PRÉSENT DÉVELOPPEUR
// Trois points : Markdown → HTML/CSS/JS → Technos modernes

export const TIMELINE_RIGHT = [
  {
    // Point 1 : Apprentissage Markdown
    icons: [{ icon: MarkdownIcon, color: "text-slate-700 dark:text-slate-300" }],
    label: "DÉCOUVERTE",
    borderColor: "border-slate-500/50",
  },
  {
    // Point 2 : Bases du web
    icons: [
      { icon: Html5Icon, color: "text-orange-500" },
      { icon: Css3Icon, color: "text-blue-500" },
      { icon: JsIcon, color: "text-yellow-500" },
    ],
    label: "FONDATIONS",
    borderColor: "border-yellow-500/50",
  },
  {
    // Point 3 : Technologies modernes
    icons: [
      { icon: ReactIcon, color: "text-cyan-500" },
      { icon: NextJsIcon, color: "text-slate-700 dark:text-white" },
      { icon: NodeJsIcon, color: "text-green-500" },
      { icon: TailwindIcon, color: "text-cyan-400" },
      { icon: DockerIcon, color: "text-blue-400" },
      { icon: GitHubIcon, color: "text-slate-700 dark:text-slate-300" },
      { icon: DatabaseIcon, color: "text-orange-400" },
    ],
    label: "STACK MODERNE",
    borderColor: "border-cyan-500/50",
  },
];

// CONTENU TEXTUEL DES COLONNES

export const ABOUT_CONTENT = {
  left: {
    title: "Mon Passé Industriel",
    subtitle: "(DS Smith, Goodyear)",
    description:
      "Pendant plus de 20 ans dans l’industrie, j’ai évolué dans des environnements techniques exigeants où la rigueur, la sécurité et la performance étaient essentielles. J’y ai développé une forte capacité d’analyse, la gestion des incidents en production, le respect de procédures strictes et le travail en équipe autour d’objectifs communs. Cette expérience m’a appris à diagnostiquer rapidement des problèmes complexes, à documenter des solutions fiables et à maintenir des systèmes critiques. Des compétences que j’applique aujourd’hui directement dans le développement logiciel.",
    shortDescription:
      "20 ans dans des environnements industriels exigeants : rigueur, sécurité, diagnostic et résolution de problèmes complexes.",
    period: "2003-2024",
  },

  right: {
    title: "Mon Présent Développeur",
    subtitle: "(École O'clock, projets professionnalisants)",
    description:
      "Ma reconversion vers le développement web est née d’une passion pour la création et la compréhension des systèmes numériques. Formé au titre de Concepteur Développeur d’Applications, je conçois aujourd’hui des applications full-stack en mettant l’accent sur l’architecture, la qualité du code, la sécurité et le déploiement. À travers des projets concrets (API REST, React, Next.js, Docker, modélisation de bases de données), j’ai construit une vision globale d’une application, du besoin utilisateur jusqu’à la mise en production. Mon objectif est de allier mon expérience terrain à des compétences techniques modernes pour créer des solutions robustes, maintenables et utiles.",
    shortDescription:
      "Développeur full-stack en reconversion : conception d’applications modernes, de la base de données au déploiement.",
    period: "Depuis 2024",
  },
};
