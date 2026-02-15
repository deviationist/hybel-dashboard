import { AmountWithUnit } from "@/types/curreny";

export function formatAmountWithUnit(amount: AmountWithUnit): string {
  return `${amount.amount} ${amount.unit}`;
}