import { differenceInCalendarDays } from "date-fns";

export function daysUntil(date: string | Date): number | null {
  if (!date) return null;
  return differenceInCalendarDays(new Date(date), new Date());
}