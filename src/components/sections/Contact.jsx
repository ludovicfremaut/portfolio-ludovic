/**
 * @file components/sections/Contact.jsx
 * @description Section de formulaire de contact.
 * Permet aux visiteurs d'envoyer un message via Formspree.
 * Supporte light/dark mode.
 * 
 * Features:
 * - Formulaire avec validation HTML5
 * - Envoi via Formspree (API)
 * - États: loading, success, error
 * - Utilise le hook useContactForm pour la logique
 */

import { useContactForm } from "../../hooks/useContactForm";
import { CheckIcon } from "../../assets/icons";

/**
 * Section Contact avec formulaire
 */
export function Contact({ isDark = true }) {
  const { form, sent, loading, error, updateField, handleSubmit } = useContactForm();

  return (
    <section id="contact" className={`py-20 px-6 transition-colors duration-300 ${
      isDark ? "bg-transparent" : "bg-white"
    }`}>
      <div className="max-w-xl mx-auto">
        <h2 className={`text-center text-2xl font-bold uppercase tracking-[0.3em] mb-2 ${
          isDark ? "text-white" : "text-slate-800"
        }`}>
          Contact
        </h2>
        <p className="text-center text-sm text-slate-500 mb-10">
          Un projet, une idée ? Parlons-en.
        </p>

        {sent ? (
          <SuccessMessage isDark={isDark} />
        ) : (
          <ContactForm 
            form={form} 
            updateField={updateField} 
            onSubmit={handleSubmit} 
            isDark={isDark}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </section>
  );
}

/**
 * Message de confirmation après envoi
 */
function SuccessMessage({ isDark }) {
  return (
    <div className="text-center py-12">
      <div className="w-14 h-14 rounded-full bg-emerald-900/30 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
        <CheckIcon className="w-6 h-6 text-emerald-400" />
      </div>
      <p className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-800"}`}>
        Message envoyé !
      </p>
      <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
        Je reviendrai vers vous rapidement.
      </p>
    </div>
  );
}

/**
 * Formulaire de contact
 */
function ContactForm({ form, updateField, onSubmit, isDark, loading, error }) {
  const inputClasses = isDark
    ? "bg-[#14141c] border-slate-700 text-white placeholder-slate-600 focus:border-slate-500"
    : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-500";
    
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Champ Nom */}
        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            Nom
          </label>
          <input
            type="text"
            name="name"
            required
            disabled={loading}
            value={form.nom}
            onChange={(e) => updateField("nom", e.target.value)}
            placeholder="Votre nom"
            className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors disabled:opacity-50 ${inputClasses}`}
          />
        </div>

        {/* Champ Email */}
        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            disabled={loading}
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="votre@email.com"
            className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors disabled:opacity-50 ${inputClasses}`}
          />
        </div>
      </div>

      {/* Champ Message */}
      <div>
        <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
          isDark ? "text-slate-400" : "text-slate-600"
        }`}>
          Message
        </label>
        <textarea
          name="message"
          required
          disabled={loading}
          rows={5}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          placeholder="Décrivez votre projet..."
          className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors resize-none disabled:opacity-50 ${inputClasses}`}
        />
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/40 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Bouton Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full font-semibold py-3.5 rounded-lg uppercase tracking-widest text-sm transition-all duration-200 border disabled:opacity-50 disabled:cursor-not-allowed ${
          isDark 
            ? "bg-[#2a2a3a] hover:bg-[#3a3a4a] border-slate-600 hover:border-slate-500 hover:shadow-xl hover:shadow-cyan-500/50 text-white" 
            : "bg-slate-800 hover:bg-slate-700 border-slate-800 hover:border-slate-600 hover:shadow-xl hover:shadow-slate-300/50 text-white"
        }`}
      >
        {loading ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}
