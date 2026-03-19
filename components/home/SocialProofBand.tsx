"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function SocialProofBand() {
  const { t } = useLanguage();

  const MARQUEE_ITEMS = [
    { text: "Los Angeles", stars: true },
    { text: t("band.years") },
    { text: "Chicago", stars: true },
    { text: t("band.families") },
    { text: "Dallas", stars: true },
    { text: t("band.verified") },
    { text: "Houston", stars: true },
    { text: t("band.avg") },
    { text: "Denver", stars: true },
    { text: t("band.offices") },
    { text: "Memphis", stars: true },
    { text: "El Paso", stars: true },
    { text: "Harlingen", stars: true },
  ];

  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      className="py-3.5 bg-navy overflow-hidden"
      aria-label="Social proof"
    >
      <div className="marquee-track flex items-center gap-10">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 text-white/40 text-[13px] font-medium tracking-wide whitespace-nowrap"
          >
            {item.stars ? (
              <>
                <span className="text-white/60">{item.text}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star
                      key={j}
                      size={9}
                      className="fill-gold/60 text-gold/60"
                    />
                  ))}
                </span>
              </>
            ) : (
              <>
                <span className="w-1 h-1 rounded-full bg-gold/30 shrink-0" />
                {item.text}
              </>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
