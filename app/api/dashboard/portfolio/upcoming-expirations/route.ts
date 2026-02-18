import { UpcomingExpiration } from "@/types/api";
import { NextResponse } from "next/server";
import { delay } from "@/app/api/delay";
import { units } from "../units/data";
import { compareAsc, differenceInCalendarDays, parseISO } from "date-fns";

const EXPIRING_WITHIN_DAYS = 180;

export async function GET(): Promise<NextResponse<UpcomingExpiration[]>> {
  await delay(350);

  const now = new Date();
  const expirations: UpcomingExpiration[] = units
    .filter((u) => u.contract && u.tenant)
    .filter((u) => {
      const days = differenceInCalendarDays(
        parseISO(u.contract!.leaseExpires),
        now,
      );
      return days >= 0 && days <= EXPIRING_WITHIN_DAYS;
    })
    .sort((a, b) =>
      compareAsc(
        parseISO(a.contract!.leaseExpires),
        parseISO(b.contract!.leaseExpires),
      ),
    )
    .map((u) => ({
      unitId: u.id,
      leaseExpires: parseISO(u.contract!.leaseExpires),
      address: u.address,
      tenant: u.tenant!,
    }));

  return NextResponse.json(expirations);
}
