import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { type MetricCardProps } from "./metric-card";

export function MetricCardSkeleton({
  className,
}: Pick<MetricCardProps, "className">) {
  return (
    <Card
      className={cn("pt-4 pb-3", className)}
      aria-busy="true"
      aria-label="Loading metric"
    >
      <CardContent className="flex gap-4 px-4">
        <Skeleton className="size-12 rounded-lg shrink-0" aria-hidden="true" />
        <div className="flex-1 flex flex-col gap-2" aria-hidden="true">
          <Skeleton className="w-2/3 h-3.5" />
          <Skeleton className="w-16 h-6" />
          <Skeleton className="w-1/2 h-3 mb-3.5" />
        </div>
      </CardContent>
    </Card>
  );
}
