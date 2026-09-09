import { sql } from "./db";

export type Book = {
  id: number;
  title: string;
  subtitle: string | null;
  coverUrl: string | null;
  description: string | null;
  year: number | null;
  publisher: string | null;
  buyLink: string | null;
  displayOrder: number;
  isActive: boolean;
};

type DbRow = {
  id: number;
  title: string;
  subtitle: string | null;
  cover_url: string | null;
  description: string | null;
  year: number | null;
  publisher: string | null;
  buy_link: string | null;
  display_order: number;
  is_active: boolean;
};

function toBook(r: DbRow): Book {
  return {
    id: r.id,
    title: r.title,
    subtitle: r.subtitle,
    coverUrl: r.cover_url,
    description: r.description,
    year: r.year,
    publisher: r.publisher,
    buyLink: r.buy_link,
    displayOrder: r.display_order,
    isActive: r.is_active,
  };
}

export async function getActiveBooks(): Promise<Book[]> {
  const rows = (await sql`
    SELECT id, title, subtitle, cover_url, description, year, publisher,
           buy_link, display_order, is_active
    FROM books
    WHERE is_active = TRUE
    ORDER BY display_order ASC, id ASC
  `) as DbRow[];
  return rows.map(toBook);
}

export async function getAllBooks(): Promise<Book[]> {
  const rows = (await sql`
    SELECT id, title, subtitle, cover_url, description, year, publisher,
           buy_link, display_order, is_active
    FROM books
    ORDER BY display_order ASC, id ASC
  `) as DbRow[];
  return rows.map(toBook);
}

export async function getBookById(id: number): Promise<Book | null> {
  const rows = (await sql`
    SELECT id, title, subtitle, cover_url, description, year, publisher,
           buy_link, display_order, is_active
    FROM books
    WHERE id = ${id}
    LIMIT 1
  `) as DbRow[];
  if (rows.length === 0) return null;
  return toBook(rows[0]);
}

export type BookInput = {
  title: string;
  subtitle?: string | null;
  coverUrl?: string | null;
  description?: string | null;
  year?: number | null;
  publisher?: string | null;
  buyLink?: string | null;
  displayOrder?: number;
  isActive?: boolean;
};

export async function createBook(input: BookInput): Promise<number> {
  const rows = (await sql`
    INSERT INTO books
      (title, subtitle, cover_url, description, year, publisher,
       buy_link, display_order, is_active)
    VALUES (
      ${input.title},
      ${input.subtitle ?? null},
      ${input.coverUrl ?? null},
      ${input.description ?? null},
      ${input.year ?? null},
      ${input.publisher ?? null},
      ${input.buyLink ?? null},
      ${input.displayOrder ?? 999},
      ${input.isActive ?? true}
    )
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

export async function updateBook(id: number, input: BookInput): Promise<void> {
  await sql`
    UPDATE books
    SET
      title         = ${input.title},
      subtitle      = ${input.subtitle ?? null},
      cover_url     = ${input.coverUrl ?? null},
      description   = ${input.description ?? null},
      year          = ${input.year ?? null},
      publisher     = ${input.publisher ?? null},
      buy_link      = ${input.buyLink ?? null},
      display_order = ${input.displayOrder ?? 999},
      is_active     = ${input.isActive ?? true},
      updated_at    = NOW()
    WHERE id = ${id}
  `;
}

export async function deleteBook(id: number): Promise<void> {
  await sql`DELETE FROM books WHERE id = ${id}`;
}
