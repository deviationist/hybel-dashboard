import { type UnitFilters } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { CalendarClock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterToggle } from "./filter-toggle";
import { SortButton } from "./sort-button";
import { useFilterBarActions } from "@/hooks/use-filter-bar-actions";

type FilterBarProps = {
  className?: string;
  filters: UnitFilters;
  onChange: (filters: UnitFilters) => void;
};

export function FilterBar({ className, filters, onChange }: FilterBarProps) {
  const {
    hasFilters,
    toggleStatus,
    togglePayment,
    toggleExpiring,
    handleSort,
    clearAll,
  } = useFilterBarActions(filters, onChange);

  return (
    <div className={cn("space-y-2 px-6 pb-2", className)}>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-muted-foreground mr-1">
          Status
        </span>
        <FilterToggle
          active={filters.status?.includes("occupied") ?? false}
          onClick={() => toggleStatus("occupied")}
        >
          Occupied
        </FilterToggle>
        <FilterToggle
          active={filters.status?.includes("vacant") ?? false}
          onClick={() => toggleStatus("vacant")}
        >
          Vacant
        </FilterToggle>
        <FilterToggle
          active={filters.status?.includes("maintenance") ?? false}
          onClick={() => toggleStatus("maintenance")}
        >
          Maintenance
        </FilterToggle>

        <span className="text-xs font-medium text-muted-foreground ml-3 mr-1">
          Payment
        </span>
        <FilterToggle
          active={filters.paymentStatus?.includes("paid") ?? false}
          onClick={() => togglePayment("paid")}
        >
          Paid
        </FilterToggle>
        <FilterToggle
          active={filters.paymentStatus?.includes("pending") ?? false}
          onClick={() => togglePayment("pending")}
        >
          Pending
        </FilterToggle>
        <FilterToggle
          active={filters.paymentStatus?.includes("overdue") ?? false}
          onClick={() => togglePayment("overdue")}
        >
          Overdue
        </FilterToggle>

        <span className="text-xs font-medium text-muted-foreground ml-3 mr-1">
          Lease
        </span>
        <FilterToggle
          active={!!filters.expiringWithinDays}
          onClick={toggleExpiring}
        >
          <CalendarClock className="size-3" />
          Expiring soon
        </FilterToggle>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-muted-foreground mr-1">
          Sort by
        </span>
        <SortButton
          label="Address"
          field="address"
          currentSort={filters.sortBy}
          currentDirection={filters.sortDirection}
          onClick={handleSort}
        />
        <SortButton
          label="Rent"
          field="rent"
          currentSort={filters.sortBy}
          currentDirection={filters.sortDirection}
          onClick={handleSort}
        />
        <SortButton
          label="Lease expiry"
          field="leaseExpires"
          currentSort={filters.sortBy}
          currentDirection={filters.sortDirection}
          onClick={handleSort}
        />

        {hasFilters && (
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAll}
            className="ml-auto text-muted-foreground"
          >
            <X className="size-3" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
