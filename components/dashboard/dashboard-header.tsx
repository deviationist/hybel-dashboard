import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";

type DashboardHeaderProps = {
  className?: string;
}

export function DashboardHeader({ className }: DashboardHeaderProps) {
  return (
    <div className={cn(
      "flex flex-row items-start justify-between gap-4 border-border",
      className,
    )}>
      <div className="space-y-1">
        <h1 className="text-4xl font-black tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-medium">Insights and management for your portfolio.</p>
      </div>
      <ThemeToggle />
    </div>
  )
}