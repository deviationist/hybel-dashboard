import { useQuery } from "@tanstack/react-query";
import { type CollectionStatus } from "@/types/api";

export function useCollectionStatus() {
  const { data, isFetching } = useQuery<CollectionStatus>({
    queryKey: ["dashboard", "portfolio", "collection-status"],
    queryFn: async () => {
      const response = await fetch(
        "/api/dashboard/portfolio/collection-status",
      );
      if (!response.ok) throw new Error("Failed to fetch collection status");
      return await response.json();
    },
  });

  const percentages = data
    ? {
        paid:
          (data.paidAmount.amount / data.collectableRent.amount) * 100,
        pending:
          (data.pendingAmount.amount / data.collectableRent.amount) * 100,
        overdue:
          (data.overdueAmount.amount / data.collectableRent.amount) * 100,
      }
    : null;

  return { data, isFetching, percentages };
}
