"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { Star, ExternalLink, CheckCircle, X } from "lucide-react";
import { REVIEWS } from "@/content/reviews";
import { OFFICES } from "@/content/offices";
import type { Review } from "@/lib/types";
import { formatRelativeDate, getInitials } from "@/lib/utils";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { useLanguage } from "@/lib/language-context";
import { FloatingBg } from "@/components/ui/FloatingBg";

export function ReviewsSection() {
  const { lang, t } = useLanguage();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = REVIEWS.filter((r) => r.language === lang);

  /* Animate cards on mount + language change */
  useEffect(() => {
    if (!gridRef.current) return;
    const children = gridRef.current.children;
    if (children.length === 0) return;
    gsap.fromTo(
      children,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: "power3.out" }
    );
  }, [lang]);

  /* Scroll reveal heading */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".reviews-heading", {
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

  const openModal = useCallback((review: Review) => {
    setSelectedReview(review);
    dialogRef.current?.showModal();
  }, []);

  const closeModal = useCallback(() => {
    setSelectedReview(null);
    dialogRef.current?.close();
  }, []);

  return (
    <section id="reviews" ref={sectionRef} className="relative py-16 md:py-24 bg-ivory">
      <FloatingBg />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Centered heading */}
        <div className="reviews-heading text-center mb-12">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold mb-4">
            {t("reviews.label")}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
            {t("reviews.title")}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={14} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-navy font-bold text-sm">4.8</span>
            <span className="text-muted text-sm">{t("reviews.google")}</span>
          </div>
        </div>

        {/* Review grid */}
        <div
          ref={gridRef}
          className="columns-1 md:columns-2 lg:columns-3 gap-4"
          aria-live="polite"
        >
          {filtered.map((review) => {
            const office = OFFICES.find((o) => o.id === review.officeId);
            const isFeatured = review.featured;

            return (
              <button
                key={review.id}
                onClick={() => openModal(review)}
                className={`review-card-3d block w-full text-left break-inside-avoid mb-4 border cursor-pointer group ${
                  isFeatured
                    ? "p-6 md:p-8 border-l-2 border-l-gold/30 border-border/40"
                    : "p-5 border-border/40"
                } hover:border-gold/20`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="fill-gold text-gold"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">
                    <CheckCircle size={10} className="text-emerald-500" />
                    <span className="text-[9px] text-emerald-600 font-medium">
                      {t("reviews.verified")}
                    </span>
                  </div>
                </div>

                <p
                  className={`text-navy/80 leading-relaxed mb-4 ${
                    isFeatured
                      ? "text-[15px] font-serif italic"
                      : "text-sm"
                  }`}
                >
                  {isFeatured ? `\u201C${review.text}\u201D` : review.text}
                </p>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy/40 shrink-0">
                    {getInitials(review.author)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-navy text-sm font-semibold">
                      {review.author}
                    </p>
                    <p className="text-muted/50 text-[11px]">
                      {office?.name} &middot;{" "}
                      {formatRelativeDate(review.datePublished, lang)}
                    </p>
                  </div>
                  {review.googleUrl && (
                    <a
                      href={review.googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 text-muted/30 hover:text-gold transition-colors"
                      aria-label={`${t("reviews.seeGoogle")} - ${review.author}`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeModal();
        }}
        onClose={closeModal}
        className="max-w-lg w-[calc(100%-2rem)] mx-auto rounded-2xl bg-transparent p-0 border-none"
      >
        {selectedReview &&
          (() => {
            const office = OFFICES.find(
              (o) => o.id === selectedReview.officeId
            );
            return (
              <div className="bg-white rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-0.5">
                    {Array.from(
                      { length: selectedReview.rating },
                      (_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-gold text-gold"
                        />
                      )
                    )}
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-muted/40 hover:text-navy transition-colors"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-navy text-lg leading-relaxed mb-6 font-serif">
                  &ldquo;{selectedReview.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border/30">
                  <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-xs font-bold text-navy/40">
                    {getInitials(selectedReview.author)}
                  </div>
                  <div className="flex-1">
                    <p className="text-navy font-semibold">
                      {selectedReview.author}
                    </p>
                    <p className="text-muted/50 text-sm">
                      {office?.name} &middot;{" "}
                      {formatRelativeDate(selectedReview.datePublished, lang)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                    <CheckCircle size={11} className="text-emerald-500" />
                    <span className="text-[10px] text-emerald-600 font-medium">
                      {t("reviews.verified")}
                    </span>
                  </div>
                </div>

                {selectedReview.googleUrl && (
                  <a
                    href={selectedReview.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy text-white text-sm font-semibold hover:bg-navy-light transition-colors"
                  >
                    <GoogleIcon size={14} />
                    {t("reviews.seeGoogle")}
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            );
          })()}
      </dialog>
    </section>
  );
}
