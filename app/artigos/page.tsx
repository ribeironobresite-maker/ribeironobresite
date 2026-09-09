import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Artigos, análises e atualizações de jurisprudência escritas pela equipe da Nogueira Porto Advogados.",
};

export default async function ArtigosListPage() {
  const posts = await getAllPosts();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
            Artigos &amp; Notícias
          </div>
          <h1
            className="font-serif text-3xl md:text-5xl mb-4 leading-tight"
            style={{ color: "var(--bg-dark)" }}
          >
            Conteúdo escrito pelo advogado
          </h1>
          <div className="gold-rule w-24 mx-auto mb-3" />
          <p className="text-sm max-w-xl mx-auto leading-relaxed text-dark">
            Análises, atualizações de jurisprudência e orientações práticas
            escritas pelo Dr. Antonio.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-dark py-12">
            Nenhum artigo publicado ainda.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/artigos/${post.slug}`}
                className="card-hover group block rounded-2xl overflow-hidden border bg-page"
                style={{ borderColor: "var(--border-soft)" }}
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  {post.cover ? (
                    <>
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </>
                  ) : (
                    <div
                      className="absolute inset-0 grid place-items-center"
                      style={{ background: "var(--bg-dark)" }}
                    >
                      <span className="font-serif text-6xl text-accent">
                        NP
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-7">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-accent mb-3">
                    {post.category}
                  </div>
                  <h2
                    className="font-serif text-2xl leading-tight mb-3 group-hover:underline decoration-1 underline-offset-4"
                    style={{
                      color: "var(--bg-dark)",
                      textDecorationColor: "var(--accent)",
                    }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-5 text-dark">
                    {post.excerpt}
                  </p>
                  <div
                    className="flex items-center justify-between text-xs text-dark"
                    style={{ opacity: 0.7 }}
                  >
                    <span>
                      {formatDate(post.date)} · {post.readingTime} de leitura
                    </span>
                    <span className="inline-flex items-center gap-1 text-accent font-medium opacity-100">
                      Continuar lendo
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
