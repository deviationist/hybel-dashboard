import { useLocale } from "@/hooks/use-locale";
import { formatDate } from "@/lib/date";

type FormattedDateProps = {
  date: string | Date;
  format?: string;
};

export function FormattedDate({ date, format }: FormattedDateProps) {
  const locale = useLocale();
  return <>{formatDate(date, locale, format)}</>;
}
