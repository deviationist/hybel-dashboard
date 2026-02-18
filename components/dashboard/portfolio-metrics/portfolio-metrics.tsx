import { type PortfolioMetrics } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";
import { MetricCard } from "./metric-card";
import { MetricCardSkeleton } from "./metric-card-skeleton";
import { AlertCircle, Building2, TrendingUp, Users } from "lucide-react";
import { Currency } from "@/components/currency";

export function PortfolioMetrics() {
  const columnSpanClass = "col-span-full sm:col-span-6 lg:col-span-3";
  const { data, isFetching } = useQuery<PortfolioMetrics>({
    queryKey: ["dashboard", "portfolio", "metrics"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard/portfolio/metrics");
      if (!response.ok) throw new Error("Failed to fetch portfolio metrics");
      return await response.json();
    },
  });
  if (isFetching) {
    return Array.from({ length: 4 }).map((_, i) => (
      <MetricCardSkeleton key={i} className={columnSpanClass} />
    ));
  }
  if (!data) {
    return <>No data</>; // TODO: Display error dialog
  }
  return (
    <>
      <MetricCard
        className={columnSpanClass}
        label="Total Portfolio"
        value={data.unitCount.toString()}
        subtitle={`${data.occupiedCount} occupied, ${data.unitCount - data.occupiedCount} vacant`}
        icon={{
          component: Building2,
          colorClass: "text-indigo-600 dark:text-indigo-400",
          bgClass: "bg-indigo-50 dark:bg-indigo-950",
        }}
      />
      <MetricCard
        className={columnSpanClass}
        label="Occupancy Rate"
        value={`${data.occupancyRate.toString()}%`}
        subtitle={`${data.occupiedCount} out of ${data.unitCount} units`}
        icon={{
          component: Users,
          colorClass: "text-emerald-600 dark:text-emerald-400",
          bgClass: "bg-emerald-50 dark:bg-emerald-950",
        }}
      />
      <MetricCard
        className={columnSpanClass}
        label="Monthly Revenue"
        subtitle={`Across ${data.occupiedCount} active leases`}
        icon={{
          component: TrendingUp,
          colorClass: "text-amber-600 dark:text-amber-400",
          bgClass: "bg-amber-50 dark:bg-amber-950",
        }}
      >
        <Currency {...data.monthlyRevenue} />
      </MetricCard>
      <MetricCard
        className={columnSpanClass}
        label="Pending Actions"
        value={data.pendingActions.amount.toString()}
        subtitle={`${data.pendingActions.overduePayments} overdue, ${data.pendingActions.pendingPayments} pending, ${data.pendingActions.vacantUnits} vacant`}
        onClick={() =>
          document
            .getElementById("pending-actions")
            ?.scrollIntoView({ behavior: "smooth", block: "center" })
        }
        icon={{
          component: AlertCircle,
          colorClass:
            data.pendingActions.overduePayments > 0
              ? "text-rose-600 dark:text-rose-400"
              : "text-muted-foreground",
          bgClass:
            data.pendingActions.overduePayments > 0
              ? "bg-rose-50 dark:bg-rose-950"
              : "bg-muted",
        }}
      />
    </>
  );
}
