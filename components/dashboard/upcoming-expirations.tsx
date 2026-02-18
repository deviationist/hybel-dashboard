import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { type UpcomingExpiration } from "@/types/dashboard";
import { daysUntil } from "@/lib/date";
import { FormattedDate } from "@/components/formatted-date";
import { formatAddressShort } from "@/lib/address";

type UpcomingExpirationsProps = {
  className?: string;
  onExpirationClick: (unitId: string) => void;
};

export function UpcomingExpirations({
  className,
  onExpirationClick,
}: UpcomingExpirationsProps) {
  const { data: upcomingExpirations, isFetching } = useQuery<
    UpcomingExpiration[]
  >({
    queryKey: ["dashboard", "portfolio", "upcoming-expirations"],
    queryFn: async () => {
      const response = await fetch(
        "/api/dashboard/portfolio/upcoming-expirations",
      );
      if (!response.ok) throw new Error("Failed to fetch upcoming expirations");
      return await response.json();
    },
  });
  if (isFetching) {
    return <></>; // TODO: Add loading skeleton
  }
  if (!upcomingExpirations) {
    return <>No data</>; // TODO: Display error dialog
  }
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="font-medium text-muted-foreground">
          ⚠ Contract expiration within 6 months
        </CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-border">
        {upcomingExpirations.length === 0 ? (
          <p className="text-sm font-medium text-muted-foreground">
            No upcoming expirations
          </p>
        ) : (
          upcomingExpirations.map((p, i) => {
            const days = daysUntil(p.leaseExpires)!;
            const urgent = days < 90;
            return (
              <div
                key={p.unitId}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0 cursor-pointer px-2 -mx-2 hover:bg-accent/50"
                onClick={() => onExpirationClick(p.unitId)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onExpirationClick(p.unitId);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${formatAddressShort(p.address)}: expires in ${daysUntil(p.leaseExpires)} days`}
              >
                <div>
                  <p className="text-sm font-medium">
                    {formatAddressShort(p.address)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {p.tenant.name}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${urgent ? "text-red-400" : "text-amber-400"}`}
                  >
                    {days} days
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <FormattedDate date={p.leaseExpires} />
                  </p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
