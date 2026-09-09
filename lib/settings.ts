import { sql } from "./db";
import { site, type Office } from "./site";

export type Palette =
  | "navy"
  | "emerald"
  | "black"
  | "wine"
  | "graphite"
  | "coffee";
export type HeroMode = "logo" | "image";
export type HeroEntrance =
  | "none"
  | "fade"
  | "slide"
  | "zoom"
  | "rotate"
  | "spin";
export type HeroIdle = "none" | "float" | "pulse" | "slowrotate";

export type SiteSettings = {
  palette: Palette;
  heroMode: HeroMode;
  heroImageUrl: string;
  heroLogoEntrance: HeroEntrance;
  heroLogoIdle: HeroIdle;
  lawyerPhotoUrl: string;
  lawyerBio: string;
  lawyerYears: string;
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  contactCity: string;
  contactState: string;
  contactAddress: string;
  contactNeighborhood: string;
  contactWhatsappNumber: string;
  contactWhatsappDisplay: string;
  contactEmail: string;
  contactMapsEnabled: boolean;
  contactMapsUrl: string;
  artigosCount: number;
  calendlyUrl: string;
  booksPerPage: number;
  booksAutoplayMs: number;
};

const DEFAULTS: SiteSettings = {
  palette: "navy",
  heroMode: "logo",
  heroImageUrl: "",
  heroLogoEntrance: "slide",
  heroLogoIdle: "none",
  lawyerPhotoUrl: "",
  lawyerBio:
    "Inscrito na OAB/RJ desde 2002, com mais de 20 anos de atuação em Direito Cível, do Consumidor e Trabalhista. Pós-graduado em Direito Cível, Processual Civil e Direito do Trabalho. Autor de obras jurídicas. Atendimento técnico e direto com o advogado.",
  lawyerYears: "20",
  heroEyebrow: "Advocacia · Maricá",
  heroHeading: "Cível, Consumidor\ne Trabalhista, com\n*técnica e proximidade*.",
  heroDescription:
    "Advocacia solo com mais de 20 anos de atuação em direito cível, do consumidor e trabalhista. Atendimento técnico, direto com o advogado, da consulta inicial até a sentença final.",
  contactCity: site.offices[0]?.city ?? "Maricá",
  contactState: site.offices[0]?.state ?? "RJ",
  contactAddress: site.offices[0]?.address ?? "",
  contactNeighborhood: site.offices[0]?.neighborhood ?? "",
  contactWhatsappNumber: site.offices[0]?.whatsapp.number ?? "",
  contactWhatsappDisplay: site.offices[0]?.whatsapp.display ?? "",
  contactEmail: site.email,
  contactMapsEnabled: false,
  contactMapsUrl: "",
  artigosCount: 4,
  calendlyUrl: "",
  booksPerPage: 3,
  booksAutoplayMs: 0,
};

