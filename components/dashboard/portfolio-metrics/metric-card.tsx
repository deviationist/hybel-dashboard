import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight, LucideIcon } from "lucide-react";

export type MetricCardProps = {
  className?: string;
  children?: React.ReactElement;
  label: string;
  value?: string;
  subtitle?: string;
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
  subtitle,
  onClick,
  icon: Icon,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "pt-4 pb-3",
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
      <CardContent className="flex gap-4 px-4">
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
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {onClick && (
          <ChevronRight className="size-4 self-center text-muted-foreground" />
        )}
      </CardContent>
    </Card>
  );
}
