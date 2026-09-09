import { site } from "@/lib/site";
import { getSiteSettings, buildOfficeFromSettings } from "@/lib/settings";

export default async function Footer() {
  const settings = await getSiteSettings();
  const office = buildOfficeFromSettings(settings);
  const contactEmail = settings.contactEmail;

  return (
    <footer
      className="bg-darkest border-t text-light-soft text-sm"
      style={{ borderColor: "var(--border-soft-dark)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <div
            className="font-serif text-xl mb-2 text-light"
            style={{ color: "var(--text-light)" }}
          >
            {site.name}
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
            {site.tagline}
          </div>
          <p className="leading-relaxed">
            Advocacia solo com atuação técnica em direito cível, do consumidor
            e trabalhista.
            Atendimento direto com o advogado em {office.city} · {office.state}.
          </p>
        </div>

        <div>
          <div className="text-light font-medium mb-3">Credencial</div>
          <ul className="space-y-1 text-xs">
            <li>{site.oab.primary}</li>
          </ul>
        </div>

        <div>
          <div className="text-light font-medium mb-3">Contato</div>
          <ul className="space-y-1">
            <li>
              <a href={`mailto:${contactEmail}`} className="hover:text-accent">
                {contactEmail}
              </a>
            </li>
            <li>
              {office.whatsapp.display} · {office.city}
            </li>
          </ul>
        </div>
      </div>

      <div
        className="border-t"
        style={{ borderColor: "var(--border-soft-dark)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 text-xs flex flex-wrap gap-3 justify-between text-light-soft-2">
          <span>
            © {new Date().getFullYear()} {site.name}. Todos os direitos
            reservados.
          </span>
          <span>
            {office.city} · {office.state}
          </span>
        </div>
      </div>
    </footer>
  );
}
