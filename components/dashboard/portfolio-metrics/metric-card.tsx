import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type MetricCardProps = {
  className?: string;
  children?: React.ReactElement;
  label: string;
  value?: string;
  icon?: {
    component: LucideIcon;
    colorClass: string;
    bgClass: string;
  };
};

export function MetricCard({ className, children, label, value, icon: Icon }: MetricCardProps) {
  return (
    <Card
      className={className}
      role="group"
      aria-label={`${label}: ${value}`}
    >
      <CardContent className="flex gap-4">
        {Icon && (
          <div className={cn("p-3 rounded-lg", Icon.bgClass)} aria-hidden="true">
            <Icon.component className={cn("w-6 h-6", Icon.colorClass)} />
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-xl font-bold text-slate-900">{children ?? value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricCardSkeleton({ className }: Pick<MetricCardProps, "className">) {
  return (
    <Card
      className={className}
      aria-busy="true"
      aria-label="Loading metric"
    >
      <CardContent>
        <Skeleton className="p-3" aria-hidden="true">
          <div className="w-6 h-6" />
        </Skeleton>
        <div className="flex-1 flex flex-col gap-2" aria-hidden="true">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-4/5 h-4" />
        </div>
      </CardContent>
    </Card>
  );
}