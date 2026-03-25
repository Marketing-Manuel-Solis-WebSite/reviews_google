"use client";

import { Phone, Star, ArrowUpRight, MapPin, ExternalLink } from "lucide-react";
import {
  SITE_NAME,
  PHONE,
  PHONE_DISPLAY,
  MAIN_SITE_URL,
  SERVICES,
} from "@/content/constants";
import { OFFICES } from "@/content/offices";
import { useLanguage, type Lang } from "@/lib/language-context";
import { FloatingBg } from "@/components/ui/FloatingBg";

function ServiceName({ svc, lang }: { svc: (typeof SERVICES)[number]; lang: Lang }) {
  return lang === "en" ? svc.en : svc.es;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang, t } = useLanguage();

  const houstonOffices = OFFICES.filter((o) => o.region === "houston");
  const texasOffices = OFFICES.filter((o) => o.region === "texas");
  const nationalOffices = OFFICES.filter((o) => o.region === "national");

  return (
    <footer className="relative bg-navy overflow-hidden">
      <FloatingBg dark />

      {/* Top gold accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-10">

        {/* ── CTA Banner ── */}
        <div className="review-card-3d !bg-gradient-to-br !from-[#152e4a] !to-[#0d1f33] rounded-2xl p-8 md:p-10 mb-14 border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
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
              href={MAIN_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-gold/10 border border-gold/20 hover:bg-gold/15 transition-all duration-300 group"
            >
              <span className="w-11 h-11 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                <ArrowUpRight size={18} />
              </span>
              <div>
                <p className="text-gold font-bold text-base font-serif">
                  {t("footer.visitSite")}
                </p>
                <p className="text-white/30 text-[10px] uppercase tracking-wider">
                  manuelsolis.com
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* ── Mega Footer Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-14">

          {/* Col 1: Navigation + Contact */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/50 mb-4">
              {t("footer.nav")}
            </p>
            <div className="flex flex-col gap-2.5 mb-6">
              {[
                { label: t("nav.reviews"), href: "#reviews" },
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

            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/50 mb-3">
              {t("footer.contact")}
            </p>
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors mb-1.5"
            >
              <Phone size={14} /> {PHONE_DISPLAY}
            </a>
            <p className="text-white/25 text-xs">{t("offices.24hrs")}</p>
          </div>

          {/* Col 2: Services → manuelsolis.com */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/50 mb-4">
              {t("footer.services")}
            </p>
            <div className="flex flex-col gap-2">
              {SERVICES.map((svc) => (
                <a
                  key={svc.key}
                  href={`${MAIN_SITE_URL}/${lang}/servicios/${svc.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 text-[13px] hover:text-gold transition-colors duration-300 flex items-center gap-1 group"
                >
                  <ServiceName svc={svc} lang={lang} />
                  <ExternalLink
                    size={9}
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: All Offices */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/50 mb-4">
              {t("offices.title")}
            </p>

            {/* Houston */}
            <p className="text-[9px] font-semibold tracking-wider uppercase text-white/20 mb-2 mt-0">
              {t("offices.houston")}
            </p>
            <div className="flex flex-col gap-1.5 mb-4">
              {houstonOffices.map((o) => (
                <a
                  key={o.id}
                  href={`${MAIN_SITE_URL}/${lang}/oficinas/${o.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/35 text-[12px] hover:text-gold transition-colors flex items-center gap-1"
                >
                  <MapPin size={8} className="shrink-0" />
                  {o.name}
                </a>
              ))}
            </div>

            {/* Texas */}
            <p className="text-[9px] font-semibold tracking-wider uppercase text-white/20 mb-2">
              {t("offices.texas")}
            </p>
            <div className="flex flex-col gap-1.5 mb-4">
              {texasOffices.map((o) => (
                <a
                  key={o.id}
                  href={`${MAIN_SITE_URL}/${lang}/oficinas/${o.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/35 text-[12px] hover:text-gold transition-colors flex items-center gap-1"
                >
                  <MapPin size={8} className="shrink-0" />
                  {o.name}
                </a>
              ))}
            </div>

            {/* National */}
            <p className="text-[9px] font-semibold tracking-wider uppercase text-white/20 mb-2">
              {t("offices.national")}
            </p>
            <div className="flex flex-col gap-1.5">
              {nationalOffices.map((o) => (
                <a
                  key={o.id}
                  href={`${MAIN_SITE_URL}/${lang}/oficinas/${o.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/35 text-[12px] hover:text-gold transition-colors flex items-center gap-1"
                >
                  <MapPin size={8} className="shrink-0" />
                  {o.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Trust + Social */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/50 mb-4">
              {t("reviews.label")}
            </p>
            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5 mb-6">
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

            <a
              href={MAIN_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-6 text-gold/60 hover:text-gold text-[11px] font-medium transition-colors"
            >
              {t("footer.mainSite")} <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-[11px]">
              &copy; {currentYear} {SITE_NAME}. {t("footer.rights")}
            </p>
            <p className="text-white/15 text-[10px] text-center md:text-right max-w-lg">
              {t("footer.disclaimer")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
