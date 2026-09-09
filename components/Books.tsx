import { getActiveBooks } from "@/lib/books";
import { getSiteSettings } from "@/lib/settings";
import BooksCarousel from "./BooksCarousel";

export default async function Books() {
  const [books, settings] = await Promise.all([
    getActiveBooks(),
    getSiteSettings(),
  ]);

  if (books.length === 0) return null;

  return (
    <section id="livros" className="py-16 md:py-24 bg-page-2">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
            Publicações
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl mb-4"
            style={{ color: "var(--bg-dark)" }}
          >
            Livros do autor
          </h2>
          <div className="gold-rule w-24 mx-auto mb-3" />
          <p
            className="text-sm max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-dark)" }}
          >
            Obras publicadas pelo Dr. Antonio — direito, literatura e outros
            temas. Clique em qualquer livro para conhecer mais.
          </p>
        </div>

        <BooksCarousel
          books={books}
          perPage={settings.booksPerPage}
          autoplayMs={settings.booksAutoplayMs}
        />
      </div>
    </section>
  );
}
