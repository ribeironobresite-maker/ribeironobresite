"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { Book } from "@/lib/books";

export default function BooksCarousel({
  books,
  perPage = 3,
  autoplayMs = 0,
}: {
  books: Book[];
  perPage?: number;
  autoplayMs?: number;
}) {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const totalPages = Math.max(1, Math.ceil(books.length / perPage));
  const start = page * perPage;
  const visible = books.slice(start, start + perPage);

  const goPrev = () => setPage((p) => (p > 0 ? p - 1 : totalPages - 1));
  const goNext = () => setPage((p) => (p < totalPages - 1 ? p + 1 : 0));

  // Autoplay — reinicia o timer ao trocar de página manualmente
  useEffect(() => {
    if (!autoplayMs || autoplayMs <= 0 || totalPages <= 1 || paused) return;
    const timer = setInterval(goNext, autoplayMs);
    return () => clearInterval(timer);
  }, [autoplayMs, totalPages, paused, page]);

  const gridClass =
    perPage <= 1
      ? "grid grid-cols-1 max-w-sm mx-auto"
      : perPage === 2
        ? "grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
        : "grid sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Cards */}
      <div className={`${gridClass} gap-6 mb-8`}>
        {visible.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
        {visible.length < perPage &&
          Array.from({ length: perPage - visible.length }).map((_, i) => (
            <div key={`spacer-${i}`} className="hidden lg:block" />
          ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Página anterior"
            className="w-10 h-10 grid place-items-center rounded-full border hover:bg-page-2 transition"
            style={{ borderColor: "var(--border-soft)" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{ color: "var(--bg-dark)" }}
            >
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Página ${i + 1}`}
                aria-current={i === page ? "page" : undefined}
                className="w-8 h-8 rounded-full text-xs font-medium transition"
                style={
                  i === page
                    ? { background: "var(--bg-dark)", color: "var(--text-light)" }
                    : { color: "var(--text-dark)", opacity: 0.5 }
                }
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Próxima página"
            className="w-10 h-10 grid place-items-center rounded-full border hover:bg-page-2 transition"
            style={{ borderColor: "var(--border-soft)" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{ color: "var(--bg-dark)" }}
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Indicador de autoplay */}
      {autoplayMs > 0 && totalPages > 1 && (
        <p className="text-center text-[11px] mt-3" style={{ color: "var(--text-dark)", opacity: 0.4 }}>
          {paused ? "Pausado" : `Rotação automática a cada ${autoplayMs / 1000}s`}
        </p>
      )}
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  const card = (
    <article
      className="card-hover rounded-2xl overflow-hidden border bg-page h-full flex flex-col"
      style={{ borderColor: "var(--border-soft)" }}
    >
      <div
        className="aspect-[2/3] grid place-items-center relative"
        style={{ background: "var(--bg-dark)" }}
      >
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain"
          />
        ) : (
          <div className="text-center p-6">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-accent opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
            >
              <path d="M4 4v16a1 1 0 001 1h14a1 1 0 001-1V4M4 4h16M8 8h8M8 12h6" />
            </svg>
            <div className="font-serif text-sm text-light-soft uppercase tracking-widest">
              Capa
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {(book.publisher || book.year) && (
          <div className="text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
            {book.publisher && book.year
              ? `${book.publisher} · ${book.year}`
              : book.publisher || book.year}
          </div>
        )}
        <h3
          className="font-serif text-lg leading-tight mb-2"
          style={{ color: "var(--bg-dark)" }}
        >
          {book.title}
        </h3>
        {book.subtitle && (
          <p className="text-xs italic mb-3" style={{ color: "var(--text-dark)", opacity: 0.7 }}>
            {book.subtitle}
          </p>
        )}
        {book.description && (
          <p className="text-xs leading-relaxed mb-4 line-clamp-4 flex-1" style={{ color: "var(--text-dark)" }}>
            {book.description}
          </p>
        )}
        {book.buyLink && (
          <div className="mt-auto">
            <span className="inline-flex items-center gap-1 text-accent font-medium text-xs">
              Saiba mais / comprar
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M14 3h7v7M21 3L10 14M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </article>
  );

  if (book.buyLink) {
    return (
      <a
        href={book.buyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        aria-label={`Ir para a página de compra de ${book.title}`}
      >
        {card}
      </a>
    );
  }
  return card;
}
