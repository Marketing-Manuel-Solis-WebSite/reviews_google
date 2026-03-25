import type { MetadataRoute } from "next";
import { CANONICAL_URL } from "@/content/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: CANONICAL_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          es: CANONICAL_URL,
          en: CANONICAL_URL,
        },
      },
    },
  ];
}
