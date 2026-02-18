import { useQuery } from "@tanstack/react-query";
import { type UpcomingExpiration } from "@/types/dashboard";

export function useUpcomingExpirations() {
  const { data, isFetching } = useQuery<UpcomingExpiration[]>({
    queryKey: ["dashboard", "portfolio", "upcoming-expirations"],
    queryFn: async () => {
      const response = await fetch(
        "/api/dashboard/portfolio/upcoming-expirations",
      );
      if (!response.ok)
        throw new Error("Failed to fetch upcoming expirations");
      return await response.json();
    },
  });

  return { data, isFetching };
}
