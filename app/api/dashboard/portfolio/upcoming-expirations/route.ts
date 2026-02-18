import { UpcomingExpiration } from "@/types/dashboard";
import { addDays, addMonths } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<UpcomingExpiration[]>> {
  return NextResponse.json([
    {
      tenant: {
        name: 'Gunnar Hansen',
      },
      address: 'State Street 68, 0020 Oslo',
      leaseExpires: addMonths(addDays(new Date(), 2), 2),
    }
  ])
}