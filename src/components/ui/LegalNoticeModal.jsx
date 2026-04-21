/**
 * @file components/ui/LegalNoticeModal.jsx
 * @description Modale affichant les mentions légales (LCEN) et la politique
 * de confidentialité (RGPD). Déclenchée depuis le footer.
 * Accessible : aria-modal, fermeture via Escape ou clic sur l'overlay.
 * Supporte light/dark mode.
 */

import { useEffect } from "react";
import { LEGAL_INFO } from "../../data/constants";

/**
 * Modale de mentions légales + politique de confidentialité
 */
export function LegalNoticeModal({ open, onClose, isDark = true }) {
  // Ferme la modale sur Escape + bloque le scroll du body quand ouverte
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const { siteUrl, contactEmail, editor, host, privacy } = LEGAL_INFO;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-notice-title"
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Fermer la modale"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Contenu */}
      <div
        className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl my-8 ${
          isDark
            ? "bg-[#14141c] border-slate-700/60 text-slate-200"
            : "bg-white border-slate-200 text-slate-700"
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isDark ? "border-slate-700/60" : "border-slate-200"
        }`}>
          <h2
            id="legal-notice-title"
            className={`text-lg font-bold uppercase tracking-[0.2em] ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            Informations légales
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-8 text-sm leading-relaxed">
          {/* MENTIONS LÉGALES */}
          <section>
            <h3 className={`text-xs font-bold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-cyan-400" : "text-violet-600"
            }`}>
              Mentions légales
            </h3>

            <dl className="space-y-3">
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Éditeur du site</dt>
                <dd>{editor.name} — {editor.location}</dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Directeur de la publication</dt>
                <dd>{editor.director}</dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Contact</dt>
                <dd>
                  <a
                    href={`mailto:${contactEmail}`}
                    className={`underline ${isDark ? "text-cyan-300 hover:text-cyan-200" : "text-violet-600 hover:text-violet-800"}`}
                  >
                    {contactEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Site</dt>
                <dd>
                  <a
                    href={siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`underline ${isDark ? "text-cyan-300 hover:text-cyan-200" : "text-violet-600 hover:text-violet-800"}`}
                  >
                    {siteUrl}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Hébergeur</dt>
                <dd>
                  {host.name} — {host.address} —{" "}
                  <a
                    href={host.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`underline ${isDark ? "text-cyan-300 hover:text-cyan-200" : "text-violet-600 hover:text-violet-800"}`}
                  >
                    {host.website.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Propriété intellectuelle</dt>
                <dd>
                  L'ensemble du contenu de ce site (textes, images, code, design) est la propriété exclusive de {editor.name},
                  sauf mention contraire. Toute reproduction, représentation ou diffusion, totale ou partielle, sans
                  autorisation écrite préalable est interdite.
                </dd>
              </div>
            </dl>
          </section>

          {/* POLITIQUE DE CONFIDENTIALITÉ */}
          <section>
            <h3 className={`text-xs font-bold uppercase tracking-[0.25em] mb-4 ${
              isDark ? "text-cyan-400" : "text-violet-600"
            }`}>
              Politique de confidentialité (RGPD)
            </h3>

            <dl className="space-y-3">
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Responsable du traitement</dt>
                <dd>{editor.name}</dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Données collectées</dt>
                <dd>{privacy.dataCollected}</dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Finalité</dt>
                <dd>{privacy.purpose}</dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Base légale</dt>
                <dd>{privacy.legalBasis}</dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Durée de conservation</dt>
                <dd>{privacy.retention}</dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Destinataires</dt>
                <dd>{privacy.recipients}</dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Vos droits</dt>
                <dd>
                  {privacy.rights} Pour les exercer, écrivez à{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className={`underline ${isDark ? "text-cyan-300 hover:text-cyan-200" : "text-violet-600 hover:text-violet-800"}`}
                  >
                    {contactEmail}
                  </a>.
                </dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Réclamation</dt>
                <dd>{privacy.cnil}</dd>
              </div>
              <div>
                <dt className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Cookies & traceurs</dt>
                <dd>
                  Ce site est entièrement statique et n'utilise aucun cookie de mesure d'audience,
                  de publicité ou de traçage.
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
