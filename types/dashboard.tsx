import { CurrencyAmount } from "./curreny";

export type Tenant = {
  name: string;
}

export type Contract = {
  leaseExpires: Date;
  address: string;
  tenant: Tenant;
};

export type CollectionStatus = {
  paidAmount: CurrencyAmount;
  pendingAmount: CurrencyAmount,
  overdueAmount: CurrencyAmount,
  collectableRent: CurrencyAmount,
};

export type PortfolioMetrics = {
  unitCount: number;
  occupancyRate: number;
  monthlyRevenue: CurrencyAmount;
  pendingActions: {
    amount: number;
    overduePayments: number;
  };
};

export type UpcomingExpiration = Contract;