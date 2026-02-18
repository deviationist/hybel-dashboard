import { type Locale, differenceInCalendarDays, format, parseISO } from "date-fns";
import { nb } from "date-fns/locale";

const localeMap: Record<string, Locale> = {
  "nb-NO": nb,
  nb: nb,
};

function resolveLocale(locale: string): Locale {
  return localeMap[locale] ?? nb;
}

export function daysUntil(date: string | Date): number | null {
  if (!date) return null;
  const parsed = typeof date === "string" ? parseISO(date) : date;
  return differenceInCalendarDays(parsed, new Date());
}

export function formatDate(
  date: string | Date,
  locale: string,
  formatStr: string = "d. MMMM yyyy",
): string {
  const parsed = typeof date === "string" ? parseISO(date) : date;
  return format(parsed, formatStr, { locale: resolveLocale(locale) });
}
