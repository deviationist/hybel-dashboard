import { PortfolioMetrics } from "@/types/api";
import { NextResponse } from "next/server";
import { delay } from "@/app/api/delay";
import { units } from "../units/data";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { EXPIRING_WITHIN_DAYS } from "@/lib/config";

export async function GET(): Promise<NextResponse<PortfolioMetrics>> {
  await delay(300);

  const now = new Date();
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

  const expiringContracts = units.filter((u) => {
    if (!u.contract || !u.tenant) return false;
    const days = differenceInCalendarDays(
      parseISO(u.contract.leaseExpires),
      now,
    );
    return days >= 0 && days <= EXPIRING_WITHIN_DAYS;
  }).length;

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
      amount: overduePayments + expiringContracts + vacantUnits,
      overduePayments,
      expiringContracts,
      vacantUnits,
    },
  });
}
