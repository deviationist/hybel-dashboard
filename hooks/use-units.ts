import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { type RentalUnit, type UnitFilters } from "@/types/unit";

function buildQueryString(filters: UnitFilters): string {
  const params = new URLSearchParams();
  if (filters.status?.length)
    filters.status.forEach((s) => params.append("status", s));
  if (filters.paymentStatus?.length)
    filters.paymentStatus.forEach((s) => params.append("paymentStatus", s));
  if (filters.expiringWithinDays)
    params.set("expiringWithinDays", filters.expiringWithinDays.toString());
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortDirection) params.set("sortDirection", filters.sortDirection);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function useUnits(filters: UnitFilters) {
  const { data, isFetching, isPlaceholderData } = useQuery<RentalUnit[]>({
    queryKey: ["dashboard", "portfolio", "units", filters],
    queryFn: async () => {
      const response = await fetch(
        `/api/dashboard/portfolio/units${buildQueryString(filters)}`,
      );
      if (!response.ok) throw new Error("Failed to fetch units");
      return await response.json();
    },
    placeholderData: keepPreviousData,
  });

  const isRefetching = isFetching && isPlaceholderData;

  return { data, isFetching, isRefetching };
}
