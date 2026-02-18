import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";

type DashboardHeaderProps = {
  className?: string;
}

export function DashboardHeader({ className }: DashboardHeaderProps) {
  return (
    <div className={cn(
      "flex flex-col md:flex-row  items-center justify-between gap-4 border-slate-200",
      className,
    )}>
      <div className="space-y-1">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500 font-medium">Insights and management for your portfolio.</p>
      </div>
      <ThemeToggle />
    </div>
  )
}