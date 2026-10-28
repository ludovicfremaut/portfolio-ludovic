/**
 * @file data/bot.js
 * @description Textes de Boulon, le petit robot du portfolio.
 * Boulon ne génère rien : il répond uniquement avec les textes ci-dessous.
 * Pour changer une réponse, modifier ce fichier.
 *
 * - greeting : premier message à l'ouverture
 * - teasers : bulles qui apparaissent une fois par visite
 *     - hello : quand on quitte le haut de la page d'accueil
 *     - contact : quand on arrive près du formulaire de contact
 * - questions : boutons proposés, chacun avec sa réponse et des liens éventuels
 *     - link.to commençant par "/" : lien interne (page projet, ancre)
 *     - sinon : lien externe, ouvert dans un nouvel onglet
 */

import { SOCIAL_LINKS } from "./constants";

export const BOT = {
  name: "Boulon",
  role: "le robot du portfolio",
  greeting:
    "Bonjour, je suis Boulon. Je connais bien Ludovic : choisissez une question, je vous réponds.",
  teasers: {
    hello: "Une question sur Ludovic ? Je suis là.",
    contact: "N'oubliez pas de contacter Ludovic : le formulaire est juste ici.",
  },
  questions: [
    {
      id: "qui",
      label: "Qui est Ludovic ?",
      answer:
        "Ludovic a passé plus de vingt ans dans la maintenance industrielle, chez Goodyear-Dunlop puis DS Smith. Il est devenu Concepteur Développeur d'Applications (titre de niveau licence) et vit à Marcelcave, près d'Amiens.",
    },
    {
      id: "projets",
      label: "Ses projets phares",
      answer:
        "Pour commencer : GoSportNow, une application mobile publiée sur les stores et construite à trois ; JobPilot, un assistant à agents IA en production ; et Le Temps d'un Site, son activité de création de sites pour les artisans.",
      links: [
        { label: "GoSportNow", to: "/projets/gosportnow/" },
        { label: "JobPilot", to: "/projets/jobpilot/" },
        { label: "Le Temps d'un Site", to: "/projets/le-temps-d-un-site/" },
      ],
    },
    {
      id: "industrie",
      label: "L'industrie, ça aide pour coder ?",
      answer:
        "Beaucoup. Diagnostiquer une panne en production, documenter la solution, suivre des procédures strictes, travailler en équipe sous pression : c'est le quotidien d'un technicien de maintenance, et c'est très proche du débogage et de la mise en production d'une application.",
    },
    {
      id: "poste",
      label: "Il cherche un poste ?",
      answer:
        "Oui. Ludovic est ouvert à un poste de développeur d'applications, ou en support informatique. En parallèle, il crée des sites pour les artisans et commerces avec Le Temps d'un Site.",
      links: [{ label: "Le contacter", to: "/#contact" }],
    },
    {
      id: "contact",
      label: "Comment le contacter ?",
      answer:
        "Le plus simple : le formulaire en bas de la page d'accueil. Vous pouvez aussi lui écrire sur LinkedIn.",
      links: [
        { label: "Aller au formulaire", to: "/#contact" },
        { label: "LinkedIn", to: SOCIAL_LINKS.linkedin },
      ],
    },
  ],
};
