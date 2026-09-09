"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

export default function CalendlySection({ url }: { url: string }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Reduz altura do popup e oculta banner de cookies
    const style = document.createElement("style");
    style.id = "calendly-override";
    style.textContent = `
      .calendly-overlay .calendly-popup {
        height: 620px !important;
        max-height: 88vh !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
      const s = document.getElementById("calendly-override");
      if (s) s.remove();
    };
  }, []);

  function openCalendly() {
    const urlWithParams = `${url}?hide_gdpr_banner=1`;
    window.Calendly?.initPopupWidget({ url: urlWithParams });
  }

  return (
    <section id="agendamento" className="py-12 md:py-16 bg-page-2">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
          Agendamento
        </div>
        <h2
          className="font-serif text-3xl md:text-4xl mb-4"
          style={{ color: "var(--bg-dark)" }}
        >
          Agende sua consulta
        </h2>
        <div className="gold-rule w-24 mx-auto mb-5" />
        <p className="text-sm max-w-xl mx-auto leading-relaxed text-dark mb-8">
          Atendimento presencial em Maricá ou online por videochamada.
          Escolha o horário que melhor se encaixa na sua rotina.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={openCalendly}
            className="btn-primary px-10 py-4 rounded-full font-semibold text-base inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Agendar consulta
          </button>
          <p className="text-xs text-dark" style={{ opacity: 0.6 }}>
            Consulta online ou presencial · 30 minutos
          </p>
        </div>
      </div>
    </section>
  );
}
