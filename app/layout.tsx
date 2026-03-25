import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { SkipToContent } from "@/components/site/SkipToContent";
import { LanguageProvider } from "@/lib/language-context";
import { Analytics } from "@vercel/analytics/next";
import { CANONICAL_URL, SITE_NAME } from "@/content/constants";
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
  title:
    "Abogados de Inmigración | Manuel Solis Law Firm | 15+ Oficinas en EE.UU.",
  description:
    "Abogado de inmigración Manuel Solis: 35+ años de experiencia, 50,000+ familias reunidas, 15+ oficinas en Estados Unidos. Reseñas reales verificadas en Google. Residencia, Green Card, ciudadanía, visas, asilo y más.",
  metadataBase: new URL(CANONICAL_URL),
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/",
    },
  },
  keywords: [
    "abogado de inmigración",
    "immigration lawyer",
    "Manuel Solis",
    "abogado Manuel Solis",
    "Manuel Solis Law Firm",
    "abogado inmigración Houston",
    "immigration attorney",
    "abogado green card",
    "abogado residencia",
    "abogado ciudadanía",
    "mejor abogado inmigración",
    "abogado inmigración cerca de mí",
    "immigration lawyer near me",
    "abogado inmigración Dallas",
    "abogado inmigración Chicago",
    "abogado inmigración Los Angeles",
    "abogado inmigración El Paso",
    "abogado inmigración Denver",
    "abogado inmigración Memphis",
    "abogado DACA",
    "abogado asilo",
    "abogado deportación",
    "abogado peticiones familiares",
    "abogado visa de trabajo",
  ],
  openGraph: {
    title:
      "Abogados de Inmigración | Manuel Solis Law Firm | Reseñas Verificadas",
    description:
      "35+ años reuniendo familias. 50,000+ casos de éxito. Reseñas reales verificadas en Google, oficina por oficina. 15+ oficinas en Estados Unidos.",
    type: "website",
    locale: "es_US",
    alternateLocale: "en_US",
    siteName: SITE_NAME,
    url: CANONICAL_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Abogados de Inmigración | Manuel Solis Law Firm",
    description:
      "35+ años reuniendo familias. 50,000+ familias. Reseñas verificadas en Google.",
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
      <head>
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MK8PN4L9');`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NK4Q6B1G5C"
          strategy="afterInteractive"
        />
        <Script id="ga-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-NK4Q6B1G5C');`}
        </Script>
      </head>
      <body
        className={`${cormorant.variable} ${manrope.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MK8PN4L9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LanguageProvider>
          <SkipToContent />
          <JsonLd />
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
