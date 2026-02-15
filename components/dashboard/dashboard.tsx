"use client";

import { cn } from "@/lib/utils";
import { DashboardStats } from "./dashboard-stats/dashboard-stats";
import { Home } from "lucide-react";
import { Separator } from "../ui/separator";

type DashboardProps = {
  className?: string;
};

export function Dashboard({ className }: DashboardProps) {
  return (
    <div className={cn(
      "w-full grid grid-cols-24 gap-4",
      className
    )}>
      {/* Header Section */}
      <div className="col-span-24 flex flex-col md:flex-row md:items-end justify-between gap-4 border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Home className="w-5 h-5" />
            <span className="text-sm font-black uppercase tracking-[0.2em]">Portfolio Manager</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-slate-500 font-medium">Insights and management for your portfolio.</p>
        </div>
      </div>
      <Separator className="col-span-24 my-2" />
      <DashboardStats />   
    </div>
  );
}