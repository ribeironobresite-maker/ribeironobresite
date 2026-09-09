import Image from "next/image";
import WhatsAppCTA from "./WhatsAppCTA";

const situacoes = [
  "Demissão sem justa causa ou com verbas em aberto",
  "Horas extras, banco de horas, intervalos não pagos",
  "Assédio moral ou sexual no trabalho",
  "Acidente de trabalho ou doença ocupacional",
  "Reconhecimento de vínculo (pejotização, terceirização)",
  "Danos morais e materiais (acidente, defeito de produto, etc.)",
  "Contratos: revisão, rescisão, cobranças, locação",
  "Indenizações por relações de consumo",
];

export default function QuandoProcurar() {
  return (
    <section id="quando" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <div
            className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border relative"
            style={{ borderColor: "var(--border-soft)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80"
              alt="Documentos jurídicos"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
            Quando me procurar
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl mb-4 leading-tight"
            style={{ color: "var(--bg-dark)" }}
          >
            Situações comuns
            <br />
            em que atuo
          </h2>
          <div className="gold-rule w-20 mb-6" />
          <p className="leading-relaxed mb-8 text-dark">
            Cada caso tem suas nuances. Analiso sua situação e indico o
            caminho mais adequado — sempre com transparência sobre prazos
            e expectativas.
          </p>

          <ul className="space-y-3">
            {situacoes.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <span
                  className="mt-1 grid place-items-center w-5 h-5 rounded-full shrink-0"
                  style={{ background: "rgba(201, 169, 97, 0.15)" }}
                >
                  <svg
                    className="w-3 h-3 text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 12l5 5L20 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="leading-relaxed text-dark">{s}</span>
              </li>
            ))}
          </ul>

          <div
            className="mt-8 p-5 rounded-xl flex items-start gap-3 border"
            style={{
              background: "var(--bg-page-2)",
              borderColor: "var(--border-soft)",
            }}
          >
            <svg
              className="w-5 h-5 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{ color: "var(--bg-dark)" }}
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p className="text-sm leading-relaxed text-dark">
              Sua situação não está na lista?{" "}
              <WhatsAppCTA
                className="font-medium underline inline bg-transparent p-0 border-0"
                style={{
                  color: "var(--bg-dark)",
                  textDecorationColor: "var(--accent)",
                  textUnderlineOffset: "2px",
                }}
              >
                Fale comigo
              </WhatsAppCTA>{" "}
              — avalio em poucos minutos se posso te ajudar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
