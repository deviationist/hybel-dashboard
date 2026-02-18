import {
  RentalUnit,
  UnitStatus,
  PaymentStatus,
  UnitSortField,
  SortDirection,
} from "@/types/dashboard";
import { formatAddress } from "@/lib/address";
import { NextRequest, NextResponse } from "next/server";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { delay } from "@/app/api/delay";
import { units } from "./data";

const validStatuses: UnitStatus[] = ["occupied", "vacant", "maintenance"];
const validPaymentStatuses: PaymentStatus[] = ["paid", "pending", "overdue"];
const validSortFields: UnitSortField[] = ["address", "rent", "leaseExpires"];
const validSortDirections: SortDirection[] = ["asc", "desc"];

export async function GET(
  request: NextRequest,
): Promise<NextResponse<RentalUnit[]>> {
  await delay(500);
  const { searchParams } = request.nextUrl;

  const statuses = searchParams
    .getAll("status")
    .filter((s): s is UnitStatus => validStatuses.includes(s as UnitStatus));
  const paymentStatuses = searchParams
    .getAll("paymentStatus")
    .filter((s): s is PaymentStatus =>
      validPaymentStatuses.includes(s as PaymentStatus),
    );
  const expiringWithinDays = searchParams.get("expiringWithinDays");
  const sortBy = searchParams.get("sortBy") as UnitSortField | null;
  const sortDirection =
    (searchParams.get("sortDirection") as SortDirection | null) ?? "asc";

  let result = [...units];

  // Filter by unit status (multiple allowed)
  if (statuses.length > 0) {
    result = result.filter((u) => statuses.includes(u.status));
  }

  // Filter by payment status (multiple allowed)
  if (paymentStatuses.length > 0) {
    result = result.filter(
      (u) =>
        u.contract?.paymentStatus != null &&
        paymentStatuses.includes(u.contract.paymentStatus),
    );
  }

  // Filter by lease expiring within N days
  if (expiringWithinDays) {
    const days = parseInt(expiringWithinDays, 10);
    if (!isNaN(days) && days > 0) {
      const now = new Date();
      result = result.filter((u) => {
        if (!u.contract?.leaseExpires) return false;
        const daysLeft = differenceInCalendarDays(
          parseISO(u.contract.leaseExpires),
          now,
        );
        return daysLeft >= 0 && daysLeft <= days;
      });
    }
  }

  // Sort
  if (sortBy && validSortFields.includes(sortBy)) {
    const dir = validSortDirections.includes(sortDirection)
      ? sortDirection
      : "asc";
    const multiplier = dir === "asc" ? 1 : -1;

    result.sort((a, b) => {
      switch (sortBy) {
        case "address": {
          const addrA = formatAddress(a.address);
          const addrB = formatAddress(b.address);
          return multiplier * addrA.localeCompare(addrB, "nb-NO");
        }
        case "rent": {
          const rentA = a.contract?.monthlyRent.amount ?? 0;
          const rentB = b.contract?.monthlyRent.amount ?? 0;
          return multiplier * (rentA - rentB);
        }
        case "leaseExpires": {
          const dateA = a.contract?.leaseExpires ?? "";
          const dateB = b.contract?.leaseExpires ?? "";
          return multiplier * dateA.localeCompare(dateB);
        }
      }
    });
  }

  return NextResponse.json(result);
}
