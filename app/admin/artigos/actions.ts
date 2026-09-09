"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  createPost,
  deletePost,
  updatePost,
  getPostBySlug,
  type PostInput,
} from "@/lib/posts";
import { estimateReadingTime, slugify } from "@/lib/admin-helpers";
import { updateSiteSettings } from "@/lib/settings";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/login");
}

type ParsedInput = PostInput & { idFromForm?: number };

function readInput(formData: FormData): ParsedInput {
  const idRaw = String(formData.get("id") ?? "");
  const idFromForm = idRaw ? parseInt(idRaw, 10) : undefined;

  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim() || null;
  const coverUrl = String(formData.get("coverUrl") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim() || null;
  const isPublished = formData.get("isPublished") === "on";

  const slug = slugify(slugRaw || title);
  const readingTime = estimateReadingTime(content);

  return {
    idFromForm,
    slug,
    title,
    excerpt,
    category,
    coverUrl,
    content,
    author,
    readingTime,
    isPublished,
  };
}

function validate(input: ParsedInput): string | null {
  if (!input.title) return "missing-title";
  if (!input.excerpt) return "missing-excerpt";
  if (!input.content) return "missing-content";
  if (!input.slug) return "missing-slug";
  return null;
}

export async function createNewPost(formData: FormData) {
  await requireSession();

  const input = readInput(formData);
  const err = validate(input);
  if (err) redirect(`/admin/artigos/novo?error=${err}`);

  // Verifica conflito de slug
  const existing = await getPostBySlug(input.slug);
  if (existing) {
    redirect("/admin/artigos/novo?error=slug-exists");
  }

  try {
    await createPost(input);
  } catch (e) {
    console.error("[artigos] create failed:", e);
    redirect("/admin/artigos/novo?error=db");
  }

  revalidatePath("/", "layout");
  revalidatePath(`/artigos/${input.slug}`);
  redirect(
    `/admin/artigos?saved=${input.isPublished ? "published" : "draft-saved"}`
  );
}

export async function updateExistingPost(formData: FormData) {
  await requireSession();

  const input = readInput(formData);
  const id = input.idFromForm;
  if (!id || isNaN(id)) redirect("/admin/artigos");

  const err = validate(input);
  if (err) redirect(`/admin/artigos/editar/${input.slug}?error=${err}`);

  try {
    await updatePost(id!, input);
  } catch (e) {
    console.error("[artigos] update failed:", e);
    redirect(`/admin/artigos/editar/${input.slug}?error=db`);
  }

  revalidatePath("/", "layout");
  revalidatePath(`/artigos/${input.slug}`);
  redirect(
    `/admin/artigos?saved=${input.isPublished ? "published" : "draft-saved"}`
  );
}

export async function saveArtigosCount(formData: FormData) {
  await requireSession();
  const count = parseInt(String(formData.get("artigosCount") ?? "4"), 10);
  if (!isNaN(count) && count >= 1) {
    await updateSiteSettings({ artigosCount: count });
  }
  revalidatePath("/", "layout");
  redirect("/admin/artigos?saved=published");
}

export async function deleteExistingPost(formData: FormData) {
  await requireSession();

  const idRaw = String(formData.get("id") ?? "");
  const id = parseInt(idRaw, 10);
  if (isNaN(id)) redirect("/admin/artigos");

  try {
    await deletePost(id);
  } catch (e) {
    console.error("[artigos] delete failed:", e);
    redirect("/admin/artigos?error=db");
  }

  revalidatePath("/", "layout");
  redirect("/admin/artigos?saved=deleted");
}
