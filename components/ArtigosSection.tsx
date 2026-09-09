import { getAllPosts, formatDate } from "@/lib/posts";
import { getSiteSettings } from "@/lib/settings";
import ArtigosCarousel from "./ArtigosCarousel";

export default async function ArtigosSection() {
  const settings = await getSiteSettings();
  const allPosts = await getAllPosts();
  const posts = allPosts.slice(0, settings.artigosCount);

  if (posts.length === 0) return null;

  const cards = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    cover: p.cover,
    dateFormatted: formatDate(p.date),
    readingTime: p.readingTime,
  }));

  return (
    <section id="artigos" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
            Artigos &amp; Notícias
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl mb-4"
            style={{ color: "var(--bg-dark)" }}
          >
            Conteúdo escrito pelo advogado
          </h2>
          <div className="gold-rule w-24 mx-auto mb-3" />
          <p className="text-sm max-w-xl mx-auto leading-relaxed text-dark">
            Análises, atualizações de jurisprudência e orientações práticas
            escritas pelo Dr. Antonio.
          </p>
        </div>

        <ArtigosCarousel posts={cards} />
      </div>
    </section>
  );
}
