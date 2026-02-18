"use client";

import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { DashboardHeader } from "./dashboard-header";
import { PortfolioMetrics } from "./portfolio-metrics/portfolio-metrics";
import { CollectionStatus } from "./collection-status";
import { UpcomingExpirations } from "./upcoming-expirations";
import { UnitList } from "./unit-list";
import { PendingActions } from "./pending-actions";
import { useCallback, useState } from "react";

type DashboardProps = {
  className?: string;
};

export function Dashboard({ className }: DashboardProps) {
  const [highlightedUnitId, setHighlightedUnitId] = useState<string | null>(
    null,
  );

  const handleActionClick = useCallback((unitId: string) => {
    setHighlightedUnitId(unitId);
  }, []);

  const handleHighlightHandled = useCallback(() => {
    setHighlightedUnitId(null);
  }, []);

  return (
    <div className={cn("grid grid-cols-12 gap-6", className)}>
      <DashboardHeader className="col-span-full" />
      <Separator className="col-span-full my-2" />
      <PortfolioMetrics />
      <CollectionStatus className="col-span-full" />
      <UpcomingExpirations
        className="col-span-full"
        onExpirationClick={handleActionClick}
      />
      <PendingActions
        id="pending-actions"
        className="col-span-full"
        onActionClick={handleActionClick}
      />
      <UnitList
        className="col-span-full"
        highlightedUnitId={highlightedUnitId}
        onHighlightHandled={handleHighlightHandled}
      />
    </div>
  );
}
