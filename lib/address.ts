import { Address } from "@/types/dashboard";

export function formatAddress(address: Address): string {
  const lines = [address.line1, address.line2].filter(Boolean);
  return `${lines.join(", ")}, ${address.zip} ${address.city}`;
}

export function formatAddressShort(address: Address): string {
  return address.line1;
}
