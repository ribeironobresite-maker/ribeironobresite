import { getActiveAreas } from "@/lib/practice-areas";
import { PracticeAreaIcon } from "@/lib/practice-area-icons";

export default async function Areas() {
  const areas = await getActiveAreas();

  if (areas.length === 0) return null;

  // Largura de cada card conforme colunas desejadas
  const cardWidth =
    areas.length === 1
      ? "w-full max-w-md"
      : areas.length === 2
        ? "w-full md:w-[calc(50%-0.75rem)]"
        : "w-full md:w-[calc(33.333%-1rem)]";

  return (
    <section id="areas" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
            Áreas de atuação
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl mb-4"
            style={{ color: "var(--bg-dark)" }}
          >
            Como posso te ajudar
          </h2>
          <div className="gold-rule w-24 mx-auto" />
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {areas.map((area) =>
            area.highlighted ? (
              // Variante destacada: bordado dourado mais grosso + selo
              <article
                key={area.id}
                className={`card-hover bg-dark text-light rounded-2xl p-8 relative overflow-hidden ring-2 ${cardWidth}`}
                style={{
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  "--tw-ring-color": "var(--accent)",
                } as React.CSSProperties}
              >
                <div
                  className="w-12 h-12 rounded-full grid place-items-center mb-5"
                  style={{ background: "var(--accent)" }}
                >
                  <PracticeAreaIcon
                    iconKey={area.icon}
                    className="w-6 h-6"
                    stroke="var(--bg-dark)"
                  />
                </div>
                <h3 className="font-serif text-2xl mb-3">{area.title}</h3>
                <p className="text-light-soft leading-relaxed text-sm mb-4">
                  {area.body}
                </p>
                <span className="inline-flex items-center gap-1 text-accent text-xs font-medium uppercase tracking-wider">
                  Especialidade principal
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </article>
            ) : (
              <article
                key={area.id}
                className={`card-hover bg-dark text-light rounded-2xl p-8 relative overflow-hidden ${cardWidth}`}
              >
                <div
                  className="w-12 h-12 rounded-full grid place-items-center mb-5"
                  style={{ background: "var(--accent)" }}
                >
                  <PracticeAreaIcon
                    iconKey={area.icon}
                    className="w-6 h-6"
                    stroke="var(--bg-dark)"
                  />
                </div>
                <h3 className="font-serif text-2xl mb-3">{area.title}</h3>
                <p className="text-light-soft leading-relaxed text-sm">
                  {area.body}
                </p>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