const KEY_MAP = {
  palette: "palette",
  heroMode: "hero_mode",
  heroImageUrl: "hero_image_url",
  heroLogoEntrance: "hero_logo_entrance",
  heroLogoIdle: "hero_logo_idle",
  lawyerPhotoUrl: "lawyer_photo_url",
  lawyerBio: "lawyer_bio",
  lawyerYears: "lawyer_years",
  heroEyebrow: "hero_eyebrow",
  heroHeading: "hero_heading",
  heroDescription: "hero_description",
  contactCity: "contact_city",
  contactState: "contact_state",
  contactAddress: "contact_address",
  contactNeighborhood: "contact_neighborhood",
  contactWhatsappNumber: "contact_whatsapp_number",
  contactWhatsappDisplay: "contact_whatsapp_display",
  contactEmail: "contact_email",
  contactMapsEnabled: "contact_maps_enabled",
  contactMapsUrl: "contact_maps_url",
  artigosCount: "artigos_count",
  calendlyUrl: "calendly_url",
  booksPerPage: "books_per_page",
  booksAutoplayMs: "books_autoplay_ms",
} as const;

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = (await sql`SELECT key, value FROM settings`) as {
      key: string;
      value: string;
    }[];
    const map = new Map<string, string>();
    for (const r of rows) map.set(r.key, r.value);

    return {
      palette: (map.get(KEY_MAP.palette) as Palette) || DEFAULTS.palette,
      heroMode: (map.get(KEY_MAP.heroMode) as HeroMode) || DEFAULTS.heroMode,
      heroImageUrl: map.get(KEY_MAP.heroImageUrl) || DEFAULTS.heroImageUrl,
      heroLogoEntrance:
        (map.get(KEY_MAP.heroLogoEntrance) as HeroEntrance) ||
        DEFAULTS.heroLogoEntrance,
      heroLogoIdle:
        (map.get(KEY_MAP.heroLogoIdle) as HeroIdle) || DEFAULTS.heroLogoIdle,
      lawyerPhotoUrl: map.get(KEY_MAP.lawyerPhotoUrl) || DEFAULTS.lawyerPhotoUrl,
      lawyerBio: map.get(KEY_MAP.lawyerBio) || DEFAULTS.lawyerBio,
      lawyerYears: map.get(KEY_MAP.lawyerYears) || DEFAULTS.lawyerYears,
      heroEyebrow: map.get(KEY_MAP.heroEyebrow) || DEFAULTS.heroEyebrow,
      heroHeading: map.get(KEY_MAP.heroHeading) || DEFAULTS.heroHeading,
      heroDescription:
        map.get(KEY_MAP.heroDescription) || DEFAULTS.heroDescription,
      contactCity: map.get(KEY_MAP.contactCity) || DEFAULTS.contactCity,
      contactState: map.get(KEY_MAP.contactState) || DEFAULTS.contactState,
      contactAddress: map.get(KEY_MAP.contactAddress) ?? DEFAULTS.contactAddress,
      contactNeighborhood: map.get(KEY_MAP.contactNeighborhood) ?? DEFAULTS.contactNeighborhood,
      contactWhatsappNumber: map.get(KEY_MAP.contactWhatsappNumber) ?? DEFAULTS.contactWhatsappNumber,
      contactWhatsappDisplay: map.get(KEY_MAP.contactWhatsappDisplay) ?? DEFAULTS.contactWhatsappDisplay,
      contactEmail: map.get(KEY_MAP.contactEmail) || DEFAULTS.contactEmail,
      contactMapsEnabled: map.get(KEY_MAP.contactMapsEnabled) === "true",
      contactMapsUrl: map.get(KEY_MAP.contactMapsUrl) ?? DEFAULTS.contactMapsUrl,
      artigosCount: parseInt(map.get(KEY_MAP.artigosCount) || "4", 10) || 4,
      calendlyUrl: map.get(KEY_MAP.calendlyUrl) ?? DEFAULTS.calendlyUrl,
      booksPerPage: parseInt(map.get(KEY_MAP.booksPerPage) || "3", 10) || 3,
      booksAutoplayMs: parseInt(map.get(KEY_MAP.booksAutoplayMs) || "0", 10) || 0,
    };
  } catch (err) {
    console.error("[settings] erro ao ler do DB, caindo pros defaults:", err);
    return DEFAULTS;
  }
}

