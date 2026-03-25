"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Star, ExternalLink } from "lucide-react";
import { STORIES } from "@/content/stories";
import { REVIEWS } from "@/content/reviews";
import { OFFICES } from "@/content/offices";
import { formatRelativeDate, getInitials } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { FloatingBg } from "@/components/ui/FloatingBg";

export function SuccessStories() {
  const { lang, t } = useLanguage();
  const [active, setActive] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const safeActive = active % STORIES.length;
  const story = STORIES[safeActive];
  const review = REVIEWS.find((r) => r.id === story.reviewId);
  const office = OFFICES.find((o) => o.id === story.officeId);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 16 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [safeActive]);

  useEffect(() => {
    const iv = setInterval(
      () => setActive((p) => (p + 1) % STORIES.length),
      6000
    );
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".stories-heading", {
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

  if (!review || !office) return null;

  const storyTitle = t(`${story.id}.title`);
  const storySub = t(`${story.id}.sub`);
  const num = String(safeActive + 1).padStart(2, "0");

  return (
    <section id="casos" ref={sectionRef} className="relative py-16 md:py-24 bg-cream">
      <FloatingBg />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="stories-heading text-center mb-10">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
            {t("stories.label")}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">
            {t("stories.title")}
          </h2>
        </div>

        {/* Editorial two-column layout */}
        <div
          ref={contentRef}
          className="grid md:grid-cols-[100px,1fr] gap-6 md:gap-10 min-h-[340px]"
          aria-live="polite"
        >
          {/* Left — decorative number */}
          <div className="hidden md:flex flex-col items-center pt-2">
            <span className="font-serif text-[5rem] font-bold leading-none text-gold/15">
              {num}
            </span>
            <div className="w-px flex-1 bg-gold/10 mt-2" />
          </div>

          {/* Right — content */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-border/40 shadow-[0_4px_24px_rgba(16,38,63,0.04)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold/8 text-gold border border-gold/10">
                {office.name}, {office.state}
              </span>
              <span className="md:hidden font-serif text-2xl font-bold text-gold/20">
                {num}
              </span>
            </div>

            <h3 className="font-serif text-xl md:text-2xl font-bold text-navy mb-1.5">
              {storyTitle}
            </h3>
            <p className="text-muted text-sm mb-5">{storySub}</p>

            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: review.rating }, (_, i) => (
                <Star key={i} size={13} className="fill-gold text-gold" />
              ))}
            </div>

            <p className="text-navy/60 text-sm md:text-base leading-relaxed mb-6 line-clamp-4 italic font-serif">
              &ldquo;{review.text}&rdquo;
            </p>

            <div className="flex items-center justify-between flex-wrap gap-3 pt-5 border-t border-border/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy/40">
                  {getInitials(review.author)}
                </div>
                <div>
                  <p className="text-navy text-sm font-semibold">
                    {review.author}
                  </p>
                  <p className="text-muted/50 text-[11px]">
                    {formatRelativeDate(review.datePublished, lang)}
                  </p>
                </div>
              </div>
              {review.googleUrl && (
                <a
                  href={review.googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy text-white text-xs font-semibold hover:bg-navy-light transition-colors"
                >
                  {t("stories.verify")} <ExternalLink size={11} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="h-0.5 bg-navy/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-500"
              style={{
                width: `${((safeActive + 1) / STORIES.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-center text-[10px] text-muted/40 mt-2">
            {num} / {String(STORIES.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
