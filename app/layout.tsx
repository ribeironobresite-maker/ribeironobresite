import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { getSiteSettings } from "@/lib/settings";
import { site } from "@/lib/site";
import "./globals.css";

// Páginas públicas usam ISR (revalida em até 60s após mudança no admin).
// As actions do admin invocam revalidatePath() ao salvar, então a alteração
// propaga imediatamente. Os 60s são fallback caso a invalidação manual falhe.
// Antes era `force-dynamic`, mas isso gerava 1 function invocation por
// pageview — estourava o free tier em poucas horas com bots crawlers.
export const revalidate = 60;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ogTitle = `${site.name} — Advogado`;
const ogDescription =
  "Advocacia com atendimento direto ao cliente. Entre em contato para uma orientação jurídica.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Ribeiro Nobre — Advocacia`,
    template: `%s | Ribeiro Nobre`,
  },
  description: ogDescription,
  keywords: [
    "Ferdinando Ribeiro Nobre",
    "advogado Rio de Janeiro",
    "advocacia cível",
    "advogado trabalhista",
    "advogado família",
    "advogado consumidor",
    "orientação jurídica RJ",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: "Ribeiro Nobre",
    title: ogTitle,
    description: ogDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} · Advocacia`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="pt-BR"
      data-palette={settings.palette}
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
