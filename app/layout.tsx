import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { SkipToContent } from "@/components/site/SkipToContent";
import { LanguageProvider } from "@/lib/language-context";
import { TODO_CANONICAL_URL } from "@/content/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manuel Solis Law Firm | La Confianza Se Comprueba",
  description:
    "Más de 35 años reuniendo familias. 15+ oficinas en EE.UU. Reseñas reales verificadas en Google de miles de familias que confiaron en nosotros.",
  metadataBase: new URL(TODO_CANONICAL_URL),
  openGraph: {
    title: "Manuel Solis Law Firm | La Confianza Se Comprueba",
    description:
      "Más de 35 años reuniendo familias. Reseñas reales verificadas en Google, oficina por oficina.",
    type: "website",
    locale: "es_US",
    siteName: "Manuel Solis Law Firm",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Solis Law Firm | La Confianza Se Comprueba",
    description:
      "Más de 35 años reuniendo familias. Reseñas reales verificadas en Google.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${cormorant.variable} ${manrope.variable} antialiased`}
      >
        <LanguageProvider>
          <SkipToContent />
          <JsonLd />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
