"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type ArticleCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover: string | null;
  dateFormatted: string;
  readingTime: string;
};

export default function ArtigosCarousel({ posts }: { posts: ArticleCard[] }) {
  const [page, setPage] = useState(0);
  const perPage = 2;
  const totalPages = Math.ceil(posts.length / perPage);
  const visible = posts.slice(page * perPage, page * perPage + perPage);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/artigos/${post.slug}`}
            className="card-hover group block rounded-2xl overflow-hidden border bg-page"
            style={{ borderColor: "var(--border-soft)" }}
          >
            <div className="aspect-[16/9] relative overflow-hidden">
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
                  <span className="font-serif text-5xl text-accent">AC</span>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="text-[11px] uppercase tracking-[0.25em] text-accent mb-2">
                {post.category}
              </div>
              <h3
                className="font-serif text-xl leading-tight mb-2 group-hover:underline decoration-1 underline-offset-4"
                style={{
                  color: "var(--bg-dark)",
                  textDecorationColor: "var(--accent)",
                }}
              >
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4 text-dark line-clamp-2">
                {post.excerpt}
              </p>
              <div
                className="flex items-center justify-between text-xs text-dark"
                style={{ opacity: 0.7 }}
              >
                <span>
                  {post.dateFormatted}
                  {post.readingTime ? ` · ${post.readingTime} de leitura` : ""}
                </span>
                <span className="inline-flex items-center gap-1 text-accent font-medium opacity-100">
                  Ler mais
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition hover:opacity-70 disabled:opacity-30"
            style={{ borderColor: "var(--border-soft)", color: "var(--bg-dark)" }}
            aria-label="Artigos anteriores"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: i === page ? "var(--accent)" : "var(--border-soft)",
                  transform: i === page ? "scale(1.3)" : "scale(1)",
                }}
                aria-label={`Página ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages - 1}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition hover:opacity-70 disabled:opacity-30"
            style={{ borderColor: "var(--border-soft)", color: "var(--bg-dark)" }}
            aria-label="Próximos artigos"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
