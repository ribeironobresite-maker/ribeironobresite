/**
 * Sanity check do banco — lista tabelas e conteúdo.
 * Uso: npx tsx scripts/check-db.ts
 */
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local" });

async function main() {
  const url = process.env.DATABASE_URL!;
  const sql = neon(url);

  console.log("\n=== Tabelas ===");
  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
  `;
  for (const t of tables) console.log(" -", t.table_name);

  console.log("\n=== settings ===");
  const settings = await sql`SELECT key, value FROM settings ORDER BY key`;
  for (const s of settings) {
    const v =
      String(s.value).length > 80
        ? String(s.value).slice(0, 80) + "..."
        : s.value;
    console.log(`  ${s.key} = ${v}`);
  }

  console.log("\n=== books ===");
  const books =
    await sql`SELECT id, title, year, publisher, is_active FROM books ORDER BY display_order`;
  for (const b of books)
    console.log(
      `  [${b.id}] ${b.title} (${b.year ?? "?"}) — ${b.publisher ?? "?"}${b.is_active ? "" : " [OCULTO]"}`
    );

  console.log("\n=== posts ===");
  const posts =
    await sql`SELECT id, slug, title, is_published FROM posts ORDER BY published_at DESC NULLS LAST`;
  if (posts.length === 0) console.log("  (nenhum post ainda)");
  for (const p of posts)
    console.log(
      `  [${p.id}] ${p.slug} — "${p.title}" (${p.is_published ? "publicado" : "rascunho"})`
    );

  console.log("\n=== _migrations ===");
  const migs = await sql`SELECT filename, applied_at FROM _migrations`;
  for (const m of migs)
    console.log(`  ${m.filename} aplicada em ${m.applied_at}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
