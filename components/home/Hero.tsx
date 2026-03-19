"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { Star, Phone } from "lucide-react";
import { STATS, TODO_PHONE } from "@/content/constants";
import { REVIEWS } from "@/content/reviews";
import { OFFICES } from "@/content/offices";
import { getInitials } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { FloatingBg } from "@/components/ui/FloatingBg";

const INLINE_IDS = ["r-chi", "r-mem", "r-elp"];
const INLINE_CARDS = REVIEWS.filter((r) => INLINE_IDS.includes(r.id));

const BOTTOM_IDS = ["r-la", "r-har", "r-hou", "r-acc"];
const BOTTOM_CARDS = REVIEWS.filter((r) => BOTTOM_IDS.includes(r.id));

const FLOAT_IDS = ["r-dal", "r-den", "r-bel"];
const FLOAT_CARDS = REVIEWS.filter((r) => FLOAT_IDS.includes(r.id));

const STAT_KEYS = ["stat.years", "stat.offices", "stat.families", "stat.stars"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const counted = useRef(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-label", { y: 20, opacity: 0, duration: 0.7, delay: 0.3 })
        .from(".hero-headline", { y: 30, opacity: 0, duration: 1 }, "-=0.3")
        .from(
          ".hero-inline-card",
          {
            y: 30,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(
          ".hero-stat",
          { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 },
          "-=0.3"
        )
        .from(
          ".hero-cta",
          { y: 15, opacity: 0, stagger: 0.1, duration: 0.5 },
          "-=0.2"
        )
        .from(
          ".hero-bottom-card",
          { y: 25, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )
        .from(
          ".hero-float-card",
          { y: 25, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );

      gsap.utils.toArray<HTMLElement>(".hero-float-card").forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -8 : 8,
          rotation: i % 2 === 0 ? 0.4 : -0.4,
          duration: 3.5 + i * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.35,
        });
      });

      gsap.utils
        .toArray<HTMLElement>(".hero-inline-card")
        .forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? -5 : 5,
            rotation: i % 2 === 0 ? 0.2 : -0.2,
            duration: 3.5 + i * 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.3,
          });
        });

      gsap.utils
        .toArray<HTMLElement>(".hero-bottom-card")
        .forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? -7 : 7,
            rotation: i % 2 === 0 ? 0.3 : -0.3,
            duration: 4 + i * 0.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.5,
          });
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (counted.current) return;
    counted.current = true;
    STATS.forEach((stat, idx) => {
      const el = statRefs.current[idx];
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2.4,
        delay: 1.2 + idx * 0.15,
        ease: "power2.out",
        onUpdate() {
          if (!el) return;
          if (stat.display && obj.val >= stat.value * 0.95)
            el.textContent = stat.display + stat.suffix;
          else if (stat.decimal)
            el.textContent = obj.val.toFixed(1) + stat.suffix;
          else
            el.textContent =
              Math.floor(obj.val).toLocaleString() + stat.suffix;
        },
      });
    });
  }, []);

  const rotations = [
    "-rotate-[1.5deg]",
    "rotate-[0.8deg]",
    "-rotate-[0.5deg]",
  ];

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-ivory overflow-x-hidden"
    >
      <FloatingBg />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        <div>
          <div>
            <p className="hero-label text-[11px] font-semibold tracking-[0.3em] uppercase text-gold mb-6">
              {t("hero.label")}
            </p>

            <h1 className="hero-headline font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.08] text-navy mb-8">
              {t("hero.h1.1")}{" "}
              <br className="hidden sm:block" />
              {t("hero.h1.2")}{" "}
              <span className="text-gold">{t("hero.h1.3")}</span>
            </h1>

            {/* Inline floating cards */}
            <div className="flex gap-3 mb-8 overflow-visible pb-4">
              {INLINE_CARDS.map((review, i) => {
                const office = OFFICES.find((o) => o.id === review.officeId);
                return (
                  <div
                    key={review.id}
                    className={`hero-inline-card shrink-0 w-[240px] sm:w-[260px] bg-white rounded-xl p-4 border border-border/50 shadow-[0_8px_32px_rgba(16,38,63,0.06)] ${rotations[i]}`}
                  >
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }, (_, j) => (
                        <Star
                          key={j}
                          size={10}
                          className="fill-gold text-gold"
                        />
                      ))}
                      <span className="ml-auto text-[9px] text-muted/40">
                        Google
                      </span>
                    </div>
                    <p className="text-navy/70 text-[12px] leading-relaxed mb-2">
                      {review.text}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center text-[9px] font-bold text-navy/40">
                        {getInitials(review.author)}
                      </div>
                      <div>
                        <p className="text-navy text-[11px] font-semibold">
                          {review.author}
                        </p>
                        <p className="text-muted/40 text-[9px]">
                          {office?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="hero-sub text-muted text-base sm:text-lg max-w-lg mb-10 leading-relaxed">
              {t("hero.sub")}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
              {STATS.map((stat, idx) => (
                <div key={idx} className="hero-stat">
                  <span
                    ref={(el) => {
                      statRefs.current[idx] = el;
                    }}
                    className="block font-serif text-3xl sm:text-4xl font-bold text-navy"
                  >
                    0
                  </span>
                  <span className="block mt-1 text-[11px] text-muted/60 uppercase tracking-wider">
                    {t(STAT_KEYS[idx])}
                  </span>
                </div>
              ))}
            </div>

            {/* ── 4 floating mini-cards below stats ── */}
            <div className="flex gap-2.5 mb-4 overflow-visible pb-2 hide-scrollbar">
              {BOTTOM_CARDS.map((review, i) => {
                const office = OFFICES.find((o) => o.id === review.officeId);
                const rots = [
                  "rotate-[1deg]",
                  "-rotate-[0.8deg]",
                  "rotate-[0.5deg]",
                  "-rotate-[1.2deg]",
                ];
                return (
                  <div
                    key={review.id}
                    className={`hero-bottom-card shrink-0 w-[190px] bg-white rounded-lg p-3 border border-border/40 shadow-[0_4px_20px_rgba(16,38,63,0.05)] ${rots[i]}`}
                  >
                    <div className="flex items-center gap-0.5 mb-1.5">
                      {Array.from({ length: 5 }, (_, j) => (
                        <Star key={j} size={8} className="fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-navy/60 text-[10px] leading-relaxed line-clamp-2 mb-1.5">
                      {review.text}
                    </p>
                    <p className="text-navy/80 text-[9px] font-semibold">
                      {review.author}
                      <span className="text-muted/40 font-normal">
                        {" "}&middot; {office?.name}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* ── 3 floating cards (Marina, Claudia, Rogelio) ── */}
            <div className="flex gap-3 mb-10 overflow-visible pb-3">
              {FLOAT_CARDS.map((review, i) => {
                const office = OFFICES.find((o) => o.id === review.officeId);
                const rots = [
                  "-rotate-[1deg]",
                  "rotate-[0.6deg]",
                  "-rotate-[0.4deg]",
                ];
                return (
                  <div
                    key={review.id}
                    className={`hero-float-card shrink-0 w-[220px] sm:w-[240px] bg-white rounded-xl p-3.5 border border-border/50 shadow-[0_6px_24px_rgba(16,38,63,0.06)] ${rots[i]}`}
                  >
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: 5 }, (_, j) => (
                        <Star key={j} size={9} className="fill-gold text-gold" />
                      ))}
                      <span className="ml-auto text-[8px] text-muted/40">Google</span>
                    </div>
                    <p className="text-navy/70 text-[11px] leading-relaxed mb-2">
                      {review.text}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center text-[8px] font-bold text-navy/40">
                        {getInitials(review.author)}
                      </div>
                      <div>
                        <p className="text-navy text-[10px] font-semibold">
                          {review.author}
                        </p>
                        <p className="text-muted/40 text-[8px]">
                          {office?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#reviews"
                className="hero-cta inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full text-[15px] bg-navy text-white hover:bg-navy-light transition-all duration-300"
              >
                <Star size={15} /> {t("hero.cta1")}
              </a>
              <a
                href={`tel:${TODO_PHONE}`}
                className="hero-cta inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full text-[15px] text-navy border border-navy/15 hover:border-navy/30 transition-all duration-300"
              >
                <Phone size={14} /> {t("hero.cta2")}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
