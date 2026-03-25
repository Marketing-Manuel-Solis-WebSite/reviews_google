import type { Lang } from "@/lib/language-context";

const DATE_LABELS: Record<string, Record<Lang, string>> = {
  today:    { es: "Hoy",               en: "Today" },
  "1d":     { es: "Hace 1 día",        en: "1 day ago" },
  days:     { es: "Hace %n días",      en: "%n days ago" },
  "1w":     { es: "Hace 1 semana",     en: "1 week ago" },
  weeks:    { es: "Hace %n semanas",   en: "%n weeks ago" },
  "1m":     { es: "Hace 1 mes",        en: "1 month ago" },
  months:   { es: "Hace %n meses",     en: "%n months ago" },
  "1y":     { es: "Hace 1 año",        en: "1 year ago" },
  years:    { es: "Hace %n años",      en: "%n years ago" },
};

export function formatRelativeDate(dateString: string, lang: Lang = "es"): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return DATE_LABELS.today[lang];
  if (diffDays === 1) return DATE_LABELS["1d"][lang];
  if (diffDays < 7) return DATE_LABELS.days[lang].replace("%n", String(diffDays));
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1
      ? DATE_LABELS["1w"][lang]
      : DATE_LABELS.weeks[lang].replace("%n", String(weeks));
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1
      ? DATE_LABELS["1m"][lang]
      : DATE_LABELS.months[lang].replace("%n", String(months));
  }
  const years = Math.floor(diffDays / 365);
  return years === 1
    ? DATE_LABELS["1y"][lang]
    : DATE_LABELS.years[lang].replace("%n", String(years));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
