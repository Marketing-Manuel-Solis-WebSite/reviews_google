import type { Stat } from "@/lib/types";

/* ═══════════════════════════════════════════════════
   Site-wide constants
   ═══════════════════════════════════════════════════ */

export const SITE_NAME = "Manuel Solis Law Firm";
export const SITE_TAGLINE = "La confianza no se promete. Se comprueba.";

export const MAIN_SITE_URL = "https://www.manuelsolis.com";
export const CANONICAL_URL = "https://manuelsolisreviews.com";

export const PHONE = "+1-888-676-1238";
export const PHONE_DISPLAY = "1-888-676-1238";

export const SOCIAL = {
  facebook: "https://www.facebook.com/abogadomanuelsolis",
  instagram: "https://www.instagram.com/abogadomanuelsolis",
  youtube: "https://www.youtube.com/@abogadomanuelsolis",
  tiktok: "https://www.tiktok.com/@abogadomanuelsolis",
} as const;

export const STATS: Stat[] = [
  { value: 35, suffix: "+", label: "Años de Experiencia" },
  { value: 15, suffix: "+", label: "Oficinas en EE.UU." },
  { value: 50000, suffix: "+", label: "Familias Reunidas", display: "50,000" },
  { value: 4.8, suffix: "", label: "Estrellas en Google", decimal: true },
];

export const SERVICES = [
  { key: "inmigracion", es: "Inmigración", en: "Immigration", slug: "inmigracion" },
  { key: "accidentes", es: "Accidentes", en: "Accidents", slug: "accidentes" },
  { key: "ley-criminal", es: "Ley Criminal", en: "Criminal Law", slug: "ley-criminal" },
  { key: "familia", es: "Familia", en: "Family", slug: "familia" },
  { key: "seguros", es: "Seguros", en: "Insurance", slug: "seguros" },
  { key: "visa-u", es: "Visa U", en: "U Visa", slug: "visa-u" },
  { key: "visa-e2", es: "Visa E-2", en: "E-2 Visa", slug: "visa-e2" },
  { key: "vawa", es: "VAWA", en: "VAWA", slug: "vawa" },
  { key: "defensa-deportacion", es: "Defensa de Deportación", en: "Deportation Defense", slug: "defensa-deportacion" },
  { key: "asilo", es: "Asilo", en: "Asylum", slug: "asilo" },
] as const;
