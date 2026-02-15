import { AmountWithUnit } from "../curreny";

export type DashboardStats = {
  unitCount: number;
  occupancyRate: number;
  monthlyRevenue: AmountWithUnit;
  pendingActions: {
    amount: number;
    overduePayments: number;
  };
};