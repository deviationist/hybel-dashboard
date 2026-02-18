import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Currency } from "../currency";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusDot } from "./status-dot";
import { formatDate } from "@/lib/date";
import { useLocale } from "@/hooks/use-locale";
import { useCollectionStatus } from "@/hooks/use-collection-status";

type CollectionStatusProps = {
  className?: string;
};

export function CollectionStatus({ className }: CollectionStatusProps) {
  const locale = useLocale();
  const { data, isFetching, percentages } = useCollectionStatus();

  if (isFetching) {
    return (
      <div className={className}>
        <Card
          className={className}
          aria-busy="true"
          aria-label="Loading metric"
        >
          <CardHeader className="pb-3">
            <Skeleton className="h-4 max-w-1/2" aria-hidden="true" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-7" aria-hidden="true" />
            <Skeleton className="h-4 max-w-1/3" aria-hidden="true" />
          </CardContent>
        </Card>
      </div>
    );
  }
  if (!data || !percentages) {
    return <>No data</>; // TODO: Display error dialog
  }
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="font-medium text-muted-foreground">
          Collection Status — {formatDate(data.month, locale, "MMMM yyyy")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          className="flex h-7 overflow-hidden rounded-lg bg-muted"
          role="img"
          aria-label={`Collection progress: paid ${Math.round(percentages.paid)}%, pending ${Math.round(percentages.pending)}%, overdue ${Math.round(percentages.overdue)}%`}
        >
          <div
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
            style={{ width: `${percentages.paid}%` }}
          />
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
            style={{ width: `${percentages.pending}%` }}
          />
          <div
            className="bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
            style={{ width: `${percentages.overdue}%` }}
          />
        </div>
        <div className="flex flex-wrap gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <StatusDot className="bg-emerald-500 shadow-emerald-500/40" />
            Paid <Currency {...data.paidAmount} />
          </span>
          <span className="flex items-center gap-1.5">
            <StatusDot className="bg-amber-500 shadow-amber-500/40" />
            Pending <Currency {...data.pendingAmount} />
          </span>
          <span className="flex items-center gap-1.5">
            <StatusDot className="bg-red-500 shadow-red-500/40" />
            Overdue <Currency {...data.overdueAmount} />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
