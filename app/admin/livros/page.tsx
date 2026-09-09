import Image from "next/image";
import Link from "next/link";
import { getAllBooks } from "@/lib/books";
import { getSiteSettings } from "@/lib/settings";
import { deleteExistingBook, saveBooksConfig } from "./actions";

export const metadata = { title: "Livros" };

const NOTICES: Record<string, string> = {
  created: "Livro adicionado.",
  updated: "Livro atualizado.",
  deleted: "Livro removido.",
  config: "Configurações do carrossel salvas.",
};
const ERRORS: Record<string, string> = {
  db: "Erro ao acessar o banco de dados.",
};

export default async function BooksListPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const [books, settings] = await Promise.all([getAllBooks(), getSiteSettings()]);

  return (
    <div>
      {saved && NOTICES[saved] && (
        <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {NOTICES[saved]}
        </div>
      )}
      {error && ERRORS[error] && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {ERRORS[error]}
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2
            className="font-serif text-2xl font-semibold"
            style={{ color: "var(--bg-dark)" }}
          >
            Livros
          </h2>
          <p className="text-sm text-dark" style={{ opacity: 0.7 }}>
            Obras publicadas que aparecem no carrossel da home.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="text-sm text-dark hover:opacity-70"
            style={{ opacity: 0.7 }}
          >
            ← Voltar
          </Link>
          <Link
            href="/admin/livros/novo"
            className="rounded btn-dark px-4 py-2 text-sm font-medium"
          >
            Novo livro
          </Link>
        </div>
      </div>

      {/* Configuração do carrossel */}
      <form
        action={saveBooksConfig}
        className="mb-6 rounded-2xl border bg-page p-5 md:p-6"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <h3 className="font-serif text-base font-semibold mb-4" style={{ color: "var(--bg-dark)" }}>
          Configuração do carrossel
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-dark mb-1.5" htmlFor="booksPerPage">
              Livros exibidos simultaneamente
            </label>
            <select
              id="booksPerPage"
              name="booksPerPage"
              defaultValue={settings.booksPerPage}
              className="w-full rounded-lg border px-3 py-2.5 text-sm bg-page text-dark focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--border-soft)" }}
            >
              <option value="1">1 livro</option>
              <option value="2">2 livros</option>
              <option value="3">3 livros</option>
              <option value="4">4 livros</option>
              <option value="5">5 livros</option>
              <option value="6">6 livros</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-dark mb-1.5" htmlFor="booksAutoplayMs">
              Rotação automática
            </label>
            <select
              id="booksAutoplayMs"
              name="booksAutoplayMs"
              defaultValue={settings.booksAutoplayMs}
              className="w-full rounded-lg border px-3 py-2.5 text-sm bg-page text-dark focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--border-soft)" }}
            >
              <option value="0">Desativada</option>
              <option value="3000">A cada 3 segundos</option>
              <option value="5000">A cada 5 segundos</option>
              <option value="8000">A cada 8 segundos</option>
              <option value="10000">A cada 10 segundos</option>
              <option value="15000">A cada 15 segundos</option>
              <option value="20000">A cada 20 segundos</option>
            </select>
            <p className="mt-1 text-[11px] text-dark" style={{ opacity: 0.5 }}>
              Pausa ao passar o mouse sobre os cards.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn-primary px-6 py-2.5 rounded-full text-sm font-semibold">
            Salvar configurações
          </button>
        </div>
      </form>

      {books.length === 0 ? (
        <div
          className="rounded-2xl border bg-page p-8 text-center text-sm"
          style={{ borderColor: "var(--border-soft)" }}
        >
          Nenhum livro cadastrado ainda.
        </div>
      ) : (
        <ul
          className="rounded-2xl border bg-page overflow-hidden"
          style={{ borderColor: "var(--border-soft)" }}
        >
          {books.map((b) => (
            <li
              key={b.id}
              className="flex items-center justify-between gap-4 px-5 py-4 border-b last:border-b-0"
              style={{ borderColor: "var(--border-soft)" }}
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div
                  className="w-12 h-16 rounded overflow-hidden grid place-items-center shrink-0"
                  style={{ background: "var(--bg-dark)" }}
                >
                  {b.coverUrl ? (
                    <Image
                      src={b.coverUrl}
                      alt={b.title}
                      width={48}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-5 h-5 text-accent opacity-70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 4v16a1 1 0 001 1h14a1 1 0 001-1V4" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="font-medium"
                      style={{ color: "var(--bg-dark)" }}
                    >
                      {b.title}
                    </span>
                    {!b.isActive && (
                      <span className="text-[10px] uppercase tracking-wider rounded-full px-2 py-0.5 bg-stone-200 text-stone-700">
                        Oculto
                      </span>
                    )}
                  </div>
                  <p
                    className="text-xs text-dark mt-0.5"
                    style={{ opacity: 0.7 }}
                  >
                    {b.subtitle && <>{b.subtitle} · </>}
                    {b.publisher && <>{b.publisher} · </>}
                    {b.year && <>{b.year}</>}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="text-[11px] text-dark mr-2"
                  style={{ opacity: 0.5 }}
                >
                  #{b.displayOrder}
                </span>
                <Link
                  href={`/admin/livros/editar/${b.id}`}
                  className="text-xs text-accent hover:underline font-medium"
                >
                  Editar
                </Link>
                <form action={deleteExistingBook}>
                  <input type="hidden" name="id" value={b.id} />
                  <button
                    type="submit"
                    className="text-xs text-red-700 hover:underline font-medium"
                    aria-label={`Remover ${b.title}`}
                  >
                    Remover
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
