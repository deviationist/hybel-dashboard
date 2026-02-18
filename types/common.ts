export type CurrencyAmount = {
  amount: number;
  currency: string;
};

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
