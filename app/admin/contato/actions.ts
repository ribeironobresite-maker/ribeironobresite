"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { updateSiteSettings } from "@/lib/settings";

export async function saveContato(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/login");

  const contactCity = String(formData.get("contactCity") ?? "").trim();
  const contactState = String(formData.get("contactState") ?? "").trim();
  const contactAddress = String(formData.get("contactAddress") ?? "").trim();
  const contactNeighborhood = String(formData.get("contactNeighborhood") ?? "").trim();
  const contactWhatsappNumber = String(formData.get("contactWhatsappNumber") ?? "").trim().replace(/\D/g, "");
  const contactWhatsappDisplay = String(formData.get("contactWhatsappDisplay") ?? "").trim();
  const contactEmail = String(formData.get("contactEmail") ?? "").trim().toLowerCase();
  const contactMapsEnabled = formData.get("contactMapsEnabled") === "on";
  const contactMapsUrl = String(formData.get("contactMapsUrl") ?? "").trim();
  const calendlyUrl = String(formData.get("calendlyUrl") ?? "").trim();

  await updateSiteSettings({
    contactCity,
    contactState,
    contactAddress,
    contactNeighborhood,
    contactWhatsappNumber,
    contactWhatsappDisplay,
    contactEmail,
    contactMapsEnabled,
    contactMapsUrl,
    calendlyUrl,
  });

  revalidatePath("/", "layout");
  redirect("/admin/contato?saved=1");
}
