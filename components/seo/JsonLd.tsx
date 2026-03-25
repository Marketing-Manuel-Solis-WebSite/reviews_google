import { REVIEWS } from "@/content/reviews";
import { OFFICES } from "@/content/offices";
import {
  SITE_NAME,
  PHONE,
  CANONICAL_URL,
  MAIN_SITE_URL,
  SOCIAL,
  SERVICES,
} from "@/content/constants";

export function JsonLd() {
  const avgRating = (
    REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
  ).toFixed(1);

  /* ── 1. Main Organization + LegalService ── */
  const organization = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "Organization"],
    "@id": `${MAIN_SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: [
      "Abogado Manuel Solis",
      "Manuel Solis Immigration Lawyers",
      "Bufete de Abogados Manuel Solis",
    ],
    description:
      "Bufete de abogados de inmigración con más de 35 años de experiencia reuniendo familias. 15+ oficinas en Estados Unidos. Especialistas en residencia permanente, green card, ciudadanía, visas, asilo, DACA y defensa de deportación.",
    url: MAIN_SITE_URL,
    telephone: PHONE,
    foundingDate: "1990",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50 },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "State", name: "Texas" },
      { "@type": "State", name: "California" },
      { "@type": "State", name: "Illinois" },
      { "@type": "State", name: "Colorado" },
      { "@type": "State", name: "Tennessee" },
    ],
    serviceType: SERVICES.map((s) => s.en),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Immigration Legal Services",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: s.en,
        description: s.es,
        url: `${MAIN_SITE_URL}${s.path}`,
      })),
    },
    sameAs: [
      SOCIAL.facebook,
      SOCIAL.instagram,
      SOCIAL.youtube,
      SOCIAL.tiktok,
    ].filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: REVIEWS.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: REVIEWS.map((r) => {
      const office = OFFICES.find((o) => o.id === r.officeId);
      return {
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        datePublished: r.datePublished,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody: r.text,
        inLanguage: r.language,
        ...(office && {
          locationCreated: {
            "@type": "Place",
            name: `${SITE_NAME} — ${office.name}`,
            address: office.address,
          },
        }),
      };
    }),
  };

  /* ── 2. Attorney (Person) ── */
  const attorney = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    "@id": `${MAIN_SITE_URL}/#attorney`,
    name: "Manuel Solis",
    jobTitle: "Immigration Attorney / Abogado de Inmigración",
    worksFor: { "@id": `${MAIN_SITE_URL}/#organization` },
    url: MAIN_SITE_URL,
    knowsAbout: [
      "Immigration Law",
      "Green Card Applications",
      "U.S. Citizenship",
      "Work Visas",
      "Family Petitions",
      "Asylum",
      "DACA",
      "Deportation Defense",
      "Consular Processing",
    ],
    knowsLanguage: ["es", "en"],
  };

  /* ── 3. LocalBusiness per office ── */
  const localBusinesses = OFFICES.map((office) => {
    const officeReviews = REVIEWS.filter((r) => r.officeId === office.id);
    return {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "@id": `${MAIN_SITE_URL}/oficina/${office.slug}`,
      name: `${SITE_NAME} — ${office.name}`,
      parentOrganization: { "@id": `${MAIN_SITE_URL}/#organization` },
      telephone: office.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: office.address.split(",")[0],
        addressLocality: office.city,
        addressRegion: office.state,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: office.lat,
        longitude: office.lng,
      },
      openingHours: office.hours,
      url: `${MAIN_SITE_URL}/oficina/${office.slug}`,
      ...(officeReviews.length > 0 && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: (
            officeReviews.reduce((s, r) => s + r.rating, 0) /
            officeReviews.length
          ).toFixed(1),
          reviewCount: officeReviews.length,
          bestRating: "5",
          worstRating: "1",
        },
      }),
    };
  });

  /* ── 4. FAQPage ── */
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuántas oficinas tiene el Abogado Manuel Solis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Manuel Solis Law Firm cuenta con más de 15 oficinas en Estados Unidos: Houston (7 ubicaciones), Dallas, El Paso, Harlingen, League City en Texas, además de oficinas en Chicago (IL), Memphis (TN), Denver (CO) y Los Angeles (CA).",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuántos años de experiencia tiene Manuel Solis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Manuel Solis Law Firm tiene más de 35 años de experiencia en derecho de inmigración, desde 1990, habiendo ayudado a más de 50,000 familias con sus trámites migratorios.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué servicios de inmigración ofrece Manuel Solis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ofrecemos servicios completos de inmigración: Residencia Permanente (Green Card), Ciudadanía Americana (Naturalización), Visas de Trabajo, Peticiones Familiares, Asilo y Refugio, DACA/Dreamers, Defensa de Deportación, Procesos Consulares y Permisos de Trabajo.",
        },
      },
      {
        "@type": "Question",
        name: "¿Las reseñas del Abogado Manuel Solis son reales?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Todas las reseñas mostradas en nuestro sitio son verificables directamente en Google Maps. Cada reseña incluye un enlace directo al perfil de Google donde fue publicada originalmente.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo puedo agendar una consulta con Manuel Solis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Puede contactarnos llamando al ${PHONE} disponible las 24 horas en múltiples oficinas, o visitando nuestro sitio web en ${MAIN_SITE_URL} para más información sobre la oficina más cercana a usted.`,
        },
      },
      {
        "@type": "Question",
        name: "How many offices does Manuel Solis have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Manuel Solis Law Firm has 15+ offices across the United States: Houston (7 locations), Dallas, El Paso, Harlingen, and League City in Texas, plus offices in Chicago (IL), Memphis (TN), Denver (CO), and Los Angeles (CA).",
        },
      },
      {
        "@type": "Question",
        name: "What immigration services does Manuel Solis offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer comprehensive immigration services including Permanent Residency (Green Card), U.S. Citizenship (Naturalization), Work Visas, Family Petitions, Asylum & Refuge, DACA/Dreamers, Deportation Defense, Consular Processing, and Work Permits.",
        },
      },
    ],
  };

  /* ── 5. BreadcrumbList ── */
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: MAIN_SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Reseñas Verificadas",
        item: CANONICAL_URL,
      },
    ],
  };

  /* ── 6. WebPage ── */
  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Reseñas Verificadas — Manuel Solis Law Firm",
    description:
      "Reseñas reales verificadas en Google de familias que confiaron en el Abogado Manuel Solis. 35+ años, 50,000+ familias reunidas, 15+ oficinas en EE.UU.",
    url: CANONICAL_URL,
    inLanguage: ["es", "en"],
    isPartOf: {
      "@type": "WebSite",
      url: MAIN_SITE_URL,
      name: SITE_NAME,
    },
    about: { "@id": `${MAIN_SITE_URL}/#organization` },
    mainEntity: { "@id": `${MAIN_SITE_URL}/#organization` },
  };

  const schemas = [
    organization,
    attorney,
    ...localBusinesses,
    faq,
    breadcrumb,
    webpage,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
