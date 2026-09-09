import Link from "next/link";
import ImageUpload from "./ImageUpload";
import type { Book } from "@/lib/books";

type Props = {
  action: (formData: FormData) => Promise<void>;
  book?: Book;
  cancelHref: string;
  submitLabel: string;
};

export default function BookForm({
  action,
  book,
  cancelHref,
  submitLabel,
}: Props) {
  return (
    <form
      action={action}
      className="space-y-6 rounded-2xl border bg-page p-6 md:p-8"
      style={{ borderColor: "var(--border-soft)" }}
    >
      {book && <input type="hidden" name="id" value={book.id} />}

      {/* Capa */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--bg-dark)" }}
        >
          Capa do livro{" "}
          <span
            className="font-normal text-dark"
            style={{ opacity: 0.6 }}
          >
            (opcional — proporção 2:3 funciona melhor)
          </span>
        </label>
        <ImageUpload
          name="coverUrl"
          context="blog"
          aspectRatio="wide"
          defaultValue={book?.coverUrl ?? ""}
          label="Selecionar capa"
        />
      </div>

      {/* Título + Subtítulo */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium mb-1.5"
          style={{ color: "var(--bg-dark)" }}
        >
          Título do livro
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={book?.title ?? ""}
          className="block w-full rounded-lg border px-3 py-2 text-sm"
          style={{
            borderColor: "var(--border-soft)",
            background: "white",
          }}
        />
      </div>

      <div>
        <label
          htmlFor="subtitle"
          className="block text-sm font-medium mb-1.5"
          style={{ color: "var(--bg-dark)" }}
        >
          Subtítulo{" "}
          <span
            className="font-normal text-dark"
            style={{ opacity: 0.6 }}
          >
            (opcional)
          </span>
        </label>
        <input
          id="subtitle"
          name="subtitle"
          type="text"
          defaultValue={book?.subtitle ?? ""}
          className="block w-full rounded-lg border px-3 py-2 text-sm"
          style={{
            borderColor: "var(--border-soft)",
            background: "white",
          }}
        />
      </div>

      {/* Editora + Ano */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label
            htmlFor="publisher"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--bg-dark)" }}
          >
            Editora
          </label>
          <input
            id="publisher"
            name="publisher"
            type="text"
            defaultValue={book?.publisher ?? ""}
            placeholder="Ex: Editora Saraiva"
            className="block w-full rounded-lg border px-3 py-2 text-sm"
            style={{
              borderColor: "var(--border-soft)",
              background: "white",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--bg-dark)" }}
          >
            Ano
          </label>
          <input
            id="year"
            name="year"
            type="number"
            min="1900"
            max="2100"
            defaultValue={book?.year ?? ""}
            placeholder="2025"
            className="block w-full rounded-lg border px-3 py-2 text-sm"
            style={{
              borderColor: "var(--border-soft)",
              background: "white",
            }}
          />
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium mb-1.5"
          style={{ color: "var(--bg-dark)" }}
        >
          Descrição{" "}
          <span
            className="font-normal text-dark"
            style={{ opacity: 0.6 }}
          >
            (resumo curto sobre o livro)
          </span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={book?.description ?? ""}
          className="block w-full rounded-lg border px-3 py-2 text-sm"
          style={{
            borderColor: "var(--border-soft)",
            background: "white",
          }}
        />
      </div>

      {/* Link de compra */}
      <div>
        <label
          htmlFor="buyLink"
          className="block text-sm font-medium mb-1.5"
          style={{ color: "var(--bg-dark)" }}
        >
          Link &quot;Saiba mais&quot;{" "}
          <span
            className="font-normal text-dark"
            style={{ opacity: 0.6 }}
          >
            (Amazon, editora, site, etc.)
          </span>
        </label>
        <input
          id="buyLink"
          name="buyLink"
          type="url"
          defaultValue={book?.buyLink ?? ""}
          placeholder="https://www.amazon.com.br/..."
          className="block w-full rounded-lg border px-3 py-2 text-sm"
          style={{
            borderColor: "var(--border-soft)",
            background: "white",
          }}
        />
      </div>

      {/* Ordem + Ativo */}
      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <div>
          <label
            htmlFor="displayOrder"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--bg-dark)" }}
          >
            Ordem
          </label>
          <input
            id="displayOrder"
            name="displayOrder"
            type="number"
            min="0"
            defaultValue={book?.displayOrder ?? 999}
            className="block w-full rounded-lg border px-3 py-2 text-sm"
            style={{
              borderColor: "var(--border-soft)",
              background: "white",
            }}
          />
        </div>

        <div className="sm:col-span-2 flex items-center pt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={book?.isActive ?? true}
              className="w-4 h-4 accent-amber-500"
            />
            <span className="text-sm" style={{ color: "var(--bg-dark)" }}>
              Mostrar no site (ativo)
            </span>
          </label>
        </div>
      </div>

      {/* Ações */}
      <div
        className="flex items-center justify-end gap-3 border-t pt-5"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <Link
          href={cancelHref}
          className="rounded border px-4 py-2 text-sm hover:bg-page-2"
          style={{ borderColor: "var(--border-soft)" }}
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="rounded btn-dark px-4 py-2 text-sm font-medium"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
