import {
  type UnitFilters,
  type UnitStatus,
  type PaymentStatus,
  type UnitSortField,
  type SortDirection,
} from "@/types/unit";

function toggleArrayItem<T>(arr: T[] | undefined, item: T): T[] | undefined {
  const current = arr ?? [];
  const next = current.includes(item)
    ? current.filter((v) => v !== item)
    : [...current, item];
  return next.length > 0 ? next : undefined;
}

export function useFilterBarActions(
  filters: UnitFilters,
  onChange: (filters: UnitFilters) => void,
) {
  const hasFilters =
    (filters.status && filters.status.length > 0) ||
    (filters.paymentStatus && filters.paymentStatus.length > 0) ||
    !!filters.expiringWithinDays;

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

  return { hasFilters, toggleStatus, togglePayment, toggleExpiring, handleSort, clearAll };
}
