import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import { getSiteSettings } from "@/lib/settings";
import { saveAppearance } from "./actions";

export const metadata = { title: "Aparência" };

const PALETTE_OPTIONS = [
  { value: "navy", label: "Marinho clássico", swatch: "#0c1f3d", accent: "#c9a961" },
  { value: "emerald", label: "Verde institucional", swatch: "#064e3b", accent: "#b08d57" },
  { value: "black", label: "Preto & Dourado", swatch: "#0a0a0a", accent: "#c9a161" },
  { value: "wine", label: "Vinho & Dourado", swatch: "#5c1a1b", accent: "#c9a161" },
  { value: "graphite", label: "Grafite & Bronze", swatch: "#2c3036", accent: "#b07b3a" },
  { value: "coffee", label: "Café & Creme", swatch: "#3d2914", accent: "#d4a574" },
] as const;

const ENTRANCE_OPTIONS = [
  { value: "none", label: "Sem efeito" },
  { value: "fade", label: "Fade in" },
  { value: "slide", label: "Slide vindo de baixo" },
  { value: "zoom", label: "Zoom suave" },
  { value: "rotate", label: "Rotação suave" },
  { value: "spin", label: "Spin 360°" },
] as const;

const IDLE_OPTIONS = [
  { value: "none", label: "Sem efeito" },
  { value: "float", label: "Flutuação contínua" },
  { value: "pulse", label: "Pulse contínuo" },
  { value: "slowrotate", label: "Rotação lenta contínua" },
] as const;

