"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Star, ExternalLink } from "lucide-react";
import { REVIEWS } from "@/content/reviews";
import { OFFICES } from "@/content/offices";
import { getInitials, formatRelativeDate } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { FloatingBg } from "@/components/ui/FloatingBg";

export function FeaturedReview() {
  const { lang, t } = useLanguage();

  const featured = REVIEWS.filter(
    (r) => r.featured && r.language === lang
  );
  const pool =
    featured.length > 0
      ? featured
      : REVIEWS.filter((r) => r.featured);

  const [active, setActive] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setActive(0);
  }, [lang]);

  const safeActive = active % Math.max(pool.length, 1);
  const review = pool[safeActive];
  const office = review
    ? OFFICES.find((o) => o.id === review.officeId)
    : null;

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [safeActive, lang]);

  useEffect(() => {
    if (pool.length <= 1) return;
    const iv = setInterval(
      () => setActive((p) => (p + 1) % pool.length),
      7000
    );
    return () => clearInterval(iv);
  }, [pool.length]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!review) return null;

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy"
      aria-label={t("featured.label")}
    >
      <FloatingBg dark />

      {/* Fixed-height — never resizes regardless of content */}
      <div className="relative z-10 h-[720px] sm:h-[680px] md:h-[660px] flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="max-w-3xl mx-auto w-full text-center">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold/60 mb-8">
            {t("featured.label")}
          </p>

          <div ref={contentRef} aria-live="polite">
            <div className="flex justify-center gap-0.5 mb-8">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={18} className="fill-gold text-gold" />
              ))}
            </div>

            <blockquote className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-white/90 leading-[1.7] mb-10 italic line-clamp-6">
              &ldquo;{review.text}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gold/60">
                {getInitials(review.author)}
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">
                  {review.author}
                </p>
                <p className="text-white/30 text-xs">
                  {office?.name} &middot;{" "}
                  {formatRelativeDate(review.datePublished)}
                </p>
              </div>
            </div>

            <a
              href={review.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gold/50 hover:text-gold text-xs font-medium transition-colors duration-300"
            >
              {t("featured.verify")} <ExternalLink size={11} />
            </a>
          </div>

          {pool.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-8">
              {pool.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    safeActive === i ? "w-6 bg-gold" : "w-1.5 bg-white/15"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
