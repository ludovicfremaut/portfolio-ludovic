/**
 * @file hooks/useContactForm.js
 * @description Hook personnalisé pour gérer le formulaire de contact.
 * Utilise Formspree pour l'envoi des messages.
 * 
 * Encapsule toute la logique :
 * - État du formulaire (nom, email, message)
 * - État d'envoi (sent, loading, error)
 * - Gestion de la soumission via Formspree
 * 
 * Usage:
 * const { form, sent, loading, error, updateField, handleSubmit } = useContactForm();
 */

import { useState } from "react";

/**
 * Hook pour gérer le formulaire de contact
 * @param {number} resetDelay - Délai en ms avant de reset l'état "sent" (default: 4000)
 * @returns {Object} État et fonctions du formulaire
 */
export function useContactForm(resetDelay = 4000) {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Met à jour un champ du formulaire
   * @param {string} field - Nom du champ (nom, email, message)
   * @param {string} value - Nouvelle valeur
   */
  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Gère la soumission du formulaire via Formspree
   * @param {Event} e - Événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.nom,
          email: form.email,
          message: form.message
        })
      });

      if (response.ok) {
        setSent(true);
        setForm({ nom: "", email: "", message: "" });
        
        // Reset l'état "sent" après le délai
        setTimeout(() => setSent(false), resetDelay);
      } else {
        const data = await response.json();
        setError(data.error || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      setError("Impossible d'envoyer le message. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    sent,
    loading,
    error,
    updateField,
    handleSubmit
  };
}
