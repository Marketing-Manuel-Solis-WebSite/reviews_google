"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Stars({
  count = 5,
  size = 14,
}: {
  count?: number;
  size?: number;
}) {
  const { lang } = useLanguage();
  const label =
    lang === "en"
      ? `${count} out of 5 stars`
      : `${count} de 5 estrellas`;

  return (
    <div className="flex gap-0.5" aria-label={label}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={size} className="fill-gold text-gold" />
      ))}
    </div>
  );
}
