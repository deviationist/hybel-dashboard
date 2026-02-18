import { useLocale } from "@/hooks/use-locale";
import { formatCurrency } from "@/lib/currency";
import { CurrencyAmount } from "@/types/common";

type CurrencyProps = CurrencyAmount & {
  options?: Omit<Intl.NumberFormatOptions, "style" | "currency">;
};

export function Currency({ amount, currency, options }: CurrencyProps) {
  const locale = useLocale();
  return <>{formatCurrency(amount, currency, locale, options)}</>;
}
