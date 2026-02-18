import { CollectionStatus } from "@/types/api";
import { NextResponse } from "next/server";
import { delay } from "@/app/api/delay";
import { units } from "../units/data";

export async function GET(): Promise<NextResponse<CollectionStatus>> {
  await delay(400);

  let paid = 0;
  let pending = 0;
  let overdue = 0;

  for (const unit of units) {
    if (!unit.contract) continue;
    const rent = unit.contract.monthlyRent.amount;
    switch (unit.contract.paymentStatus) {
      case "paid":
        paid += rent;
        break;
      case "pending":
        pending += rent;
        break;
      case "overdue":
        overdue += rent;
        break;
    }
  }

  const month = new Date().toISOString();

  return NextResponse.json({
    month,
    paidAmount: { amount: paid, currency: "NOK" },
    pendingAmount: { amount: pending, currency: "NOK" },
    overdueAmount: { amount: overdue, currency: "NOK" },
    collectableRent: { amount: paid + pending + overdue, currency: "NOK" },
  });
}
