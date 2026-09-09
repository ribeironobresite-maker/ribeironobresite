import { getSiteSettings } from "@/lib/settings";
import CalendlySection from "./CalendlySection";

export default async function AgendamentoSection() {
  const settings = await getSiteSettings();
  if (!settings.calendlyUrl) return null;
  return <CalendlySection url={settings.calendlyUrl} />;
}
