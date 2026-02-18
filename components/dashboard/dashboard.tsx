"use client";

import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { DashboardHeader } from "./dashboard-header";
import { PortfolioMetrics } from "./portfolio-metrics/portfolio-metrics";
import { CollectionStatus } from "./collection-status";
import { UpcomingExpirations } from "./upcoming-expirations";
import { UnitList } from "./unit-list";
import { PendingActions } from "./pending-actions";
import { useUnitHighlight } from "@/hooks/use-unit-highlight";

type DashboardProps = {
  className?: string;
};

export function Dashboard({ className }: DashboardProps) {
  const { highlightedUnitId, handleActionClick, handleHighlightHandled } =
    useUnitHighlight();

  return (
    <div className={cn("grid grid-cols-12 gap-6", className)}>
      <DashboardHeader className="col-span-full" />
      <Separator className="col-span-full my-2" />
      <PortfolioMetrics />
      <CollectionStatus className="col-span-full" />
      <PendingActions
        id="pending-actions"
        className="col-span-full"
        onActionClick={handleActionClick}
      />
      <UpcomingExpirations
        className="col-span-full"
        onExpirationClick={handleActionClick}
      />
      <UnitList
        className="col-span-full"
        highlightedUnitId={highlightedUnitId}
        onHighlightHandled={handleHighlightHandled}
      />
    </div>
  );
}
