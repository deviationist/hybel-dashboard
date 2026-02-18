import { CurrencyAmount } from "./curreny";

export type Address = {
  line1: string;
  line2?: string;
  zip: string;
  city: string;
  country: string;
};

export type Tenant = {
  name: string;
};

export type Contract = {
  leaseExpires: Date;
  address: Address;
  tenant: Tenant;
};

export type CollectionStatus = {
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
    pendingPayments: number;
    vacantUnits: number;
  };
};

export type UpcomingExpiration = Contract & {
  unitId: string;
};

export type UnitStatus = "occupied" | "vacant" | "maintenance";
export type PaymentStatus = "paid" | "pending" | "overdue";

export type RentalUnit = {
  id: string;
  address: Address;
  tenant: Tenant | null;
  status: UnitStatus;
  contract: {
    leaseExpires: string;
    monthlyRent: CurrencyAmount;
    paymentStatus: PaymentStatus;
  } | null;
};

export type PendingAction = {
  id: string;
  unitId: string;
  address: Address;
  type: "overdue_payment" | "expiring_contract" | "vacant_unit";
  description: string;
  severity: "high" | "medium";
};

export type UnitSortField = "address" | "rent" | "leaseExpires";
export type SortDirection = "asc" | "desc";

export type UnitFilters = {
  status?: UnitStatus[];
  paymentStatus?: PaymentStatus[];
  expiringWithinDays?: number;
  sortBy?: UnitSortField;
  sortDirection?: SortDirection;
};