export default async function AppearancePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const settings = await getSiteSettings();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2
          className="font-serif text-2xl font-semibold"
          style={{ color: "var(--bg-dark)" }}
        >
          Aparência
        </h2>
        <Link
          href="/admin"
          className="text-sm text-dark hover:opacity-70"
          style={{ opacity: 0.7 }}
        >
          ← Voltar
        </Link>
      </div>

      {saved && (
        <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Configurações salvas. As alterações já estão no site público.
        </div>
      )}
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Valor inválido em &quot;{error}&quot;.
        </div>
      )}

      <form
        action={saveAppearance}
        className="space-y-8 rounded-2xl border bg-page p-6 md:p-8"
        style={{ borderColor: "var(--border-soft)" }}
      >
        {/* ============ PALETA ============ */}
        <section>
          <h3
            className="font-serif text-lg font-semibold mb-1"
            style={{ color: "var(--bg-dark)" }}
          >
            Paleta de cores
          </h3>
          <p className="text-xs text-dark mb-4" style={{ opacity: 0.7 }}>
            Define o esquema de cores do site inteiro.
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            {PALETTE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="cursor-pointer rounded-xl border p-4 hover:border-amber-400 has-[:checked]:ring-2 has-[:checked]:ring-amber-400 has-[:checked]:border-amber-400 transition"
                style={{ borderColor: "var(--border-soft)" }}
              >
                <input
                  type="radio"
                  name="palette"
                  value={opt.value}
                  defaultChecked={settings.palette === opt.value}
                  className="sr-only"
                />
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-8 h-8 rounded-full ring-2"
                    style={{
                      background: opt.swatch,
                      boxShadow: `inset 0 0 0 3px ${opt.accent}`,
                    }}
                  />
                  <span
                    className="font-medium text-sm"
                    style={{ color: "var(--bg-dark)" }}
                  >
                    {opt.label}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* ============ SOBRE O ADVOGADO ============ */}
        <section
          className="pt-6 border-t"
          style={{ borderColor: "var(--border-soft)" }}
        >
          <h3
            className="font-serif text-lg font-semibold mb-1"
            style={{ color: "var(--bg-dark)" }}
          >
            Sobre o advogado
          </h3>
          <p className="text-xs text-dark mb-4" style={{ opacity: 0.7 }}>
            Foto, bio e anos de experiência exibidos na seção
            &quot;Sobre&quot; e no TrustBar do site.
          </p>

          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--bg-dark)" }}
              >
                Foto profissional
              </label>
              <ImageUpload
                name="lawyerPhotoUrl"
                context="team"
                aspectRatio="square"
                defaultValue={settings.lawyerPhotoUrl}
                label="Selecionar foto"
              />
            </div>

            <div className="md:col-span-8 space-y-4">
              <div>
                <label
                  htmlFor="lawyerBio"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--bg-dark)" }}
                >
                  Biografia / apresentação
                </label>
                <textarea
                  id="lawyerBio"
                  name="lawyerBio"
                  rows={8}
                  defaultValue={settings.lawyerBio}
                  className="block w-full rounded-lg border px-3 py-2 text-sm"
                  style={{
                    borderColor: "var(--border-soft)",
                    background: "white",
                  }}
                />
                <p className="text-[11px] text-dark mt-1" style={{ opacity: 0.6 }}>
                  Quebras de linha são preservadas.
                </p>
              </div>

              <div>
                <label
                  htmlFor="lawyerYears"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--bg-dark)" }}
                >
                  Anos de experiência
                </label>
                <input
                  id="lawyerYears"
                  name="lawyerYears"
                  type="text"
                  defaultValue={settings.lawyerYears}
                  placeholder="15"
                  className="block w-full max-w-xs rounded-lg border px-3 py-2 text-sm"
                  style={{
                    borderColor: "var(--border-soft)",
                    background: "white",
                  }}
                />
                <p className="text-[11px] text-dark mt-1" style={{ opacity: 0.6 }}>
                  Aparece como &quot;+X anos de atuação&quot;.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TEXTOS DO HERO ============ */}
        <section
          className="pt-6 border-t"
          style={{ borderColor: "var(--border-soft)" }}
        >
          <h3
            className="font-serif text-lg font-semibold mb-1"
            style={{ color: "var(--bg-dark)" }}
          >
            Textos do hero
          </h3>
          <p className="text-xs text-dark mb-4" style={{ opacity: 0.7 }}>
            Os 3 textos que aparecem no topo do site (à esquerda do card visual).
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="heroEyebrow"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--bg-dark)" }}
              >
                Texto pequeno superior{" "}
                <span
                  className="font-normal text-dark"
                  style={{ opacity: 0.6 }}
                >
                  (eyebrow, todo em maiúsculas no site)
                </span>
              </label>
              <input
                id="heroEyebrow"
                name="heroEyebrow"
                type="text"
                defaultValue={settings.heroEyebrow}
                placeholder="Advocacia · Maricá"
                maxLength={80}
                className="block w-full rounded-lg border px-3 py-2 text-sm"
                style={{
                  borderColor: "var(--border-soft)",
                  background: "white",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="heroHeading"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--bg-dark)" }}
              >
                Título grande do hero
              </label>
              <textarea
                id="heroHeading"
                name="heroHeading"
                rows={4}
                defaultValue={settings.heroHeading}
                placeholder={
                  "Cível, Consumidor\ne Trabalhista, com\n*técnica e proximidade*."
                }
                className="block w-full rounded-lg border px-3 py-2 text-sm font-serif"
                style={{
                  borderColor: "var(--border-soft)",
                  background: "white",
                }}
              />
              <p
                className="text-[11px] text-dark mt-1.5 leading-relaxed"
                style={{ opacity: 0.6 }}
              >
                Pressione Enter para quebrar linha. Coloque a parte em destaque
                entre asteriscos: <code>*texto destacado*</code> — fica em
                itálico dourado.
              </p>
            </div>

            <div>
              <label
                htmlFor="heroDescription"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--bg-dark)" }}
              >
                Descrição (parágrafo abaixo do título)
              </label>
              <textarea
                id="heroDescription"
                name="heroDescription"
                rows={4}
                defaultValue={settings.heroDescription}
                placeholder="Advocacia solo com mais de 20 anos de atuação..."
                className="block w-full rounded-lg border px-3 py-2 text-sm"
                style={{
                  borderColor: "var(--border-soft)",
                  background: "white",
                }}
              />
              <p
                className="text-[11px] text-dark mt-1.5"
                style={{ opacity: 0.6 }}
              >
                Quebras de linha são preservadas. Mantenha o texto enxuto
                (idealmente até 3 linhas) para não estourar o layout.
              </p>
            </div>
          </div>
        </section>

        {/* ============ HERO (CARD VISUAL) ============ */}
        <section
          className="pt-6 border-t"
          style={{ borderColor: "var(--border-soft)" }}
        >
          <h3
            className="font-serif text-lg font-semibold mb-1"
            style={{ color: "var(--bg-dark)" }}
          >
            Hero da página inicial
          </h3>
          <p className="text-xs text-dark mb-4" style={{ opacity: 0.7 }}>
            O card grande da direita no topo do site.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <label
                className="flex-1 cursor-pointer rounded-xl border p-4 has-[:checked]:ring-2 has-[:checked]:ring-amber-400 has-[:checked]:border-amber-400"
                style={{ borderColor: "var(--border-soft)" }}
              >
                <input
                  type="radio"
                  name="heroMode"
                  value="logo"
                  defaultChecked={settings.heroMode === "logo"}
                  className="sr-only"
                />
                <div
                  className="font-medium text-sm mb-1"
                  style={{ color: "var(--bg-dark)" }}
                >
                  Logo / monograma
                </div>
                <div className="text-xs text-dark" style={{ opacity: 0.7 }}>
                  Mostra as iniciais &quot;AC&quot; com efeitos animados.
                </div>
              </label>

              <label
                className="flex-1 cursor-pointer rounded-xl border p-4 has-[:checked]:ring-2 has-[:checked]:ring-amber-400 has-[:checked]:border-amber-400"
                style={{ borderColor: "var(--border-soft)" }}
              >
                <input
                  type="radio"
                  name="heroMode"
                  value="image"
                  defaultChecked={settings.heroMode === "image"}
                  className="sr-only"
                />
                <div
                  className="font-medium text-sm mb-1"
                  style={{ color: "var(--bg-dark)" }}
                >
                  Imagem personalizada
                </div>
                <div className="text-xs text-dark" style={{ opacity: 0.7 }}>
                  Substitui pela sua foto institucional ou imagem do
                  escritório.
                </div>
              </label>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--bg-dark)" }}
              >
                Imagem do hero{" "}
                <span
                  className="font-normal text-dark"
                  style={{ opacity: 0.6 }}
                >
                  (usada apenas se &quot;Imagem personalizada&quot; estiver
                  selecionada)
                </span>
              </label>
              <ImageUpload
                name="heroImageUrl"
                context="hero"
                aspectRatio="wide"
                defaultValue={settings.heroImageUrl}
                label="Selecionar imagem do hero"
              />
            </div>
          </div>
        </section>

        {/* ============ EFEITOS DA LOGO ============ */}
        <section
          className="pt-6 border-t"
          style={{ borderColor: "var(--border-soft)" }}
        >
          <h3
            className="font-serif text-lg font-semibold mb-1"
            style={{ color: "var(--bg-dark)" }}
          >
            Efeitos do monograma no hero
          </h3>
          <p className="text-xs text-dark mb-4" style={{ opacity: 0.7 }}>
            Aplicados quando o hero está no modo &quot;Logo&quot;.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="heroLogoEntrance"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--bg-dark)" }}
              >
                Entrada{" "}
                <span
                  className="font-normal text-dark"
                  style={{ opacity: 0.6 }}
                >
                  (toca 1× ao abrir)
                </span>
              </label>
              <select
                id="heroLogoEntrance"
                name="heroLogoEntrance"
                defaultValue={settings.heroLogoEntrance}
                className="block w-full rounded-lg border px-3 py-2 text-sm"
                style={{
                  borderColor: "var(--border-soft)",
                  background: "white",
                }}
              >
                {ENTRANCE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="heroLogoIdle"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--bg-dark)" }}
              >
                Contínuo{" "}
                <span
                  className="font-normal text-dark"
                  style={{ opacity: 0.6 }}
                >
                  (loop)
                </span>
              </label>
              <select
                id="heroLogoIdle"
                name="heroLogoIdle"
                defaultValue={settings.heroLogoIdle}
                className="block w-full rounded-lg border px-3 py-2 text-sm"
                style={{
                  borderColor: "var(--border-soft)",
                  background: "white",
                }}
              >
                {IDLE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* ============ AÇÕES ============ */}
        <div
          className="flex items-center justify-end gap-3 border-t pt-6"
          style={{ borderColor: "var(--border-soft)" }}
        >
          <Link
            href="/admin"
            className="rounded border px-4 py-2 text-sm hover:bg-page-2"
            style={{ borderColor: "var(--border-soft)" }}
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="rounded btn-dark px-4 py-2 text-sm font-medium"
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
}
