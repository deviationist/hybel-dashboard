import { type CurrencyAmount, type Address, type Tenant } from "./common";

export type UnitStatus = "occupied" | "vacant" | "maintenance";
export type PaymentStatus = "paid" | "pending" | "overdue";

export type Contract = {
  leaseExpires: Date;
  address: Address;
  tenant: Tenant;
};

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

export type UnitSortField = "address" | "rent" | "leaseExpires";
export type SortDirection = "asc" | "desc";

export type UnitFilters = {
  status?: UnitStatus[];
  paymentStatus?: PaymentStatus[];
  expiringWithinDays?: number;
  sortBy?: UnitSortField;
  sortDirection?: SortDirection;
};
