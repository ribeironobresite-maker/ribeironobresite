import { site } from "@/lib/site";
import { getSiteSettings } from "@/lib/settings";

export default async function TrustBar() {
  const settings = await getSiteSettings();
  const office = site.offices[0];

  const items = [
    { label: "Inscrito", value: site.oab.primary },
    { label: "Experiência", value: `+${settings.lawyerYears} anos` },
    { label: "Atuação", value: `${office.city} · ${office.state}` },
    { label: "Áreas", value: "Cível · Consumidor · Trabalhista" },
  ];

  return (
    <section
      className="bg-darkest text-light border-t"
      style={{ borderColor: "rgba(201, 169, 97, 0.2)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {items.map((item) => (
          <div key={item.label}>
            <div className="text-xs uppercase tracking-widest text-accent mb-1">
              {item.label}
            </div>
            <div className="font-serif text-lg">{item.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
