"use client";

import { cn } from "@/lib/utils";
import { DashboardStats } from "./dashboard-stats/dashboard-stats";
import { Separator } from "../ui/separator";
import { DashboardHeader } from "./dashboard-header";

type DashboardProps = {
  className?: string;
};

export function Dashboard({ className }: DashboardProps) {
  return (
    <div className={cn(
      "w-full grid grid-cols-24 gap-4",
      className
    )}>
      <DashboardHeader className="col-span-24" />
      <Separator className="col-span-24 my-2" />
      <DashboardStats />
    </div>
  );
}