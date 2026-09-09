import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";
import { saveContato } from "./actions";

export const metadata = { title: "Contato" };

export default async function ContatoPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const settings = await getSiteSettings();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold" style={{ color: "var(--bg-dark)" }}>
          Contato
        </h2>
        <Link href="/admin" className="text-sm text-dark hover:opacity-70" style={{ opacity: 0.7 }}>
          ← Voltar
        </Link>
      </div>

      {saved && (
        <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Informações salvas com sucesso. As alterações já estão no site.
        </div>
      )}

      <form
        action={saveContato}
        className="space-y-8 rounded-2xl border bg-page p-6 md:p-8"
        style={{ borderColor: "var(--border-soft)" }}
      >
        {/* Endereço */}
        <section>
          <h3 className="font-serif text-lg font-semibold mb-1" style={{ color: "var(--bg-dark)" }}>
            Endereço do escritório
          </h3>
          <p className="text-sm text-dark mb-5" style={{ opacity: 0.7 }}>
            Aparece na seção Contato e no rodapé do site.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-dark mb-1.5" htmlFor="contactCity">
                Cidade
              </label>
              <input
                id="contactCity"
                name="contactCity"
                type="text"
                defaultValue={settings.contactCity}
                placeholder="Maricá"
                className="w-full rounded-lg border px-3 py-2.5 text-sm bg-page text-dark focus:outline-none focus:ring-2"
                style={{ borderColor: "var(--border-soft)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-dark mb-1.5" htmlFor="contactState">
                Estado (UF)
              </label>
              <input
                id="contactState"
                name="contactState"
                type="text"
                maxLength={2}
                defaultValue={settings.contactState}
                placeholder="RJ"
                className="w-full rounded-lg border px-3 py-2.5 text-sm bg-page text-dark focus:outline-none focus:ring-2 uppercase"
                style={{ borderColor: "var(--border-soft)" }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-dark mb-1.5" htmlFor="contactAddress">
              Endereço (rua e número)
            </label>
            <input
              id="contactAddress"
              name="contactAddress"
              type="text"
              defaultValue={settings.contactAddress}
              placeholder="Rua Domício da Gama, 89, loja 3"
              className="w-full rounded-lg border px-3 py-2.5 text-sm bg-page text-dark focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--border-soft)" }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-dark mb-1.5" htmlFor="contactNeighborhood">
              Bairro / Complemento
            </label>
            <input
              id="contactNeighborhood"
              name="contactNeighborhood"
              type="text"
              defaultValue={settings.contactNeighborhood}
              placeholder="Edifício Shopping Maricá · Centro"
              className="w-full rounded-lg border px-3 py-2.5 text-sm bg-page text-dark focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--border-soft)" }}
            />
          </div>
        </section>

        <hr style={{ borderColor: "var(--border-soft)" }} />

        {/* WhatsApp */}
        <section>
          <h3 className="font-serif text-lg font-semibold mb-1" style={{ color: "var(--bg-dark)" }}>
            WhatsApp
          </h3>
          <p className="text-sm text-dark mb-5" style={{ opacity: 0.7 }}>
            Número usado nos botões de contato e no rodapé.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-dark mb-1.5" htmlFor="contactWhatsappNumber">
                Número (somente dígitos com DDI)
              </label>
              <input
                id="contactWhatsappNumber"
                name="contactWhatsappNumber"
                type="tel"
                defaultValue={settings.contactWhatsappNumber}
                placeholder="5521987751070"
                className="w-full rounded-lg border px-3 py-2.5 text-sm bg-page text-dark focus:outline-none focus:ring-2"
                style={{ borderColor: "var(--border-soft)" }}
              />
              <p className="mt-1 text-[11px] text-dark" style={{ opacity: 0.55 }}>
                Ex: 5521987751070 (55 = Brasil · 21 = DDD · número)
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-dark mb-1.5" htmlFor="contactWhatsappDisplay">
                Exibição (como aparece no site)
              </label>
              <input
                id="contactWhatsappDisplay"
                name="contactWhatsappDisplay"
                type="text"
                defaultValue={settings.contactWhatsappDisplay}
                placeholder="(21) 98775-1070"
                className="w-full rounded-lg border px-3 py-2.5 text-sm bg-page text-dark focus:outline-none focus:ring-2"
                style={{ borderColor: "var(--border-soft)" }}
              />
              <p className="mt-1 text-[11px] text-dark" style={{ opacity: 0.55 }}>
                Formato livre — é exatamente isso que aparece para o visitante.
              </p>
            </div>
          </div>
        </section>

        <hr style={{ borderColor: "var(--border-soft)" }} />

        {/* Email */}
        <section>
          <h3 className="font-serif text-lg font-semibold mb-1" style={{ color: "var(--bg-dark)" }}>
            E-mail
          </h3>
          <p className="text-sm text-dark mb-5" style={{ opacity: 0.7 }}>
            Aparece na seção Contato e no rodapé como link clicável.
          </p>
          <div>
            <label className="block text-xs font-medium text-dark mb-1.5" htmlFor="contactEmail">
              E-mail
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              defaultValue={settings.contactEmail}
              placeholder="cardozoadvogado@hotmail.com"
              className="w-full max-w-md rounded-lg border px-3 py-2.5 text-sm bg-page text-dark focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--border-soft)" }}
            />
          </div>
        </section>

        <hr style={{ borderColor: "var(--border-soft)" }} />

        {/* Calendly */}
        <section>
          <h3 className="font-serif text-lg font-semibold mb-1" style={{ color: "var(--bg-dark)" }}>
            Agendamento (Calendly)
          </h3>
          <p className="text-sm text-dark mb-5" style={{ opacity: 0.7 }}>
            URL da página de agendamento no Calendly. Deixe em branco para ocultar a seção.
          </p>
          <div>
            <label className="block text-xs font-medium text-dark mb-1.5" htmlFor="calendlyUrl">
              URL do Calendly
            </label>
            <input
              id="calendlyUrl"
              name="calendlyUrl"
              type="url"
              defaultValue={settings.calendlyUrl}
              placeholder="https://calendly.com/accardozo-site"
              className="w-full rounded-lg border px-3 py-2.5 text-sm bg-page text-dark focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--border-soft)" }}
            />
          </div>
        </section>

        <hr style={{ borderColor: "var(--border-soft)" }} />

        {/* Google Maps */}
        <section>
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="font-serif text-lg font-semibold" style={{ color: "var(--bg-dark)" }}>
                Mapa do escritório
              </h3>
              <p className="text-sm text-dark mt-0.5" style={{ opacity: 0.7 }}>
                Exibe um mapa do Google Maps na seção de contato.
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-1">
              <span className="text-sm text-dark" style={{ opacity: 0.8 }}>Ativar</span>
              <input
                type="checkbox"
                name="contactMapsEnabled"
                defaultChecked={settings.contactMapsEnabled}
                className="w-4 h-4 accent-[var(--accent)] cursor-pointer"
              />
            </label>
          </div>

          <div className="mt-5">
            <label className="block text-xs font-medium text-dark mb-1.5" htmlFor="contactMapsUrl">
              URL do embed do Google Maps
            </label>
            <input
              id="contactMapsUrl"
              name="contactMapsUrl"
              type="url"
              defaultValue={settings.contactMapsUrl}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="w-full rounded-lg border px-3 py-2.5 text-sm bg-page text-dark focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--border-soft)" }}
            />
            <p className="mt-2 text-[11px] text-dark leading-relaxed" style={{ opacity: 0.55 }}>
              Para obter: abra o endereço no{" "}
              <strong>Google Maps → Compartilhar → Incorporar um mapa</strong>{" "}
              → copie o código todo e cole aqui. O site extrai a URL automaticamente.
            </p>
          </div>
        </section>

        <div className="flex items-center gap-4 pt-2">
          <button type="submit" className="btn-primary px-8 py-3 rounded-full font-semibold">
            Salvar alterações
          </button>
          <Link
            href="/#contato"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-dark hover:opacity-70"
            style={{ opacity: 0.6 }}
          >
            Ver no site →
          </Link>
        </div>
      </form>

      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('contactMapsUrl').addEventListener('paste', function(e) {
          var text = (e.clipboardData || window.clipboardData).getData('text');
          var match = text.match(/src="([^"]+)"/);
          if (match) {
            e.preventDefault();
            this.value = match[1];
          }
        });
      ` }} />
    </div>
  );
}
