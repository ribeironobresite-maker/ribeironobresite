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

const ogTitle = `${site.name} — Advocacia Cível, Consumidor, Trabalhista e Família`;
const ogDescription =
  "Advocacia solo em Maricá-RJ com mais de 25 anos de atuação em Direito Cível, do Consumidor, Trabalhista e Família. Atendimento direto com o advogado, da consulta inicial à sentença final.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Advogado em Maricá`,
    template: `%s | ${site.name}`,
  },
  description: ogDescription,
  keywords: [
    "advogado Maricá",
    "advogado Maricá RJ",
    "advogado cível Maricá",
    "advogado trabalhista Maricá",
    "advogado família Maricá",
    "advogado consumidor Maricá",
    "direito do trabalho Maricá",
    "direito de família Maricá",
    "divórcio Maricá",
    "partilha de bens",
    "união estável",
    "interdição judicial",
    "rescisão trabalhista",
    "horas extras advocacia",
    "indenização danos morais",
    "cobrança abusiva",
    "negativação indevida",
    "Dr Antonio Cardozo advogado",
    "OAB RJ 116110",
    "consultoria jurídica Maricá",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: ogTitle,
    description: ogDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} · Advocacia Cível, Consumidor, Trabalhista e Família`,
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
