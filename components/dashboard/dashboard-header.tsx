import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

type DashboardHeaderProps = {
  className?: string;
}

export function DashboardHeader({ className }: DashboardHeaderProps) {
  return (
    <div className={cn(
      "flex flex-col md:flex-row md:items-end justify-between gap-4 border-slate-200",
      className,
    )}>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <Home className="w-5 h-5" />
          <span className="text-sm font-black uppercase tracking-[0.2em]">Portfolio Manager</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500 font-medium">Insights and management for your portfolio.</p>
      </div>
    </div>
  )
}