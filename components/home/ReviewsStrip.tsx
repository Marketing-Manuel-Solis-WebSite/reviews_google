"use client";

import { Star, CheckCircle } from "lucide-react";
import { REVIEWS } from "@/content/reviews";
import { OFFICES } from "@/content/offices";
import { getInitials } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export function ReviewsStrip() {
  const { t } = useLanguage();
  const items = [...REVIEWS, ...REVIEWS];

  return (
    <section
      className="py-8 bg-cream/60 overflow-hidden border-y border-border/20"
      aria-label={t("reviews.label")}
    >
      <p className="text-center text-[11px] font-semibold tracking-[0.3em] uppercase text-gold mb-5">
        {t("reviews.strip_title")}
      </p>
      <div className="reviews-marquee-track flex gap-4 px-4">
        {items.map((review, i) => {
          const office = OFFICES.find((o) => o.id === review.officeId);
          return (
            <div
              key={`${review.id}-${i}`}
              className="shrink-0 w-80 bg-white rounded-xl p-4 border border-border/30 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }, (_, j) => (
                    <Star key={j} size={10} className="fill-gold text-gold" />
                  ))}
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">
                  <CheckCircle size={8} className="text-emerald-500" />
                  <span className="text-[8px] text-emerald-600 font-medium">
                    {t("reviews.verified")}
                  </span>
                </div>
              </div>
              <p className="text-navy/70 text-xs leading-relaxed mb-3 line-clamp-2 italic font-serif">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center text-[8px] font-bold text-navy/40">
                  {getInitials(review.author)}
                </div>
                <div>
                  <p className="text-navy text-[11px] font-semibold">
                    {review.author}
                  </p>
                  <p className="text-muted/50 text-[9px]">{office?.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
