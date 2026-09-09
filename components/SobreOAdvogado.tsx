import Image from "next/image";
import { site } from "@/lib/site";
import { getSiteSettings } from "@/lib/settings";
import WhatsAppCTA from "./WhatsAppCTA";

export default async function SobreOAdvogado() {
  const settings = await getSiteSettings();

  return (
    <section id="sobre" className="py-16 md:py-24 bg-page-2">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        {/* Foto do advogado */}
        <div className="md:col-span-5">
          <div
            className="aspect-[3/4] rounded-2xl overflow-hidden border shadow-2xl relative"
            style={{
              borderColor: "var(--accent)",
              borderWidth: "1px",
              background: "var(--bg-dark)",
            }}
          >
            {settings.lawyerPhotoUrl ? (
              <Image
                src={settings.lawyerPhotoUrl}
                alt={site.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-center p-8">
                <div>
                  <div className="font-serif text-7xl text-accent mb-3">
                    FRN
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-light-soft">
                    Foto institucional
                  </div>
                  <div className="text-xs text-light-soft-2 mt-1">
                    (substituir pelo admin)
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
            Sobre o advogado
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl mb-4 leading-tight"
            style={{ color: "var(--bg-dark)" }}
          >
            {site.name}
          </h2>
          <div className="gold-rule w-20 mb-6" />

          <p
            className="text-base leading-relaxed mb-6 whitespace-pre-line"
            style={{ color: "var(--text-dark)" }}
          >
            {settings.lawyerBio}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {site.oab.primary && (
              <div>
                <div className="text-[10px] uppercase tracking-widest text-accent mb-1">
                  Credencial
                </div>
                <div
                  className="font-serif text-lg"
                  style={{ color: "var(--bg-dark)" }}
                >
                  {site.oab.primary}
                </div>
              </div>
            )}
            <div>
              <div className="text-[10px] uppercase tracking-widest text-accent mb-1">
                Experiência
              </div>
              <div
                className="font-serif text-lg"
                style={{ color: "var(--bg-dark)" }}
              >
                +{settings.lawyerYears} anos de atuação
              </div>
            </div>
          </div>

          <WhatsAppCTA className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-full font-semibold">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.52 3.48A12 12 0 003.45 20.42L2 22l1.66-1.42a12 12 0 0016.86-17.1zM12 20a8 8 0 01-4.07-1.11l-.29-.17-3 .8.8-2.92-.18-.3A8 8 0 1112 20z" />
            </svg>
            Falar com o advogado
          </WhatsAppCTA>
        </div>
      </div>
    </section>
  );
}
