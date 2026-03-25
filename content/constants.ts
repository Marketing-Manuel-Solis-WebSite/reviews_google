import type { Stat } from "@/lib/types";

/* ═══════════════════════════════════════════════════
   Site-wide constants
   ═══════════════════════════════════════════════════ */

export const SITE_NAME = "Manuel Solis Law Firm";
export const SITE_TAGLINE = "La confianza no se promete. Se comprueba.";

export const MAIN_SITE_URL = "https://www.manuelsolis.com";
export const CANONICAL_URL = "https://reviews.manuelsolis.com";

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
  { key: "residencia", es: "Residencia Permanente", en: "Permanent Residency", path: "/residencia-permanente" },
  { key: "ciudadania", es: "Ciudadanía Americana", en: "U.S. Citizenship", path: "/ciudadania" },
  { key: "greencard", es: "Green Card", en: "Green Card", path: "/green-card" },
  { key: "visas", es: "Visas de Trabajo", en: "Work Visas", path: "/visas-de-trabajo" },
  { key: "familiar", es: "Peticiones Familiares", en: "Family Petitions", path: "/peticiones-familiares" },
  { key: "asilo", es: "Asilo y Refugio", en: "Asylum & Refuge", path: "/asilo" },
  { key: "daca", es: "DACA / Dreamers", en: "DACA / Dreamers", path: "/daca" },
  { key: "deportacion", es: "Defensa de Deportación", en: "Deportation Defense", path: "/defensa-deportacion" },
  { key: "consular", es: "Procesos Consulares", en: "Consular Processing", path: "/procesos-consulares" },
  { key: "permisos", es: "Permisos de Trabajo", en: "Work Permits", path: "/permisos-de-trabajo" },
] as const;
