import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";

type DashboardHeaderProps = {
  className?: string;
};

export function DashboardHeader({ className }: DashboardHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-row items-start justify-between gap-4 border-border",
        className,
      )}
    >
      <div className="space-y-1">
        <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight text-foreground">
          <Image src="/icon.svg" alt="Hybel logo" width={36} height={36} />
          Dashboard
        </h1>
        <p className="text-muted-foreground font-medium">
          Insights and management for your portfolio.
        </p>
      </div>
      <ThemeToggle />
    </div>
  );
}
