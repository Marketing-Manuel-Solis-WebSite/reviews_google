import { REVIEWS } from "@/content/reviews";
import { OFFICES } from "@/content/offices";
import { SITE_NAME, TODO_PHONE, TODO_CANONICAL_URL } from "@/content/constants";

export function JsonLd() {
  const avgRating = (
    REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
  ).toFixed(1);

  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: SITE_NAME,
    description:
      "Bufete de abogados de inmigración con más de 35 años de experiencia. 15+ oficinas en Estados Unidos.",
    telephone: TODO_PHONE,
    url: TODO_CANONICAL_URL,
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
        ...(office && {
          locationCreated: { "@type": "Place", name: office.name },
        }),
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
