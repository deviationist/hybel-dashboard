"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatAddressShort } from "@/lib/address";
import { type PendingAction } from "@/types/dashboard";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemMedia,
} from "@/components/ui/item";
import { AlertTriangle, Calendar, Home } from "lucide-react";

type PendingActionsProps = {
  id?: string;
  className?: string;
  onActionClick: (unitId: string) => void;
};

const actionIconMap = {
  overdue_payment: AlertTriangle,
  expiring_contract: Calendar,
  vacant_unit: Home,
} as const;

const severityConfig = {
  high: "text-red-600",
  medium: "text-amber-600",
} as const;

export function PendingActions({
  id,
  className,
  onActionClick,
}: PendingActionsProps) {
  const { data, isFetching } = useQuery<PendingAction[]>({
    queryKey: ["dashboard", "portfolio", "pending-actions"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard/portfolio/pending-actions");
      if (!response.ok) throw new Error("Failed to fetch pending actions");
      return await response.json();
    },
  });

  return (
    <div id={id} className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium text-muted-foreground">
            Pending Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isFetching ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !data ? (
            <p className="p-4 text-sm text-muted-foreground">No data</p>
          ) : data.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">
              No pending actions
            </p>
          ) : (
            <ItemGroup>
              {data.map((action, index) => {
                const Icon = actionIconMap[action.type];
                return (
                  <div key={action.id}>
                    {index > 0 && <ItemSeparator />}
                    <Item
                      className="cursor-pointer hover:bg-accent/50"
                      onClick={() => onActionClick(action.unitId)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onActionClick(action.unitId);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`${formatAddressShort(action.address)}: ${action.description}`}
                    >
                      <ItemMedia>
                        <Icon
                          className={cn(
                            "size-5",
                            severityConfig[action.severity],
                          )}
                        />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>
                          {formatAddressShort(action.address)}
                        </ItemTitle>
                        <ItemDescription>{action.description}</ItemDescription>
                      </ItemContent>
                    </Item>
                  </div>
                );
              })}
            </ItemGroup>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
