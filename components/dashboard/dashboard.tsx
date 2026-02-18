"use client";

import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { DashboardHeader } from "./dashboard-header";
import { PortfolioMetrics } from "./portfolio-metrics/portfolio-metrics";
import { CollectionStatus } from "./collection-status";
import { UpcomingExpirations } from "./upcoming-expirations";
import { UnitList } from "./unit-list";

type DashboardProps = {
  className?: string;
};

export function Dashboard({ className }: DashboardProps) {
  return (
    <div className={cn(
      "grid grid-cols-12 gap-6",
      className
    )}>
      <DashboardHeader className="col-span-full" />
      <Separator className="col-span-full my-2" />
      <PortfolioMetrics />
      <CollectionStatus className="col-span-full" />
      <UpcomingExpirations className="col-span-full" />
      <UnitList className="col-span-full" />
    </div>
  );
}