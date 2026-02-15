import { Item } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type MetricCardProps = {
  className?: string;
  label: string,
  value: string,
  icon?: {
    component: LucideIcon,
    colorClass: string,
    bgClass: string
  },
  
};

export function MetricCard({ className, label, value, icon: Icon }: MetricCardProps) {
  return (
    <Item className={cn(
      "bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4",
      className,
    )}>
      {Icon && (
        <div className={`p-3 rounded-lg ${Icon.bgClass}`}>
          <Icon.component className={`w-6 h-6 ${Icon.colorClass}`} />
        </div>
      )}
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-slate-900">{value}</p>
      </div>
    </Item>
  )
}

export function MetricCardSkeleton({ className }: Pick<MetricCardProps, "className">) {
  return (
    <Item className={cn(
      "bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4",
      className,
    )}>
      <Skeleton className="p-3">
        <div className="w-6 h-6" />
      </Skeleton>
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-4/5 h-4" />
      </div>
    </Item>
  )
}