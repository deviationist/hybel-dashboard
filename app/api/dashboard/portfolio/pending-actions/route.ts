import { PendingAction } from "@/types/dashboard";
import { NextResponse } from "next/server";
import { delay } from "@/app/api/delay";
import { units } from "../units/data";
import { differenceInCalendarDays } from "date-fns";
import { formatCurrency } from "@/lib/currency";

const EXPIRING_WITHIN_DAYS = 60;

export async function GET(): Promise<NextResponse<PendingAction[]>> {
  await delay(250);

  const now = new Date();
  const actions: PendingAction[] = [];
  let actionId = 1;

  for (const unit of units) {
    // Overdue payments
    if (unit.contract?.paymentStatus === "overdue") {
      const rent = unit.contract.monthlyRent;
      actions.push({
        id: `action-${actionId++}`,
        unitId: unit.id,
        address: unit.address,
        type: "overdue_payment",
        description: `Overdue payment — ${formatCurrency(rent.amount, rent.currency, "nb-NO")}`,
        severity: "high",
      });
    }

    // Expiring contracts (within 60 days)
    if (unit.contract && unit.tenant) {
      const days = differenceInCalendarDays(
        new Date(unit.contract.leaseExpires),
        now,
      );
      if (days >= 0 && days <= EXPIRING_WITHIN_DAYS) {
        actions.push({
          id: `action-${actionId++}`,
          unitId: unit.id,
          address: unit.address,
          type: "expiring_contract",
          description: `Lease expires in ${days} days`,
          severity: "medium",
        });
      }
    }

    // Vacant units
    if (unit.status === "vacant") {
      actions.push({
        id: `action-${actionId++}`,
        unitId: unit.id,
        address: unit.address,
        type: "vacant_unit",
        description: "Unit currently vacant",
        severity: "medium",
      });
    }
  }

  // Sort: high severity first, then medium
  actions.sort((a, b) => {
    if (a.severity === b.severity) return 0;
    return a.severity === "high" ? -1 : 1;
  });

  return NextResponse.json(actions);
}
