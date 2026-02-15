"use client";

import { useQuery } from "@tanstack/react-query";
import { type DashboardStats } from "@/types/dashboard/dashboard-stats";
import { MetricCard, MetricCardSkeleton } from "./metric-card";
import { AlertCircle, Building2, TrendingUp, Users } from "lucide-react";
import { formatAmountWithUnit } from "@/lib/currency";

export function DashboardStats() {
  const { data } = useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/stats');
      if (!response.ok) throw new Error('Failed to fetch DashboardStats');
      return await response.json();
    },
  });
  if (!data) {
    return (
      <>
        <MetricCardSkeleton className="col-span-6" />
        <MetricCardSkeleton className="col-span-6" />
        <MetricCardSkeleton className="col-span-6" />
        <MetricCardSkeleton className="col-span-6" />
      </>
    );
  }
  return (
    <>
      <MetricCard 
        className="col-span-6"
        label="Total Portfolio" 
        value={data.unitCount.toString()} 
        icon={{ component: Building2, colorClass: "text-indigo-600", bgClass: "bg-indigo-50" }}
      />
      <MetricCard 
        className="col-span-6"
        label="Occupancy Rate" 
        value={`${data.occupancyRate.toString()}%`} 
        icon={{ component: Users, colorClass: "text-emerald-600", bgClass: "bg-emerald-50" }}
      />
      <MetricCard
        className="col-span-6"
        label="Monthly Revenue" 
        value={formatAmountWithUnit(data.monthlyRevenue)} 
        icon={{ component: TrendingUp, colorClass: "text-amber-600", bgClass: "bg-amber-50" }}
      />
      <MetricCard 
        className="col-span-6"
        label="Pending Actions" 
        value={data.pendingActions.amount.toString()} 
        icon={{
          component: AlertCircle,
          colorClass: data.pendingActions.overduePayments > 0 ? "text-rose-600" : "text-slate-600",
          bgClass: data.pendingActions.overduePayments > 0 ? "bg-rose-50" : "bg-slate-50"
        }}
      />
    </>
  );
}