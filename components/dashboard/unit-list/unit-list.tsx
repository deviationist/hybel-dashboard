"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ItemGroup, ItemSeparator } from "@/components/ui/item";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useUnitFilters } from "@/hooks/use-unit-filters";
import { useUnits } from "@/hooks/use-units";
import { useExpandedUnit } from "@/hooks/use-expanded-unit";
import { FilterBar } from "./filter-bar";
import { UnitRow } from "./unit-row";

type UnitListProps = {
  className?: string;
  highlightedUnitId?: string | null;
  onHighlightHandled?: () => void;
};

export function UnitList({
  className,
  highlightedUnitId,
  onHighlightHandled,
}: UnitListProps) {
  const [filters, setFilters] = useUnitFilters();
  const { data, isFetching, isRefetching } = useUnits(filters);
  const { expandedId, handleToggle } = useExpandedUnit(
    highlightedUnitId,
    onHighlightHandled,
  );

  // Initial load — no data yet
  if (!data && isFetching) {
    return (
      <Card className={className}>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return <>No data</>;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <CardTitle className="font-medium text-muted-foreground">
            Rental Units (
            <span aria-live="polite" aria-atomic="true">
              {data.length}
            </span>
            )
          </CardTitle>
          {isRefetching && (
            <Loader2
              className="size-4 animate-spin text-muted-foreground"
              aria-label="Loading"
            />
          )}
        </div>
      </CardHeader>
      <FilterBar filters={filters} onChange={setFilters} className="mb-2" />
      <Separator />
      <CardContent
        className={cn(
          "p-0 transition-opacity duration-200",
          isRefetching && "opacity-50",
        )}
      >
        {data.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No units match the current filters.
          </p>
        ) : (
          <ItemGroup>
            {data.map((unit, index) => (
              <div key={unit.id}>
                {index > 0 && <ItemSeparator />}
                <UnitRow
                  unit={unit}
                  isExpanded={expandedId === unit.id}
                  isHighlighted={highlightedUnitId === unit.id}
                  onToggle={() => handleToggle(unit.id)}
                />
              </div>
            ))}
          </ItemGroup>
        )}
      </CardContent>
    </Card>
  );
}
