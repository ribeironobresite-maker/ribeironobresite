"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  updateSiteSettings,
  type Palette,
  type HeroMode,
  type HeroEntrance,
  type HeroIdle,
} from "@/lib/settings";

const PALETTES: Palette[] = [
  "navy",
  "emerald",
  "black",
  "wine",
  "graphite",
  "coffee",
];
const HERO_MODES: HeroMode[] = ["logo", "image"];
const ENTRANCES: HeroEntrance[] = [
  "none",
  "fade",
  "slide",
  "zoom",
  "rotate",
  "spin",
];
const IDLES: HeroIdle[] = ["none", "float", "pulse", "slowrotate"];

export async function saveAppearance(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/login");

  const palette = String(formData.get("palette") ?? "") as Palette;
  const heroMode = String(formData.get("heroMode") ?? "") as HeroMode;
  const heroImageUrl = String(formData.get("heroImageUrl") ?? "").trim();
  const heroLogoEntrance = String(
    formData.get("heroLogoEntrance") ?? ""
  ) as HeroEntrance;
  const heroLogoIdle = String(formData.get("heroLogoIdle") ?? "") as HeroIdle;
  const lawyerPhotoUrl = String(formData.get("lawyerPhotoUrl") ?? "").trim();
  const lawyerBio = String(formData.get("lawyerBio") ?? "").trim();
  const lawyerYears = String(formData.get("lawyerYears") ?? "").trim();
  const heroEyebrow = String(formData.get("heroEyebrow") ?? "").trim();
  const heroHeading = String(formData.get("heroHeading") ?? "").trim();
  const heroDescription = String(formData.get("heroDescription") ?? "").trim();

  if (!PALETTES.includes(palette)) {
    redirect("/admin/aparencia?error=palette");
  }
  if (!HERO_MODES.includes(heroMode)) {
    redirect("/admin/aparencia?error=heroMode");
  }
  if (!ENTRANCES.includes(heroLogoEntrance)) {
    redirect("/admin/aparencia?error=entrance");
  }
  if (!IDLES.includes(heroLogoIdle)) {
    redirect("/admin/aparencia?error=idle");
  }

  await updateSiteSettings({
    palette,
    heroMode,
    heroImageUrl,
    heroLogoEntrance,
    heroLogoIdle,
    lawyerPhotoUrl,
    lawyerBio,
    lawyerYears,
    heroEyebrow,
    heroHeading,
    heroDescription,
  });

  revalidatePath("/", "layout");
  redirect("/admin/aparencia?saved=1");
}
