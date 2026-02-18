import { type CurrencyAmount, type Address } from "./common";
import { type Contract } from "./unit";

export type CollectionStatus = {
  month: string;
  paidAmount: CurrencyAmount;
  pendingAmount: CurrencyAmount;
  overdueAmount: CurrencyAmount;
  collectableRent: CurrencyAmount;
};

export type PortfolioMetrics = {
  unitCount: number;
  occupiedCount: number;
  occupancyRate: number;
  monthlyRevenue: CurrencyAmount;
  pendingActions: {
    amount: number;
    overduePayments: number;
    expiringContracts: number;
    vacantUnits: number;
  };
};

export type UpcomingExpiration = Contract & {
  unitId: string;
};

export type PendingAction = {
  id: string;
  unitId: string;
  address: Address;
  type: "overdue_payment" | "expiring_contract" | "vacant_unit";
  description: string;
  severity: "high" | "medium";
};
