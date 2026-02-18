import { PortfolioMetrics } from "@/types/dashboard";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<PortfolioMetrics>> {
  return NextResponse.json({
    unitCount: 24,
    occupancyRate: 87.4,
    monthlyRevenue: {
      amount: 125000,
      currency: 'NOK',
    },
    pendingActions: {
      amount: 2,
      overduePayments: 1,
    },
  })
}