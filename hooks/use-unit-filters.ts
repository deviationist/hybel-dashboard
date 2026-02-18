import { useQueryStates, parseAsString, parseAsInteger, parseAsArrayOf } from "nuqs";
import { type UnitFilters } from "@/types/dashboard";

const filterParsers = {
  status: parseAsArrayOf(parseAsString),
  paymentStatus: parseAsArrayOf(parseAsString),
  expiringWithinDays: parseAsInteger,
  sortBy: parseAsString,
  sortDirection: parseAsString,
};

export function useUnitFilters() {
  const [params, setParams] = useQueryStates(filterParsers, {
    urlKeys: {
      status: "status",
      paymentStatus: "payment",
      expiringWithinDays: "expiring",
      sortBy: "sort",
      sortDirection: "dir",
    },
    shallow: true,
    history: "replace",
  });

  const filters: UnitFilters = {
    status: params.status?.length ? (params.status as UnitFilters["status"]) : undefined,
    paymentStatus: params.paymentStatus?.length ? (params.paymentStatus as UnitFilters["paymentStatus"]) : undefined,
    expiringWithinDays: params.expiringWithinDays ?? undefined,
    sortBy: (params.sortBy as UnitFilters["sortBy"]) ?? undefined,
    sortDirection: (params.sortDirection as UnitFilters["sortDirection"]) ?? undefined,
  };

  const setFilters = (next: UnitFilters) => {
    setParams({
      status: next.status?.length ? next.status : null,
      paymentStatus: next.paymentStatus?.length ? next.paymentStatus : null,
      expiringWithinDays: next.expiringWithinDays ?? null,
      sortBy: next.sortBy ?? null,
      sortDirection: next.sortDirection ?? null,
    });
  };

  return [filters, setFilters] as const;
}
