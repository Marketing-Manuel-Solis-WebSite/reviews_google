"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Phone, MapPin } from "lucide-react";
import { TODO_PHONE, TODO_PHONE_DISPLAY } from "@/content/constants";
import { useLanguage } from "@/lib/language-context";
import { FloatingBg } from "@/components/ui/FloatingBg";

export function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contacto" ref={sectionRef} className="relative py-16 md:py-24 bg-navy">
      <FloatingBg dark />
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center cta-content">
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold/60 mb-6">
          {t("cta.label")}
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          {t("cta.title1")}{" "}
          <span className="text-gold">{t("cta.title2")}</span>?
        </h2>

        <p className="text-white/40 text-base mb-10 max-w-md mx-auto">
          {t("cta.sub")}
        </p>

        <a
          href={`tel:${TODO_PHONE}`}
          className="inline-flex items-center gap-3 mb-10 group"
        >
          <span className="w-12 h-12 rounded-full border-2 border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold/10 transition-colors duration-300">
            <Phone size={20} />
          </span>
          <span className="text-2xl md:text-3xl font-bold text-gold font-serif">
            {TODO_PHONE_DISPLAY}
          </span>
        </a>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${TODO_PHONE}`}
            className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full text-[15px] bg-gold text-charcoal hover:brightness-110 transition-all duration-300"
          >
            <Phone size={15} /> {t("cta.call")}
          </a>
          <a
            href="#oficinas"
            className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full text-[15px] text-white/50 border border-white/10 hover:text-white hover:border-white/25 transition-all duration-300"
          >
            <MapPin size={15} /> {t("cta.offices")}
          </a>
        </div>

        <p className="text-white/15 text-xs mt-10">{t("cta.disclaimer")}</p>
      </div>
    </section>
  );
}
