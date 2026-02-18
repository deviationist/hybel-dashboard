import { type PaymentStatus, type UnitStatus } from "@/types/dashboard";

export const paymentStatusConfig: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  paid: { label: "Paid", className: "bg-emerald-100 text-emerald-700" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700" },
  overdue: { label: "Overdue", className: "bg-red-100 text-red-700" },
};

export const unitStatusConfig: Record<
  UnitStatus,
  { label: string; className: string }
> = {
  occupied: { label: "Occupied", className: "bg-emerald-100 text-emerald-700" },
  vacant: { label: "Vacant", className: "bg-slate-100 text-slate-600" },
  maintenance: {
    label: "Maintenance",
    className: "bg-slate-100 text-slate-600",
  },
};
