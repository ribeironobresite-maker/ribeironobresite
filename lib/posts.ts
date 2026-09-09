import { sql } from "./db";

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover: string | null;
  content: string;
  author: string;
  readingTime: string;
  date: string; // YYYY-MM-DD
  isPublished: boolean;
};

type DbRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  cover_url: string | null;
  content: string;
  author: string | null;
  reading_time: string | null;
  is_published: boolean;
  published_at: string | null;
};

function toPost(r: DbRow): Post {
  const date = r.published_at
    ? new Date(r.published_at).toISOString().slice(0, 10)
    : "";
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category ?? "Artigo",
    cover: r.cover_url,
    content: r.content,
    author: r.author ?? "",
    readingTime: r.reading_time ?? "",
    date,
    isPublished: r.is_published,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const rows = (await sql`
    SELECT id, slug, title, excerpt, category, cover_url, content,
           author, reading_time, is_published, published_at
    FROM posts
    WHERE is_published = TRUE
    ORDER BY published_at DESC NULLS LAST, id DESC
  `) as DbRow[];
  return rows.map(toPost);
}

export async function getAllPostsIncludingDrafts(): Promise<Post[]> {
  const rows = (await sql`
    SELECT id, slug, title, excerpt, category, cover_url, content,
           author, reading_time, is_published, published_at
    FROM posts
    ORDER BY published_at DESC NULLS LAST, id DESC
  `) as DbRow[];
  return rows.map(toPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const rows = (await sql`
    SELECT id, slug, title, excerpt, category, cover_url, content,
           author, reading_time, is_published, published_at
    FROM posts
    WHERE slug = ${slug}
    LIMIT 1
  `) as DbRow[];
  if (rows.length === 0) return null;
  return toPost(rows[0]);
}

export async function getAllSlugs(): Promise<string[]> {
  const rows = (await sql`
    SELECT slug FROM posts WHERE is_published = TRUE
  `) as { slug: string }[];
  return rows.map((r) => r.slug);
}

export type PostInput = {
  slug: string;
  title: string;
  excerpt: string;
  category?: string | null;
  coverUrl?: string | null;
  content: string;
  author?: string | null;
  readingTime?: string | null;
  isPublished?: boolean;
  publishedAt?: Date | string | null;
};

export async function createPost(input: PostInput): Promise<number> {
  const publishedAt = input.isPublished
    ? input.publishedAt ?? new Date()
    : input.publishedAt ?? null;

  const rows = (await sql`
    INSERT INTO posts
      (slug, title, excerpt, category, cover_url, content,
       author, reading_time, is_published, published_at)
    VALUES (
      ${input.slug},
      ${input.title},
      ${input.excerpt},
      ${input.category ?? null},
      ${input.coverUrl ?? null},
      ${input.content},
      ${input.author ?? null},
      ${input.readingTime ?? null},
      ${input.isPublished ?? false},
      ${publishedAt}
    )
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

export async function updatePost(id: number, input: PostInput): Promise<void> {
  const publishedAt = input.isPublished
    ? input.publishedAt ?? new Date()
    : null;

  await sql`
    UPDATE posts
    SET
      slug         = ${input.slug},
      title        = ${input.title},
      excerpt      = ${input.excerpt},
      category     = ${input.category ?? null},
      cover_url    = ${input.coverUrl ?? null},
      content      = ${input.content},
      author       = ${input.author ?? null},
      reading_time = ${input.readingTime ?? null},
      is_published = ${input.isPublished ?? false},
      published_at = ${publishedAt},
      updated_at   = NOW()
    WHERE id = ${id}
  `;
}

export async function deletePost(id: number): Promise<void> {
  await sql`DELETE FROM posts WHERE id = ${id}`;
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  return `${String(d).padStart(2, "0")} de ${months[m - 1]} de ${y}`;
}
