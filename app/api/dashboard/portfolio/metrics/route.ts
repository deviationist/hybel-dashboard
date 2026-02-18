import { PortfolioMetrics } from "@/types/dashboard";
import { NextResponse } from "next/server";
import { delay } from "@/app/api/delay";
import { units } from "../units/data";

export async function GET(): Promise<NextResponse<PortfolioMetrics>> {
  await delay(300);

  const unitCount = units.length;
  const occupiedCount = units.filter((u) => u.status === "occupied").length;
  const occupancyRate = Math.round((occupiedCount / unitCount) * 1000) / 10;

  const monthlyRevenue = units.reduce(
    (sum, u) => sum + (u.contract?.monthlyRent.amount ?? 0),
    0,
  );

  const overduePayments = units.filter(
    (u) => u.contract?.paymentStatus === "overdue",
  ).length;

  const pendingPayments = units.filter(
    (u) => u.contract?.paymentStatus === "pending",
  ).length;

  const vacantUnits = units.filter((u) => u.status === "vacant").length;

  return NextResponse.json({
    unitCount,
    occupiedCount,
    occupancyRate,
    monthlyRevenue: {
      amount: monthlyRevenue,
      currency: "NOK",
    },
    pendingActions: {
      amount: overduePayments + pendingPayments + vacantUnits,
      overduePayments,
      pendingPayments,
      vacantUnits,
    },
  });
}
