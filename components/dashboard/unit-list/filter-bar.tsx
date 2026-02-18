import {
  type UnitFilters,
  type UnitStatus,
  type PaymentStatus,
  type UnitSortField,
  type SortDirection,
} from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CalendarClock, X } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  className?: string;
  filters: UnitFilters;
  onChange: (filters: UnitFilters) => void;
};

function FilterToggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="xs"
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </Button>
  );
}

function SortButton({
  label,
  field,
  currentSort,
  currentDirection,
  onClick,
}: {
  label: string;
  field: UnitSortField;
  currentSort?: UnitSortField;
  currentDirection?: SortDirection;
  onClick: (field: UnitSortField, direction: SortDirection | undefined) => void;
}) {
  const isActive = currentSort === field;

  const handleClick = () => {
    if (!isActive) {
      onClick(field, "asc");
    } else if (currentDirection === "asc") {
      onClick(field, "desc");
    } else {
      onClick(field, undefined);
    }
  };

  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="xs"
      onClick={handleClick}
      aria-pressed={isActive}
      aria-label={`Sort by ${label}${isActive ? `, ${currentDirection === "asc" ? "ascending" : "descending"}` : ""}`}
    >
      <ArrowUpDown className="size-3" />
      {label}
      {isActive && (
        <span className="text-[10px] opacity-70">
          {currentDirection === "asc" ? "A-Z" : "Z-A"}
        </span>
      )}
    </Button>
  );
}

function toggleArrayItem<T>(arr: T[] | undefined, item: T): T[] | undefined {
  const current = arr ?? [];
  const next = current.includes(item)
    ? current.filter((v) => v !== item)
    : [...current, item];
  return next.length > 0 ? next : undefined;
}

export function FilterBar({ className, filters, onChange }: FilterBarProps) {
  const hasFilters =
    (filters.status && filters.status.length > 0) ||
    (filters.paymentStatus && filters.paymentStatus.length > 0) ||
    filters.expiringWithinDays;

  const toggleStatus = (status: UnitStatus) => {
    onChange({ ...filters, status: toggleArrayItem(filters.status, status) });
  };

  const togglePayment = (ps: PaymentStatus) => {
    onChange({
      ...filters,
      paymentStatus: toggleArrayItem(filters.paymentStatus, ps),
    });
  };

  const toggleExpiring = () => {
    onChange({
      ...filters,
      expiringWithinDays: filters.expiringWithinDays ? undefined : 90,
    });
  };

  const handleSort = (
    field: UnitSortField,
    direction: SortDirection | undefined,
  ) => {
    if (direction) {
      onChange({ ...filters, sortBy: field, sortDirection: direction });
    } else {
      onChange({ ...filters, sortBy: undefined, sortDirection: undefined });
    }
  };

  const clearAll = () => {
    onChange({});
  };

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
