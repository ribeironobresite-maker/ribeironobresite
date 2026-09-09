import Link from "next/link";
import { getAllBooks } from "@/lib/books";
import { getAllPostsIncludingDrafts } from "@/lib/posts";
import { getAllAreas } from "@/lib/practice-areas";
import { getSiteSettings } from "@/lib/settings";

export default async function AdminDashboard() {
  const [books, posts, areas, settings] = await Promise.all([
    getAllBooks(),
    getAllPostsIncludingDrafts(),
    getAllAreas(),
    getSiteSettings(),
  ]);

  const activeBooks = books.filter((b) => b.isActive).length;
  const publishedPosts = posts.filter((p) => p.isPublished).length;
  const draftPosts = posts.length - publishedPosts;
  const activeAreas = areas.filter((a) => a.isActive).length;

  const PALETTE_LABELS: Record<string, string> = {
    navy: "Marinho clássico",
    emerald: "Verde institucional",
    black: "Preto & Dourado",
    wine: "Vinho & Dourado",
    graphite: "Grafite & Bronze",
    coffee: "Café & Creme",
  };

  const cards = [
    {
      href: "/admin/aparencia",
      title: "Aparência",
      description:
        "Paleta de cores, hero (logo ou imagem), efeitos, sua foto e bio.",
      meta: `${PALETTE_LABELS[settings.palette]} · Hero: ${
        settings.heroMode === "logo" ? "Logo" : "Imagem"
      }`,
    },
    {
      href: "/admin/areas",
      title: "Áreas de atuação",
      description:
        "Cards da seção “Como posso te ajudar” — adicionar, editar, reordenar.",
      meta:
        activeAreas > 0
          ? `${activeAreas} área${activeAreas === 1 ? "" : "s"} ativa${
              activeAreas === 1 ? "" : "s"
            }`
          : "Nenhuma área ativa",
    },
    {
      href: "/admin/livros",
      title: "Livros",
      description: "Adicionar, remover e reordenar suas publicações.",
      meta:
        activeBooks > 0
          ? `${activeBooks} livro${activeBooks === 1 ? "" : "s"} ativo${
              activeBooks === 1 ? "" : "s"
            }`
          : "Nenhum livro ativo",
    },
    {
      href: "/admin/artigos",
      title: "Artigos",
      description: "Publicar, editar e remover posts do blog.",
      meta:
        draftPosts > 0
          ? `${publishedPosts} publicado${
              publishedPosts === 1 ? "" : "s"
            } · ${draftPosts} rascunho${draftPosts === 1 ? "" : "s"}`
          : `${publishedPosts} publicado${publishedPosts === 1 ? "" : "s"}`,
    },
    {
      href: "/admin/contato",
      title: "Contato",
      description: "Endereço, WhatsApp, e-mail e mapa do escritório.",
      meta: settings.contactCity !== "Maricá" || settings.contactWhatsappDisplay !== "(21) 98775-1070"
        ? `${settings.contactCity} · ${settings.contactWhatsappDisplay}`
        : `${settings.contactCity} · ${settings.contactWhatsappDisplay}`,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2
          className="font-serif text-2xl font-semibold mb-1"
          style={{ color: "var(--bg-dark)" }}
        >
          Painel
        </h2>
        <p className="text-sm text-dark" style={{ opacity: 0.7 }}>
          Gerencie a aparência do site, seus livros e os artigos do blog.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="card-hover block rounded-2xl border bg-page p-6 hover:shadow-lg transition"
            style={{ borderColor: "var(--border-soft)" }}
          >
            <h3
              className="font-serif text-xl mb-2"
              style={{ color: "var(--bg-dark)" }}
            >
              {c.title}
            </h3>
            <p className="text-sm text-dark mb-4">{c.description}</p>
            <div className="text-[11px] uppercase tracking-widest text-accent font-medium">
              {c.meta}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
