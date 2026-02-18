export function formatCurrency(
  amount: number,
  currency: string,
  locale: string,
  options?: Omit<Intl.NumberFormatOptions, "style" | "currency">,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    ...options,
  }).format(amount);
}
