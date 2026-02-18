import { UpcomingExpiration } from "@/types/dashboard";
import { NextResponse } from "next/server";
import { delay } from "@/app/api/delay";
import { units } from "../units/data";
import { differenceInCalendarDays } from "date-fns";

const EXPIRING_WITHIN_DAYS = 180;

export async function GET(): Promise<NextResponse<UpcomingExpiration[]>> {
  await delay(350);

  const now = new Date();
  const expirations: UpcomingExpiration[] = units
    .filter((u) => u.contract && u.tenant)
    .filter((u) => {
      const days = differenceInCalendarDays(
        new Date(u.contract!.leaseExpires),
        now,
      );
      return days >= 0 && days <= EXPIRING_WITHIN_DAYS;
    })
    .sort(
      (a, b) =>
        new Date(a.contract!.leaseExpires).getTime() -
        new Date(b.contract!.leaseExpires).getTime(),
    )
    .map((u) => ({
      leaseExpires: new Date(u.contract!.leaseExpires),
      address: u.address,
      tenant: u.tenant!,
    }));

  return NextResponse.json(expirations);
}
