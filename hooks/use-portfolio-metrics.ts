import { useQuery } from "@tanstack/react-query";
import { type PortfolioMetrics } from "@/types/dashboard";

export function usePortfolioMetrics() {
  const { data, isFetching } = useQuery<PortfolioMetrics>({
    queryKey: ["dashboard", "portfolio", "metrics"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard/portfolio/metrics");
      if (!response.ok) throw new Error("Failed to fetch portfolio metrics");
      return await response.json();
    },
  });

  return { data, isFetching };
}
