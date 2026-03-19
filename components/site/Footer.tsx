"use client";

import { Phone, Star, MapPin, ArrowUpRight } from "lucide-react";
import {
  SITE_NAME,
  TODO_PHONE,
  TODO_PHONE_DISPLAY,
} from "@/content/constants";
import { useLanguage } from "@/lib/language-context";
import { FloatingBg } from "@/components/ui/FloatingBg";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="relative bg-navy overflow-hidden">
      <FloatingBg dark />

      {/* Top gold accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* ── Main 3D card section ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-10">
        {/* Big CTA band with 3D effect */}
        <div className="review-card-3d !bg-gradient-to-br !from-[#152e4a] !to-[#0d1f33] rounded-2xl p-8 md:p-10 mb-12 border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
          <div className="grid md:grid-cols-[1fr,auto] gap-8 items-center">
            <div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
                {SITE_NAME}
              </p>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                {t("footer.tagline")}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={12} className="fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-gold text-sm font-semibold">4.8</span>
                <span className="text-white/30 text-xs">{t("reviews.google")}</span>
              </div>
            </div>
            <a
              href={`tel:${TODO_PHONE}`}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-gold/10 border border-gold/20 hover:bg-gold/15 transition-all duration-300 group"
            >
              <span className="w-11 h-11 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                <Phone size={18} />
              </span>
              <div>
                <p className="text-gold font-bold text-lg font-serif">
                  {TODO_PHONE_DISPLAY}
                </p>
                <p className="text-white/30 text-[10px] uppercase tracking-wider">
                  {t("offices.24hrs")}
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* ── Links grid ── */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Nav */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/50 mb-4">
              {t("footer.nav")}
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Reviews", href: "#reviews" },
                { label: t("footer.cases"), href: "#casos" },
                { label: t("nav.offices"), href: "#oficinas" },
                { label: t("nav.contact"), href: "#contacto" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/40 text-sm hover:text-gold transition-colors duration-300 flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight
                    size={10}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Offices quick list */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/50 mb-4">
              {t("nav.offices")}
            </p>
            <div className="flex flex-col gap-2.5">
              {["Houston", "Dallas", "El Paso", "Chicago", "Los Angeles", "Denver"].map(
                (city) => (
                  <span
                    key={city}
                    className="text-white/30 text-sm flex items-center gap-1.5"
                  >
                    <MapPin size={9} className="text-gold/30" />
                    {city}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/50 mb-4">
              {t("footer.contact")}
            </p>
            <a
              href={`tel:${TODO_PHONE}`}
              className="flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors mb-3"
            >
              <Phone size={14} /> {TODO_PHONE_DISPLAY}
            </a>
            <p className="text-white/25 text-xs leading-relaxed">
              {t("offices.24hrs")}
            </p>
          </div>

          {/* Trust badge */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/50 mb-4">
              {t("reviews.label")}
            </p>
            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={11} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-white/60 text-xs font-semibold mb-1">
                4.8 / 5.0
              </p>
              <p className="text-white/25 text-[10px]">
                Google {t("reviews.title")}
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-[11px]">
              &copy; {currentYear} {SITE_NAME}. {t("footer.rights")}
            </p>
            <p className="text-white/15 text-[10px] text-center md:text-right max-w-md">
              {t("footer.disclaimer")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
