import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Currency } from "../currency";
import { useQuery } from "@tanstack/react-query";
import { type CollectionStatus } from "@/types/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusDot } from "./status-dot";

type CollectionStatusProps = {
  className?: string;
};

export function CollectionStatus({ className }: CollectionStatusProps) {
  const { data, isFetching } = useQuery<CollectionStatus>({
    queryKey: ["dashboard", "portfolio", "collection-status"],
    queryFn: async () => {
      const response = await fetch(
        "/api/dashboard/portfolio/collection-status",
      );
      if (!response.ok) throw new Error("Failed to fetch collection status");
      return await response.json();
    },
  });
  if (isFetching) {
    return (
      <div className={className}>
        <Card
          className={className}
          aria-busy="true"
          aria-label="Loading metric"
        >
          <CardHeader className="pb-3">
            <Skeleton className="h-4" aria-hidden="true" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-7" aria-hidden="true" />
            <Skeleton className="h-4" aria-hidden="true" />
          </CardContent>
        </Card>
      </div>
    );
  }
  if (!data) {
    return <>No data</>; // TODO: Display error dialog
  }
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="font-medium text-muted-foreground">
          Collection Status — February
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          className="flex h-7 overflow-hidden rounded-lg bg-muted"
          role="img"
          aria-label={`Collection progress: paid ${Math.round((data.paidAmount.amount / data.collectableRent.amount) * 100)}%, pending ${Math.round((data.pendingAmount.amount / data.collectableRent.amount) * 100)}%, overdue ${Math.round((data.overdueAmount.amount / data.collectableRent.amount) * 100)}%`}
        >
          <div
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
            style={{
              width: `${(data.paidAmount.amount / data.collectableRent.amount) * 100}%`,
            }}
          />
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
            style={{
              width: `${(data.pendingAmount.amount / data.collectableRent.amount) * 100}%`,
            }}
          />
          <div
            className="bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
            style={{
              width: `${(data.overdueAmount.amount / data.collectableRent.amount) * 100}%`,
            }}
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
