import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";
import { PROJECTS } from "./src/data/projects.js";

const SITE = "https://ludovic-dev.com";

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Génère une page HTML par projet (dist/projets/<slug>/index.html) : même
 * application, mais titre, description, adresse canonique et aperçu de lien
 * propres au projet (LinkedIn, messageries, moteurs de recherche).
 * Le routeur de l'application (src/router.js) affiche ensuite la bonne page.
 */
function projectPages() {
  return {
    name: "project-pages",
    apply: "build",
    // « post » : index.html n'existe dans le bundle qu'après le plugin HTML de Vite
    generateBundle: { order: "post", handler(_options, bundle) {
      const index = bundle["index.html"];
      if (!index || index.type !== "asset") return;
      const html = String(index.source);
      for (const p of PROJECTS) {
        const url = `${SITE}/projets/${p.slug}/`;
        const title = escape(`${p.title} · Ludovic Fremaut`);
        const desc = escape(p.desc);
        const image = p.preview.startsWith("/") ? `${SITE}${p.preview}` : `${SITE}/og.png`;
        const page = html
          .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${desc}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${desc}`)
          .replace(/(<meta property="og:image" content=")[^"]*/, `$1${image}`)
          .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${title}`)
          .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${desc}`)
          .replace(/(<meta name="twitter:image" content=")[^"]*/, `$1${image}`)
          .replace(/(<meta property="og:image:alt" content=")[^"]*/, `$1${escape(`Aperçu du projet ${p.title}`)}`)
          // Les dimensions de og.png ne s'appliquent pas à une capture de projet
          .replace(/\s*<meta property="og:image:(width|height)" content="[^"]*" \/>/g, "");
        this.emitFile({ type: "asset", fileName: `projets/${p.slug}/index.html`, source: page });
      }
    } },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare(), projectPages()],
})
