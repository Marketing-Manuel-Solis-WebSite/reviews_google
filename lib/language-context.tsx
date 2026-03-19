"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "es",
  setLang: () => {},
  t: (key) => key,
});

const T: Record<string, Record<Lang, string>> = {
  /* ── Navbar ── */
  "nav.reviews": { es: "Reviews", en: "Reviews" },
  "nav.cases": { es: "Casos", en: "Cases" },
  "nav.offices": { es: "Oficinas", en: "Offices" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "nav.call": { es: "Llamar Ahora", en: "Call Now" },

  /* ── Hero ── */
  "hero.label": {
    es: "Abogados de Inmigración \u00B7 Desde 1990",
    en: "Immigration Lawyers \u00B7 Since 1990",
  },
  "hero.h1.1": { es: "La confianza no", en: "Trust is not" },
  "hero.h1.2": { es: "se promete.", en: "promised." },
  "hero.h1.3": { es: "Se comprueba.", en: "It\u2019s proven." },
  "hero.sub": {
    es: "Reseñas reales verificadas en Google de familias que confiaron en Manuel Solis Law Firm, oficina por oficina.",
    en: "Real verified Google reviews from families who trusted Manuel Solis Law Firm, office by office.",
  },
  "hero.cta1": { es: "Ver Reseñas Verificadas", en: "See Verified Reviews" },
  "hero.cta2": { es: "Consulta Gratis", en: "Free Consultation" },

  /* ── Stats ── */
  "stat.years": { es: "Años de Experiencia", en: "Years of Experience" },
  "stat.offices": { es: "Oficinas en EE.UU.", en: "U.S. Offices" },
  "stat.families": { es: "Familias Reunidas", en: "Families Reunited" },
  "stat.stars": { es: "Estrellas en Google", en: "Google Stars" },

  /* ── Social Proof Band ── */
  "band.years": { es: "35+ años de experiencia", en: "35+ years of experience" },
  "band.families": { es: "50,000+ familias reunidas", en: "50,000+ families reunited" },
  "band.verified": { es: "Reseñas verificadas en Google", en: "Verified Google Reviews" },
  "band.avg": { es: "4.8 promedio en Google", en: "4.8 average on Google" },
  "band.offices": { es: "15+ oficinas en EE.UU.", en: "15+ U.S. offices" },

  /* ── Reviews ── */
  "reviews.label": { es: "Prueba Social", en: "Social Proof" },
  "reviews.title": { es: "Reseñas Verificadas", en: "Verified Reviews" },
  "reviews.google": { es: "en Google", en: "on Google" },
  "reviews.verified": { es: "Verificada", en: "Verified" },
  "reviews.seeGoogle": { es: "Ver en Google", en: "See on Google" },

  /* ── Featured ── */
  "featured.label": { es: "Reseña Destacada", en: "Featured Review" },
  "featured.verify": { es: "Verificar en Google", en: "Verify on Google" },

  /* ── Stories ── */
  "stories.label": { es: "Casos de Éxito", en: "Success Stories" },
  "stories.title": {
    es: "Historias de Familias Reunidas",
    en: "Stories of Reunited Families",
  },
  "stories.verify": { es: "Verificar en Google", en: "Verify on Google" },
  "s-la.title": {
    es: "Gilmar obtuvo su residencia y seguro social",
    en: "Gilmar obtained his residency and social security",
  },
  "s-la.sub": {
    es: "Gracias a la preparación y asesoría de la oficina de Los Angeles",
    en: "Thanks to the preparation and advising from the Los Angeles office",
  },
  "s-chi.title": {
    es: "Isabel recibió su Green Card después de años",
    en: "Isabel received her Green Card after years",
  },
  "s-chi.sub": {
    es: "Un proceso largo pero que valió la pena con el apoyo de Chicago",
    en: "A long process but worth it with Chicago\u2019s support",
  },
  "s-har.title": {
    es: "Wendy completó su trámite consular con éxito",
    en: "Wendy successfully completed her consular process",
  },
  "s-har.sub": {
    es: "Asesoría completa desde el viaje hasta las citas en Ciudad Juárez",
    en: "Full advising from travel to appointments in Ciudad Juárez",
  },
  "s-dal.title": {
    es: "Marina finalizó su proceso antes del tiempo estimado",
    en: "Marina finished her process ahead of schedule",
  },
  "s-dal.sub": {
    es: "Atención dedicada del equipo de Dallas",
    en: "Dedicated attention from the Dallas team",
  },
  "s-den.title": {
    es: "Claudia obtuvo su residencia en Denver",
    en: "Claudia obtained her residency in Denver",
  },
  "s-den.sub": {
    es: "Un proceso exitoso de principio a fin",
    en: "A successful process from start to finish",
  },
  "s-elp.title": {
    es: "La familia de Ana fue reunida en El Paso",
    en: "Ana\u2019s family was reunited in El Paso",
  },
  "s-elp.sub": {
    es: "Atención constante y comunicación durante todo el caso",
    en: "Constant attention and communication throughout the case",
  },

  /* ── Gallery ── */
  "gallery.label": { es: "Nuestras Familias", en: "Our Families" },
  "gallery.title": { es: "Rostros de Confianza", en: "Faces of Trust" },
  "gallery.subtitle": {
    es: "Cada imagen representa una familia que confió en nosotros.",
    en: "Each image represents a family that trusted us.",
  },

  /* ── Offices ── */
  "offices.label": { es: "Cobertura Nacional", en: "National Coverage" },
  "offices.title": { es: "Nuestras Oficinas", en: "Our Offices" },
  "offices.houston": { es: "Área de Houston", en: "Houston Area" },
  "offices.texas": { es: "Texas", en: "Texas" },
  "offices.national": { es: "Fuera de Texas", en: "Outside Texas" },
  "offices.seeReviews": { es: "Ver reseñas", en: "See reviews" },
  "offices.seeMap": { es: "Ver en mapa", en: "See on map" },
  "offices.one": { es: "oficina", en: "office" },
  "offices.many": { es: "oficinas", en: "offices" },
  "offices.24hrs": {
    es: "Atención las 24 horas en múltiples oficinas",
    en: "24-hour service in multiple offices",
  },

  /* ── CTA ── */
  "cta.label": { es: "Consulta Confidencial", en: "Confidential Consultation" },
  "cta.title1": { es: "¿Listo para el", en: "Ready for the" },
  "cta.title2": { es: "primer paso", en: "first step" },
  "cta.sub": {
    es: "Tu familia merece la mejor representación legal. Contáctanos hoy.",
    en: "Your family deserves the best legal representation. Contact us today.",
  },
  "cta.call": { es: "Llamar Ahora", en: "Call Now" },
  "cta.offices": { es: "Ver Oficinas", en: "See Offices" },
  "cta.disclaimer": {
    es: "Consulta 100% Confidencial \u00B7 Respondemos en menos de 24 horas",
    en: "100% Confidential Consultation \u00B7 We respond within 24 hours",
  },

  /* ── Footer ── */
  "footer.tagline": {
    es: "Reuniendo familias desde 1990. Más de 35 años de experiencia en derecho de inmigración.",
    en: "Reuniting families since 1990. Over 35 years of experience in immigration law.",
  },
  "footer.nav": { es: "Navegación", en: "Navigation" },
  "footer.contact": { es: "Contacto", en: "Contact" },
  "footer.cases": { es: "Casos de Éxito", en: "Success Stories" },
  "footer.disclaimer": {
    es: "Las reseñas son verificables en Google Maps. Resultados pasados no garantizan resultados futuros. Este sitio no constituye asesoría legal.",
    en: "Reviews are verifiable on Google Maps. Past results do not guarantee future outcomes. This site does not constitute legal advice.",
  },
  "footer.rights": {
    es: "Todos los derechos reservados.",
    en: "All rights reserved.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => T[key]?.[lang] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
