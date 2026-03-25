"use client";

import { useLanguage } from "@/lib/language-context";

export function SkipToContent() {
  const { lang } = useLanguage();
  const label = lang === "en" ? "Skip to content" : "Saltar al contenido";

  return (
    <a href="#main-content" className="skip-to-content">
      {label}
    </a>
  );
}
