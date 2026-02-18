import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChevronRight, LucideIcon } from "lucide-react";

type MetricCardProps = {
  className?: string;
  children?: React.ReactElement;
  label: string;
  value?: string;
  onClick?: () => void;
  icon?: {
    component: LucideIcon;
    colorClass: string;
    bgClass: string;
  };
};

export function MetricCard({
  className,
  children,
  label,
  value,
  onClick,
  icon: Icon,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        className,
        onClick &&
          "cursor-pointer hover:ring-2 hover:ring-primary/20 transition-shadow",
      )}
      role={onClick ? "button" : "group"}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`${label}: ${value}`}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <CardContent className="flex gap-4">
        {Icon && (
          <div>
            <div
              className={cn("p-3 rounded-lg", Icon.bgClass)}
              aria-hidden="true"
            >
              <Icon.component className={cn("w-6 h-6", Icon.colorClass)} />
            </div>
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </p>
          <p className="text-xl font-bold text-foreground">
            {children ?? value}
          </p>
        </div>
        {onClick && (
          <ChevronRight className="size-4 self-center text-muted-foreground" />
        )}
      </CardContent>
    </Card>
  );
}

export function MetricCardSkeleton({
  className,
}: Pick<MetricCardProps, "className">) {
  return (
    <Card className={className} aria-busy="true" aria-label="Loading metric">
      <CardContent className="flex gap-4">
        <Skeleton className="size-12 rounded-lg shrink-0" aria-hidden="true" />
        <div className="flex-1 flex flex-col gap-2" aria-hidden="true">
          <Skeleton className="w-24 h-3.5" />
          <Skeleton className="w-16 h-6" />
        </div>
      </CardContent>
    </Card>
  );
}
