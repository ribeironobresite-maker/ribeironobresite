import Link from "next/link";
import { notFound } from "next/navigation";
import BookForm from "@/components/admin/BookForm";
import { getBookById } from "@/lib/books";
import { updateExistingBook } from "../../actions";

export const metadata = { title: "Editar livro" };

const ERRORS: Record<string, string> = {
  "missing-title": "Preencha o título.",
  db: "Erro ao salvar no banco. Tente novamente.",
};

export default async function EditBookPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id: idRaw } = await params;
  const id = parseInt(idRaw, 10);
  if (isNaN(id)) notFound();

  const book = await getBookById(id);
  if (!book) notFound();

  const { error } = await searchParams;
  const errMsg = error ? ERRORS[error] : null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2
          className="font-serif text-2xl font-semibold"
          style={{ color: "var(--bg-dark)" }}
        >
          Editar livro
        </h2>
        <Link
          href="/admin/livros"
          className="text-sm text-dark hover:opacity-70"
          style={{ opacity: 0.7 }}
        >
          ← Voltar
        </Link>
      </div>

      {errMsg && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errMsg}
        </div>
      )}

      <BookForm
        action={updateExistingBook}
        book={book}
        cancelHref="/admin/livros"
        submitLabel="Salvar alterações"
      />
    </div>
  );
}
