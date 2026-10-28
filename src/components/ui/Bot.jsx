/**
 * @file components/ui/Bot.jsx
 * @description Boulon, le petit robot du portfolio (en bas à droite).
 * - Mascotte scriptée : il ne répond qu'avec les textes de data/bot.js, rien n'est généré.
 * - Apparaît après le haut de la page d'accueil (tout de suite sur une page projet).
 * - Deux bulles, une seule fois par visite : un bonjour, puis un rappel de contacter
 *   Ludovic quand le formulaire de contact arrive à l'écran.
 * - Ses yeux suivent le pointeur ; son oreille-engrenage tourne quand il « écrit ».
 *
 * Accessibilité : bouton avec aria-expanded, panneau non modal (role="dialog"),
 * Échap le referme et rend le focus au bouton, réponses annoncées (aria-live).
 * Sans animations si l'utilisateur a demandé moins de mouvement.
 *
 * Props :
 * - isDark : thème sombre
 * - isHome : vrai sur la page d'accueil
 *
 * Exemple :
 * <Bot isDark isHome />
 */

import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import { BOT } from "../../data/bot";
import { navigate } from "../../router";
import { gearPath } from "../../utils/gear";

const EAR_GEAR = gearPath({ teeth: 8, radius: 6, depth: 2.6, hole: 2 });

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Mémoire « déjà vu » pour la visite (sans planter si le stockage est bloqué) */
const seen = {
  get(key) {
    try { return sessionStorage.getItem(`boulon-${key}`) === "1"; } catch { return false; }
  },
  set(key) {
    try { sessionStorage.setItem(`boulon-${key}`, "1"); } catch { /* stockage indisponible */ }
  },
};

/** Le visage de Boulon, en SVG */
function BoulonFace({ isDark, talking, eyesRef }) {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
      {/* Antenne */}
      <line x1="32" y1="6" x2="32" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-slate-400" />
      <circle cx="32" cy="6" r="3.5" className={`boulon-antenna ${isDark ? "fill-cyan-400" : "fill-violet-600"}`} />
      {/* Oreille engrenage */}
      <g transform="translate(9 33)">
        <path d={EAR_GEAR} fillRule="evenodd" className={`fill-slate-400 ${talking ? "boulon-ear-spin" : ""}`} />
      </g>
      {/* Tête */}
      <rect x="12" y="15" width="42" height="34" rx="12" className={isDark ? "fill-[#2a2a3a] stroke-slate-500" : "fill-white stroke-slate-300"} strokeWidth="2" />
      {/* Écran */}
      <rect x="18" y="22" width="30" height="20" rx="7" className="fill-[#0d0d14]" />
      {/* Yeux (suivent le pointeur) */}
      <g ref={eyesRef} style={{ transition: "transform 0.15s ease-out" }}>
        <rect x="24" y="27.5" width="5" height="7" rx="2.5" className={`boulon-eye ${isDark ? "fill-cyan-300" : "fill-violet-300"}`} />
        <rect x="37" y="27.5" width="5" height="7" rx="2.5" className={`boulon-eye ${isDark ? "fill-cyan-300" : "fill-violet-300"}`} />
      </g>
      {/* Bouche */}
      <path d={talking ? "M29 37.5 Q33 41 37 37.5" : "M29.5 38 Q33 39.5 36.5 38"} fill="none" strokeWidth="1.8" strokeLinecap="round" className={isDark ? "stroke-cyan-300" : "stroke-violet-300"} />
    </svg>
  );
}

