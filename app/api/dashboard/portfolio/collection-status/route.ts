import { CollectionStatus } from "@/types/dashboard";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<CollectionStatus>> {
  return NextResponse.json({
    paidAmount: {
      amount: 65000,
      currency: 'NOK',
    },
    pendingAmount: {
      amount: 35000,
      currency: 'NOK',
    },
    overdueAmount: {
      amount: 25000,
      currency: 'NOK',
    },
    collectableRent: {
      amount: 125000,
      currency: 'NOK',
    },
  })
}