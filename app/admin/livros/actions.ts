"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  createBook,
  deleteBook,
  updateBook,
  type BookInput,
} from "@/lib/books";
import { updateSiteSettings } from "@/lib/settings";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/login");
}

function readInput(formData: FormData): BookInput {
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim() || null;
  const coverUrl = String(formData.get("coverUrl") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim() || null;
  const yearRaw = String(formData.get("year") ?? "").trim();
  const year = yearRaw ? parseInt(yearRaw, 10) : null;
  const publisher = String(formData.get("publisher") ?? "").trim() || null;
  const buyLink = String(formData.get("buyLink") ?? "").trim() || null;
  const displayOrder = Number(formData.get("displayOrder") ?? 999);
  const isActive = formData.get("isActive") === "on";

  return {
    title,
    subtitle,
    coverUrl,
    description,
    year: year && !isNaN(year) ? year : null,
    publisher,
    buyLink,
    displayOrder: isNaN(displayOrder) ? 999 : displayOrder,
    isActive,
  };
}

function validate(input: BookInput): string | null {
  if (!input.title) return "missing-title";
  return null;
}

export async function createNewBook(formData: FormData) {
  await requireSession();

  const input = readInput(formData);
  const err = validate(input);
  if (err) redirect(`/admin/livros/novo?error=${err}`);

  try {
    await createBook(input);
  } catch (e) {
    console.error("[livros] create failed:", e);
    redirect("/admin/livros/novo?error=db");
  }

  revalidatePath("/", "layout");
  redirect("/admin/livros?saved=created");
}

export async function updateExistingBook(formData: FormData) {
  await requireSession();

  const idRaw = String(formData.get("id") ?? "");
  const id = parseInt(idRaw, 10);
  if (isNaN(id)) redirect("/admin/livros");

  const input = readInput(formData);
  const err = validate(input);
  if (err) redirect(`/admin/livros/editar/${id}?error=${err}`);

  try {
    await updateBook(id, input);
  } catch (e) {
    console.error("[livros] update failed:", e);
    redirect(`/admin/livros/editar/${id}?error=db`);
  }

  revalidatePath("/", "layout");
  redirect("/admin/livros?saved=updated");
}

export async function saveBooksConfig(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/login");

  const booksPerPage = Math.min(6, Math.max(1, parseInt(String(formData.get("booksPerPage") ?? "3"), 10) || 3));
  const booksAutoplayMs = parseInt(String(formData.get("booksAutoplayMs") ?? "0"), 10) || 0;

  await updateSiteSettings({ booksPerPage, booksAutoplayMs });

  revalidatePath("/", "layout");
  redirect("/admin/livros?saved=config");
}

export async function deleteExistingBook(formData: FormData) {
  await requireSession();

  const idRaw = String(formData.get("id") ?? "");
  const id = parseInt(idRaw, 10);
  if (isNaN(id)) redirect("/admin/livros");

  try {
    await deleteBook(id);
  } catch (e) {
    console.error("[livros] delete failed:", e);
    redirect("/admin/livros?error=db");
  }

  revalidatePath("/", "layout");
  redirect("/admin/livros?saved=deleted");
}