export async function updateSiteSettings(
  patch: Partial<SiteSettings>
): Promise<void> {
  const updates: { key: string; value: string }[] = [];

  if (patch.palette !== undefined)
    updates.push({ key: KEY_MAP.palette, value: patch.palette });
  if (patch.heroMode !== undefined)
    updates.push({ key: KEY_MAP.heroMode, value: patch.heroMode });
  if (patch.heroImageUrl !== undefined)
    updates.push({ key: KEY_MAP.heroImageUrl, value: patch.heroImageUrl });
  if (patch.heroLogoEntrance !== undefined)
    updates.push({
      key: KEY_MAP.heroLogoEntrance,
      value: patch.heroLogoEntrance,
    });
  if (patch.heroLogoIdle !== undefined)
    updates.push({ key: KEY_MAP.heroLogoIdle, value: patch.heroLogoIdle });
  if (patch.lawyerPhotoUrl !== undefined)
    updates.push({ key: KEY_MAP.lawyerPhotoUrl, value: patch.lawyerPhotoUrl });
  if (patch.lawyerBio !== undefined)
    updates.push({ key: KEY_MAP.lawyerBio, value: patch.lawyerBio });
  if (patch.lawyerYears !== undefined)
    updates.push({ key: KEY_MAP.lawyerYears, value: patch.lawyerYears });
  if (patch.heroEyebrow !== undefined)
    updates.push({ key: KEY_MAP.heroEyebrow, value: patch.heroEyebrow });
  if (patch.heroHeading !== undefined)
    updates.push({ key: KEY_MAP.heroHeading, value: patch.heroHeading });
  if (patch.heroDescription !== undefined)
    updates.push({ key: KEY_MAP.heroDescription, value: patch.heroDescription });
  if (patch.contactCity !== undefined)
    updates.push({ key: KEY_MAP.contactCity, value: patch.contactCity });
  if (patch.contactState !== undefined)
    updates.push({ key: KEY_MAP.contactState, value: patch.contactState });
  if (patch.contactAddress !== undefined)
    updates.push({ key: KEY_MAP.contactAddress, value: patch.contactAddress });
  if (patch.contactNeighborhood !== undefined)
    updates.push({ key: KEY_MAP.contactNeighborhood, value: patch.contactNeighborhood });
  if (patch.contactWhatsappNumber !== undefined)
    updates.push({ key: KEY_MAP.contactWhatsappNumber, value: patch.contactWhatsappNumber });
  if (patch.contactWhatsappDisplay !== undefined)
    updates.push({ key: KEY_MAP.contactWhatsappDisplay, value: patch.contactWhatsappDisplay });
  if (patch.contactEmail !== undefined)
    updates.push({ key: KEY_MAP.contactEmail, value: patch.contactEmail });
  if (patch.contactMapsEnabled !== undefined)
    updates.push({ key: KEY_MAP.contactMapsEnabled, value: patch.contactMapsEnabled ? "true" : "false" });
  if (patch.contactMapsUrl !== undefined)
    updates.push({ key: KEY_MAP.contactMapsUrl, value: patch.contactMapsUrl });
  if (patch.artigosCount !== undefined)
    updates.push({ key: KEY_MAP.artigosCount, value: String(patch.artigosCount) });
  if (patch.calendlyUrl !== undefined)
    updates.push({ key: KEY_MAP.calendlyUrl, value: patch.calendlyUrl });
  if (patch.booksPerPage !== undefined)
    updates.push({ key: KEY_MAP.booksPerPage, value: String(patch.booksPerPage) });
  if (patch.booksAutoplayMs !== undefined)
    updates.push({ key: KEY_MAP.booksAutoplayMs, value: String(patch.booksAutoplayMs) });

  for (const { key, value } of updates) {
    await sql`
      INSERT INTO settings (key, value, updated_at)
      VALUES (${key}, ${value}, NOW())
      ON CONFLICT (key) DO UPDATE
        SET value = EXCLUDED.value, updated_at = NOW()
    `;
  }
}

export function buildOfficeFromSettings(s: SiteSettings): Office {
  const number = s.contactWhatsappNumber || site.offices[0]?.whatsapp.number || "";
  const display = s.contactWhatsappDisplay || site.offices[0]?.whatsapp.display || "";
  const href = number
    ? `https://wa.me/${number}?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica.`
    : (site.offices[0]?.whatsapp.href ?? "");
  return {
    id: "principal",
    city: s.contactCity,
    state: s.contactState,
    address: s.contactAddress,
    neighborhood: s.contactNeighborhood,
    whatsapp: { number, display, href },
  };
}
