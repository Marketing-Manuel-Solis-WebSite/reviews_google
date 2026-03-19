import type { Stat } from "@/lib/types";

/* ═══════════════════════════════════════════════════
   TODO: Replace these with real values before launch
   ═══════════════════════════════════════════════════ */

export const TODO_PHONE = "+1-888-676-1238";
export const TODO_PHONE_DISPLAY = "1-888-676-1238";
export const TODO_CANONICAL_URL = "https://example.com";

export const TODO_SOCIAL = {
  facebook: "",
  instagram: "",
  youtube: "",
  tiktok: "",
} as const;

/* ═══════════════════════════════════════════════════
   Site constants
   ═══════════════════════════════════════════════════ */

export const SITE_NAME = "Manuel Solis Law Firm";
export const SITE_TAGLINE = "La confianza no se promete. Se comprueba.";

export const STATS: Stat[] = [
  { value: 35, suffix: "+", label: "Años de Experiencia" },
  { value: 15, suffix: "+", label: "Oficinas en EE.UU." },
  { value: 50000, suffix: "+", label: "Familias Reunidas", display: "50,000" },
  { value: 4.8, suffix: "", label: "Estrellas en Google", decimal: true },
];
