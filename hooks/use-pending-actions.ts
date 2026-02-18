import { useQuery } from "@tanstack/react-query";
import { type PendingAction } from "@/types/api";

export function usePendingActions() {
  const { data, isFetching } = useQuery<PendingAction[]>({
    queryKey: ["dashboard", "portfolio", "pending-actions"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard/portfolio/pending-actions");
      if (!response.ok) throw new Error("Failed to fetch pending actions");
      return await response.json();
    },
  });

  return { data, isFetching };
}
