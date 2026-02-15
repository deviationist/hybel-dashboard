export async function GET() {
  return Response.json({
    unitCount: 24,
    occupancyRate: 87.4,
    monthlyRevenue: {
      amount: 125000,
      unit: 'kr',
    },
    pendingActions: {
      amount: 2,
      overduePayments: 1,
    },
  })
}