export function Bot({ isDark = true, isHome = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [contactSeen, setContactSeen] = useState(false);
  const visible = !isHome || scrolled || contactSeen;
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(null);
  const [messages, setMessages] = useState([{ from: "bot", text: BOT.greeting }]);
  const [asked, setAsked] = useState([]);
  const [typing, setTyping] = useState(false);
  const eyesRef = useRef(null);
  const firstChoiceRef = useRef(null);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const listRef = useRef(null);
  const timers = useRef([]);
  const panelId = useId();

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Apparition : après le Hero sur l'accueil, tout de suite ailleurs
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const showTeaser = useEffectEvent((key) => {
    if (open || seen.get(key)) return;
    seen.set(key);
    // La bulle est liée à la page où elle apparaît (elle ne suit pas le visiteur ailleurs)
    const bubble = { text: BOT.teasers[key], home: isHome };
    setTeaser(bubble);
    later(() => setTeaser((t) => (t === bubble ? null : t)), 7000);
  });

  // Bulle de bonjour, la première fois que Boulon apparaît
  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => showTeaser("hello"), 900);
    return () => clearTimeout(id);
  }, [visible]);

  // Rappel quand le formulaire de contact arrive à l'écran
  useEffect(() => {
    if (!isHome || typeof IntersectionObserver === "undefined") return;
    const target = document.getElementById("contact");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContactSeen(true);
          showTeaser("contact");
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isHome]);

  // Les yeux suivent le pointeur
  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = buttonRef.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const len = Math.hypot(dx, dy) || 1;
        // Écrit directement dans le DOM : pas de nouveau rendu à chaque mouvement
        eyesRef.current?.style.setProperty("transform", `translate(${((dx / len) * 2.2).toFixed(2)}px, ${((dy / len) * 1.6).toFixed(2)}px)`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [visible]);

  // Échap referme le panneau
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !e.defaultPrevented) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // À l'ouverture, le focus entre dans le panneau (première question, sinon Fermer)
  useEffect(() => {
    if (!open) return;
    (firstChoiceRef.current ?? panelRef.current?.querySelector("button"))?.focus();
  }, [open]);

  // Garde la dernière réponse visible
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, typing]);

  const toggle = () => {
    setTeaser(null);
    setOpen((o) => !o);
  };

  const ask = (question) => {
    if (typing) return;
    setAsked((a) => [...a, question.id]);
    setMessages((m) => [...m, { from: "me", text: question.label }]);
    const reply = () => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: question.answer, links: question.links }]);
    };
    if (reducedMotion()) {
      reply();
      return;
    }
    setTyping(true);
    later(reply, 650);
  };

  const followLink = (e, to) => {
    if (!to.startsWith("/")) return; // lien externe : comportement normal
    e.preventDefault();
    setOpen(false);
    navigate(to);
  };

  const remaining = BOT.questions.filter((q) => !asked.includes(q.id));
  const showBubble = Boolean(teaser) && teaser.home === isHome && !open;
  const talking = typing;

  const surface = isDark ? "bg-[#14141c] border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-700";
  const chip = isDark
    ? "border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/10 hover:border-cyan-400"
    : "border-violet-300 text-violet-800 hover:bg-violet-50 hover:border-violet-500";

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end gap-3 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      style={{ viewTransitionName: "boulon" }}
      inert={!visible}
    >
      {/* Panneau de discussion */}
      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label={`${BOT.name}, ${BOT.role}`}
          className={`boulon-panel w-[min(22rem,calc(100vw-2rem))] rounded-2xl border shadow-2xl overflow-hidden ${surface} ${
            isDark ? "shadow-cyan-500/10" : "shadow-violet-200/60"
          }`}
        >
          <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? "border-slate-700" : "border-slate-200"}`}>
            <p className="text-sm">
              <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{BOT.name}</span>
              <span className={isDark ? "text-slate-400" : "text-slate-600"}>, {BOT.role}</span>
            </p>
            <button
              type="button"
              onClick={() => { setOpen(false); buttonRef.current?.focus(); }}
              aria-label={`Fermer la discussion avec ${BOT.name}`}
              className={`h-7 w-7 rounded-full text-lg leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                isDark ? "text-slate-400 hover:text-white hover:bg-white/10" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <ol ref={listRef} aria-live="polite" className="max-h-[min(22rem,50vh)] overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <li key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`boulon-msg max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === "me"
                      ? isDark ? "bg-cyan-500/15 text-cyan-100 rounded-br-md" : "bg-slate-800 text-white rounded-br-md"
                      : isDark ? "bg-[#22222e] rounded-bl-md" : "bg-slate-100 rounded-bl-md"
                  }`}
                >
                  <span className="sr-only">{m.from === "me" ? "Vous : " : `${BOT.name} : `}</span>
                  {m.text}
                  {m.links?.length > 0 && (
                    <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {m.links.map((l) => (
                        <a
                          key={l.to}
                          href={l.to}
                          onClick={(e) => followLink(e, l.to)}
                          {...(l.to.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                          className={`font-semibold underline underline-offset-4 ${isDark ? "text-cyan-300" : "text-violet-700"}`}
                        >
                          {l.label}
                        </a>
                      ))}
                    </span>
                  )}
                </div>
              </li>
            ))}
            {typing && (
              <li className="flex justify-start" aria-hidden="true">
                <span className={`rounded-2xl rounded-bl-md px-3.5 py-3 flex gap-1 ${isDark ? "bg-[#22222e]" : "bg-slate-100"}`}>
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="boulon-dot h-1.5 w-1.5 rounded-full bg-current opacity-60" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </span>
              </li>
            )}
          </ol>

          <div className={`px-4 pb-4 pt-1 flex flex-wrap gap-2 ${remaining.length === 0 ? "hidden" : ""}`}>
            {remaining.map((q, i) => (
              <button
                key={q.id}
                ref={i === 0 ? firstChoiceRef : undefined}
                type="button"
                onClick={() => ask(q)}
                disabled={typing}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${chip}`}
              >
                {q.label}
              </button>
            ))}
          </div>

          <div className={`px-4 py-3 border-t ${isDark ? "border-slate-700" : "border-slate-200"}`}>
            <a
              href="/#contact"
              onClick={(e) => followLink(e, "/#contact")}
              className={`block w-full text-center font-semibold px-4 py-2.5 rounded-lg uppercase tracking-widest text-xs border transition-all ${
                isDark
                  ? "bg-[#2a2a3a] hover:bg-[#3a3a4a] border-slate-600 hover:border-cyan-500 text-white"
                  : "bg-slate-800 hover:bg-slate-700 border-slate-800 text-white"
              }`}
            >
              Contacter Ludovic
            </a>
          </div>
        </div>
      )}

      {/* Bulle (une fois par visite) */}
      {showBubble && (
        <button
          type="button"
          onClick={toggle}
          className={`boulon-teaser max-w-[15rem] text-left rounded-2xl rounded-br-md border px-4 py-3 text-sm shadow-xl ${surface}`}
        >
          {teaser.text}
        </button>
      )}

      {/* Boulon */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? `Fermer la discussion avec ${BOT.name}` : `Discuter avec ${BOT.name}, ${BOT.role}`}
        className={`boulon-button relative h-16 w-16 rounded-full border shadow-xl transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
          isDark ? "bg-[#1a1a24] border-slate-600 shadow-cyan-500/20" : "bg-slate-50 border-slate-300 shadow-violet-200/70"
        }`}
      >
        <span className="absolute inset-1.5">
          <BoulonFace isDark={isDark} talking={talking} eyesRef={eyesRef} />
        </span>
      </button>
    </div>
  );
}
