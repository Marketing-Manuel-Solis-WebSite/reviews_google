"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { Star, Phone, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { STATS, MAIN_SITE_URL } from "@/content/constants";
import { REVIEWS } from "@/content/reviews";
import { OFFICES } from "@/content/offices";
import { getInitials } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { FloatingBg } from "@/components/ui/FloatingBg";

const STAT_KEYS = ["stat.years", "stat.offices", "stat.families", "stat.stars"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const counted = useRef(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { t } = useLanguage();

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const review = REVIEWS[active];
  const office = OFFICES.find((o) => o.id === review.officeId);

  const goTo = useCallback(
    (idx: number, dir: number) => {
      setDirection(dir);
      setActive(idx);
    },
    []
  );

  const next = useCallback(() => {
    goTo((active + 1) % REVIEWS.length, 1);
  }, [active, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + REVIEWS.length) % REVIEWS.length, -1);
  }, [active, goTo]);

  /* Auto-rotate */
  useEffect(() => {
    autoRef.current = setInterval(next, 5000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [next]);

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 5000);
  }, [next]);

  /* Animate card transition */
  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".hero-review-card");
    if (cards.length === 0) return;
    gsap.fromTo(
      cards,
      { opacity: 0, x: direction * 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [active, direction]);

  /* Touch swipe */
  const touchStart = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
      resetAuto();
    }
  };

  /* Hero intro animations */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-label", { y: 20, opacity: 0, duration: 0.7, delay: 0.3 })
        .from(".hero-headline", { y: 30, opacity: 0, duration: 1 }, "-=0.3")
        .from(".hero-tagline", { y: 15, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-photos", { y: 15, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(
          ".hero-stat",
          { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 },
          "-=0.3"
        )
        .from(".hero-carousel", { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(
          ".hero-cta",
          { y: 15, opacity: 0, stagger: 0.1, duration: 0.5 },
          "-=0.2"
        )
        .from(".hero-mosaic", { x: 40, opacity: 0, duration: 1.2 }, 0.8);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Stat counter animation */
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

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-ivory overflow-x-hidden"
    >
      <FloatingBg />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr,400px] gap-10 lg:gap-16 items-center">
          {/* ── Left: Text Content + Carousel ── */}
          <div>
            <p className="hero-label text-[11px] font-semibold tracking-[0.3em] uppercase text-gold mb-6">
              {t("hero.label")}
            </p>

            <h1 className="hero-headline font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.08] text-navy mb-3">
              {t("hero.h1.1")}{" "}
              <br className="hidden sm:block" />
              <span className="text-gold">{t("hero.h1.2")}</span>
            </h1>

            <p className="hero-tagline font-serif text-xl sm:text-2xl md:text-3xl text-navy/50 italic mb-8">
              {t("hero.tagline")}
            </p>

            {/* Mobile/Tablet: circular photo strip */}
            <div className="hero-photos flex items-center mb-8 lg:hidden">
              <div className="flex -space-x-2">
                {["/bertha.png", "/marina.png", "/pedro.png", "/margarita.png", "/edgar.png"].map(
                  (src, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-ivory overflow-hidden shrink-0 relative"
                    >
                      <Image
                        src={src}
                        alt=""
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                )}
              </div>
              <span className="ml-3 text-sm text-muted">
                <strong className="text-navy">50,000+</strong>{" "}
                {t("hero.families_short")}
              </span>
            </div>

            <p className="hero-sub text-muted text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
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

            {/* ── Review Carousel ── */}
            <div
              className="hero-carousel mb-10"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="review-card-3d !rounded-2xl p-5 sm:p-7 border border-border/40 max-w-2xl">
                <div className="hero-review-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-gold text-gold"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-muted/40 font-medium">
                      Google
                    </span>
                  </div>

                  <p className="text-navy/80 text-sm sm:text-[15px] leading-relaxed mb-5 font-serif italic">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy/40">
                        {getInitials(review.author)}
                      </div>
                      <div>
                        <p className="text-navy text-sm font-semibold">
                          {review.author}
                        </p>
                        <p className="text-muted/50 text-[11px]">
                          {office?.name}
                        </p>
                      </div>
                    </div>
                    {review.googleUrl && (
                      <a
                        href={review.googleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1 text-[11px] text-gold/60 hover:text-gold font-medium transition-colors"
                      >
                        <ExternalLink size={12} />
                        <span className="hidden sm:inline">Google</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mt-5 max-w-2xl">
                <button
                  onClick={() => {
                    prev();
                    resetAuto();
                  }}
                  className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-navy/30 hover:text-navy hover:border-navy/30 transition-colors"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex-1 flex items-center justify-center gap-1.5">
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        goTo(i, i > active ? 1 : -1);
                        resetAuto();
                      }}
                      className={`rounded-full transition-all duration-300 ${
                        active === i
                          ? "w-6 h-1.5 bg-gold"
                          : "w-1.5 h-1.5 bg-navy/10 hover:bg-navy/20"
                      }`}
                      aria-label={`Review ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    next();
                    resetAuto();
                  }}
                  className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-navy/30 hover:text-navy hover:border-navy/30 transition-colors"
                  aria-label="Next review"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#reviews"
                className="hero-cta inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full text-[15px] bg-navy text-white hover:bg-navy-light transition-all duration-300"
              >
                <Star size={15} /> {t("hero.cta1")}
              </a>
              <a
                href={MAIN_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full text-[15px] text-navy border border-navy/15 hover:border-navy/30 transition-all duration-300"
              >
                <Phone size={14} /> {t("hero.cta2")}
              </a>
            </div>
          </div>

          {/* ── Right: Photo Mosaic (desktop) ── */}
          <div className="hero-mosaic hidden lg:block relative pb-8">
            {/* Google rating badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md flex items-center gap-1.5 z-10">
              <Star size={12} className="fill-gold text-gold" />
              <span className="text-xs font-bold text-navy">4.8</span>
              <span className="text-[10px] text-muted/50">Google</span>
            </div>

            {/* Photo grid: tall left + two stacked right */}
            <div
              className="grid grid-cols-2 gap-3"
              style={{ gridTemplateRows: "170px 170px" }}
            >
              <div className="row-span-2 relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/bertha.png"
                  alt="Cliente Bertha Isabel — familia reunida por Law Offices of Manuel Solis"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/marina.png"
                  alt="Cliente Marina Salgado — caso exitoso con Law Offices of Manuel Solis"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/pedro.png"
                  alt="Cliente Pedro Rogel — green card obtenida con Law Offices of Manuel Solis"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>

            {/* Families reunited + stars badge */}
            <div className="absolute -bottom-2 left-3 right-3 bg-navy rounded-xl px-4 py-3 shadow-lg flex items-center justify-between z-10">
              <div>
                <p className="text-gold font-bold text-lg font-serif">
                  50,000+
                </p>
                <p className="text-white/40 text-[9px] uppercase tracking-wider">
                  {t("hero.families_short")}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={9}
                      className="fill-gold text-gold"
                    />
                  ))}
                </div>
                <span className="text-[10px] text-white/40 ml-1">Google</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
