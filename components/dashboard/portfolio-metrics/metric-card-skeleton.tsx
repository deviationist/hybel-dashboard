import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type MetricCardProps } from "./metric-card";

export function MetricCardSkeleton({
  className,
}: Pick<MetricCardProps, "className">) {
  return (
    <Card className={className} aria-busy="true" aria-label="Loading metric">
      <CardContent className="flex gap-4 mb-3">
        <Skeleton className="size-12 rounded-lg shrink-0" aria-hidden="true" />
        <div className="flex-1 flex flex-col gap-2" aria-hidden="true">
          <Skeleton className="w-2/3 h-3.5" />
          <Skeleton className="w-16 h-6" />
        </div>
      </CardContent>
    </Card>
  );
}
