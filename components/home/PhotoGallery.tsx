"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

const IMAGES = [
  { src: "/bertha.png",    name: "Bertha Isabel" },
  { src: "/edgar.png",     name: "Edgar Guadalupe" },
  { src: "/juan.png",      name: "Juan Ramón" },
  { src: "/margarita.png", name: "Margarita Reyes" },
  { src: "/marina.png",    name: "Marina Salgado" },
  { src: "/monseraf.png",  name: "Monseraf Meléndez" },
  { src: "/nidia.png",     name: "Nidia Elena" },
  { src: "/pedro.png",     name: "Pedro Rogel" },
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
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-4">
          {t("gallery.title")}
        </h2>
        <p className="text-muted text-sm max-w-md mx-auto">
          {t("gallery.subtitle")}
        </p>
      </div>

      {/* Grid uniforme — todas iguales */}
      <div className="gallery-grid max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="gallery-item relative group overflow-hidden rounded-2xl aspect-square"
          >
            <img
              src={img.src}
              alt={img.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              draggable={false}
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
