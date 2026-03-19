"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { OFFICES } from "@/content/offices";
import { REVIEWS } from "@/content/reviews";
import { TODO_PHONE_DISPLAY, TODO_PHONE } from "@/content/constants";
import type { OfficeRegion } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import { FloatingBg } from "@/components/ui/FloatingBg";

interface RegionDef {
  key: OfficeRegion;
  labelKey: string;
  mapZoom: number;
}

const REGIONS: RegionDef[] = [
  { key: "houston", labelKey: "offices.houston", mapZoom: 10 },
  { key: "texas", labelKey: "offices.texas", mapZoom: 6 },
  { key: "national", labelKey: "offices.national", mapZoom: 4 },
];

export function OfficeDirectory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".office-heading", {
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
      gsap.from(".office-region", {
        scrollTrigger: {
          trigger: ".office-grid",
          start: "top 85%",
          once: true,
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="oficinas"
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-ivory"
    >
      <FloatingBg />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="office-heading text-center mb-12">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
            {t("offices.label")}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">
            {t("offices.title")}
          </h2>
          <a
            href={`tel:${TODO_PHONE}`}
            className="inline-flex items-center gap-2 text-gold font-semibold text-lg hover:text-gold-light transition-colors"
          >
            <Phone size={18} />
            {TODO_PHONE_DISPLAY}
          </a>
        </div>

        <div className="office-grid space-y-14">
          {REGIONS.map((region) => {
            const offices = OFFICES.filter((o) => o.region === region.key);
            if (offices.length === 0) return null;

            const centerLat =
              offices.reduce((s, o) => s + o.lat, 0) / offices.length;
            const centerLng =
              offices.reduce((s, o) => s + o.lng, 0) / offices.length;
            const mapSrc = `https://maps.google.com/maps?q=${centerLat.toFixed(4)},${centerLng.toFixed(4)}&t=&z=${region.mapZoom}&ie=UTF8&iwloc=B&output=embed`;

            return (
              <div key={region.key} className="office-region">
                {/* Region header */}
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="text-sm font-semibold text-navy/70 uppercase tracking-wider whitespace-nowrap">
                    {t(region.labelKey)}
                  </h3>
                  <div className="flex-1 h-px bg-border/50" />
                  <span className="text-xs text-muted/40 whitespace-nowrap">
                    {offices.length}{" "}
                    {offices.length === 1
                      ? t("offices.one")
                      : t("offices.many")}
                  </span>
                </div>

                {/* Real Google Maps embed */}
                <div className="rounded-xl overflow-hidden mb-6 shadow-[0_4px_24px_rgba(16,38,63,0.08)] border border-border/30">
                  <iframe
                    src={mapSrc}
                    className="w-full h-52 md:h-64"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${t(region.labelKey)} map`}
                    style={{ border: 0 }}
                  />
                </div>

                {/* Office cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {offices.map((office) => {
                    const reviewCount = REVIEWS.filter(
                      (r) => r.officeId === office.id
                    ).length;
                    const mapsUrl = `https://www.google.com/maps?q=${office.lat},${office.lng}`;
                    return (
                      <div
                        key={office.id}
                        className="bg-white rounded-xl p-4 border border-border/40 hover:border-gold/20 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(16,38,63,0.06)] transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-navy font-semibold text-sm">
                            {office.name}
                          </h4>
                          <MapPin
                            size={14}
                            className="text-gold/40 group-hover:text-gold transition-colors shrink-0 mt-0.5"
                          />
                        </div>
                        <p className="text-muted/50 text-xs leading-relaxed mb-2.5">
                          {office.address}
                        </p>
                        <a
                          href={`tel:${office.phone}`}
                          className="flex items-center gap-1.5 text-xs text-navy/60 hover:text-gold transition-colors mb-1.5"
                        >
                          <Phone size={10} className="shrink-0" />
                          {office.phone}
                        </a>
                        <div className="flex items-center gap-1.5 text-xs text-muted/40 mb-3">
                          <Clock size={10} className="shrink-0" />
                          {office.hours}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border/30">
                          {reviewCount > 0 ? (
                            <a
                              href="#reviews"
                              className="text-[11px] font-medium text-navy/50 hover:text-navy flex items-center gap-1 transition-colors"
                            >
                              {t("offices.seeReviews")}{" "}
                              <ArrowRight size={10} />
                            </a>
                          ) : (
                            <span />
                          )}
                          <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-medium text-muted/40 hover:text-gold flex items-center gap-1 transition-colors"
                          >
                            {t("offices.seeMap")}{" "}
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
