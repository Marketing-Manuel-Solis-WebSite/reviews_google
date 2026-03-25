"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

const IMAGES = [
  { src: "/bertha.png",    name: "Bertha Isabel",       alt: "Cliente Bertha Isabel — familia reunida por abogado de inmigración Manuel Solis" },
  { src: "/edgar.png",     name: "Edgar Guadalupe",     alt: "Cliente Edgar Guadalupe — caso de inmigración exitoso con Manuel Solis Law Firm" },
  { src: "/juan.png",      name: "Juan Ramón",          alt: "Cliente Juan Ramón — residencia obtenida con el abogado Manuel Solis" },
  { src: "/margarita.png", name: "Margarita Reyes",     alt: "Cliente Margarita Reyes — trámite migratorio exitoso con Manuel Solis" },
  { src: "/marina.png",    name: "Marina Salgado",      alt: "Cliente Marina Salgado — familia reunida gracias a Manuel Solis Law Firm" },
  { src: "/monseraf.png",  name: "Monseraf Meléndez",   alt: "Cliente Monseraf Meléndez — caso de inmigración con abogado Manuel Solis" },
  { src: "/nidia.png",     name: "Nidia Elena",         alt: "Cliente Nidia Elena — proceso migratorio exitoso con Manuel Solis" },
  { src: "/pedro.png",     name: "Pedro Rogel",         alt: "Cliente Pedro Rogel — green card obtenida con Manuel Solis Law Firm" },
];

export function PhotoGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".gallery-heading", {
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
      gsap.from(".gallery-item", {
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 85%",
          once: true,
        },
        y: 50,
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-ivory overflow-hidden"
    >
      {/* Heading */}
      <div className="gallery-heading text-center mb-14 px-6">
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
          {t("gallery.label")}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4 max-w-2xl mx-auto">
          {t("gallery.title")}
        </h2>
        <p className="text-muted text-sm max-w-lg mx-auto">
          {t("gallery.subtitle")}
        </p>
      </div>

      {/* Grid */}
      <div className="gallery-grid max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="gallery-item relative group overflow-hidden rounded-2xl aspect-square"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              draggable={false}
              loading="lazy"
              quality={80}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <p className="text-white text-sm font-semibold tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {img.name}
              </p>
            </div>
            <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/30 transition-colors duration-500 rounded-2xl" />
          </div>
        ))}
      </div>
    </section>
  );
}
