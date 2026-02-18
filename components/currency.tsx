import { useLocale } from "@/hooks/use-locale";
import { formatCurrency } from "@/lib/currency";
import { CurrencyAmount } from "@/types/curreny";

type CurrencyProps = CurrencyAmount & {
  options?: Omit<Intl.NumberFormatOptions, "style" | "currency">;
};

export function Currency({ amount, currency = "USD", options }: CurrencyProps) {
  const locale = useLocale();
  return <>{formatCurrency(amount, currency, locale, options)}</>;
}
