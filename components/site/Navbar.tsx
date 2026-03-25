"use client";

import { useState } from "react";
import { Menu, X, Star } from "lucide-react";
import { SITE_NAME } from "@/content/constants";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const NAV_LINKS = [
    { label: t("nav.reviews"), href: "#reviews" },
    { label: t("nav.cases"), href: "#casos" },
    { label: t("nav.offices"), href: "#oficinas" },
    { label: t("nav.contact"), href: "#contacto" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 nav-glass py-3"
        aria-label={lang === "en" ? "Main navigation" : "Navegación principal"}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#inicio"
            className="font-serif text-lg tracking-[0.06em] font-semibold text-navy"
          >
            {SITE_NAME}
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium tracking-wide text-muted hover:text-navy transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            {/* Language toggle */}
            <div className="flex items-center gap-0.5 text-[12px] font-semibold border border-border/50 rounded-full overflow-hidden">
              <button
                onClick={() => setLang("es")}
                className={`px-2.5 py-1.5 transition-all duration-200 ${
                  lang === "es"
                    ? "bg-navy text-white"
                    : "text-muted/50 hover:text-navy"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1.5 transition-all duration-200 ${
                  lang === "en"
                    ? "bg-navy text-white"
                    : "text-muted/50 hover:text-navy"
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="#reviews"
              className="inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-full bg-navy text-white hover:bg-navy-light transition-colors duration-300"
            >
              <Star size={13} />
              {t("hero.cta1")}
            </a>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="flex items-center gap-0.5 text-[11px] font-semibold border border-border/50 rounded-full overflow-hidden">
              <button
                onClick={() => setLang("es")}
                className={`px-2 py-1 transition-all duration-200 ${
                  lang === "es" ? "bg-navy text-white" : "text-muted/50"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 transition-all duration-200 ${
                  lang === "en" ? "bg-navy text-white" : "text-muted/50"
                }`}
              >
                EN
              </button>
            </div>
            <button
              className="text-navy/60 hover:text-navy transition-colors"
              onClick={() => setOpen(true)}
              aria-label={lang === "en" ? "Open menu" : "Abrir menú"}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-ivory flex flex-col items-center justify-center gap-8"
          role="dialog"
          aria-label={lang === "en" ? "Navigation menu" : "Menú de navegación"}
        >
          <button
            className="absolute top-5 right-6 text-navy/40 hover:text-navy transition-colors"
            onClick={() => setOpen(false)}
            aria-label={lang === "en" ? "Close menu" : "Cerrar menú"}
          >
            <X size={22} />
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-xl font-serif font-medium text-navy/70 hover:text-navy transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reviews"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-full bg-navy text-white"
          >
            <Star size={15} />
            {t("hero.cta1")}
          </a>
        </div>
      )}
    </>
  );
}
