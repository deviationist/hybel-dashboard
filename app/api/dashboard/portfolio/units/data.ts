import { RentalUnit } from "@/types/dashboard";

export const units: RentalUnit[] = [
  {
    id: "unit-1",
    address: {
      line1: "Markveien 12A",
      zip: "0554",
      city: "Oslo",
      country: "NO",
    },
    tenant: { name: "Erik Hansen" },
    status: "occupied",
    contract: {
      leaseExpires: "2026-08-31",
      monthlyRent: { amount: 12500, currency: "NOK" },
      paymentStatus: "paid",
    },
  },
  {
    id: "unit-2",
    address: {
      line1: "Thorvald Meyers gate 45B",
      zip: "0555",
      city: "Oslo",
      country: "NO",
    },
    tenant: { name: "Ingrid Larsen" },
    status: "occupied",
    contract: {
      leaseExpires: "2026-04-01",
      monthlyRent: { amount: 8500, currency: "NOK" },
      paymentStatus: "overdue",
    },
  },
  {
    id: "unit-3",
    address: {
      line1: "Grünerløkka terrasse 8",
      zip: "0556",
      city: "Oslo",
      country: "NO",
    },
    tenant: { name: "Jonas Berg" },
    status: "occupied",
    contract: {
      leaseExpires: "2027-01-15",
      monthlyRent: { amount: 14000, currency: "NOK" },
      paymentStatus: "paid",
    },
  },
  {
    id: "unit-4",
    address: {
      line1: "Sannergata 22C",
      zip: "0557",
      city: "Oslo",
      country: "NO",
    },
    tenant: { name: "Maria Olsen" },
    status: "occupied",
    contract: {
      leaseExpires: "2026-06-30",
      monthlyRent: { amount: 9800, currency: "NOK" },
      paymentStatus: "pending",
    },
  },
  {
    id: "unit-5",
    address: {
      line1: "Sofies gate 3",
      zip: "0558",
      city: "Oslo",
      country: "NO",
    },
    tenant: null,
    status: "vacant",
    contract: null,
  },
  {
    id: "unit-6",
    address: {
      line1: "Vogts gate 17A",
      zip: "0559",
      city: "Oslo",
      country: "NO",
    },
    tenant: null,
    status: "maintenance",
    contract: null,
  },
  {
    id: "unit-7",
    address: {
      line1: "Fredensborgveien 9",
      zip: "0560",
      city: "Oslo",
      country: "NO",
    },
    tenant: { name: "Kari Nordmann" },
    status: "occupied",
    contract: {
      leaseExpires: "2026-03-15",
      monthlyRent: { amount: 11200, currency: "NOK" },
      paymentStatus: "paid",
    },
  },
  {
    id: "unit-8",
    address: {
      line1: "Akersgata 55",
      zip: "0180",
      city: "Oslo",
      country: "NO",
    },
    tenant: { name: "Anders Vik" },
    status: "occupied",
    contract: {
      leaseExpires: "2026-12-01",
      monthlyRent: { amount: 15500, currency: "NOK" },
      paymentStatus: "paid",
    },
  },
  {
    id: "unit-9",
    address: {
      line1: "Thereses gate 12",
      zip: "0452",
      city: "Oslo",
      country: "NO",
    },
    tenant: { name: "Anna Martinsen" },
    status: "occupied",
    contract: {
      leaseExpires: "2026-08-31",
      monthlyRent: { amount: 12500, currency: "NOK" },
      paymentStatus: "paid",
    },
  },
  {
    id: "unit-10",
    address: {
      line1: "Frognerveien 33",
      zip: "0263",
      city: "Oslo",
      country: "NO",
    },
    tenant: { name: "Sofie Kristiansen" },
    status: "occupied",
    contract: {
      leaseExpires: "2026-05-30",
      monthlyRent: { amount: 18200, currency: "NOK" },
      paymentStatus: "paid",
    },
  },
  {
    id: "unit-11",
    address: {
      line1: "Damsgårdsveien 61",
      zip: "5058",
      city: "Bergen",
      country: "NO",
    },
    tenant: { name: "Mads Lindgren" },
    status: "occupied",
    contract: {
      leaseExpires: "2026-09-01",
      monthlyRent: { amount: 8900, currency: "NOK" },
      paymentStatus: "pending",
    },
  },
  {
    id: "unit-12",
    address: {
      line1: "Nordnes gate 8",
      zip: "5005",
      city: "Bergen",
      country: "NO",
    },
    tenant: null,
    status: "vacant",
    contract: null,
  },
  {
    id: "unit-13",
    address: {
      line1: "Solsiden 22",
      zip: "7014",
      city: "Trondheim",
      country: "NO",
    },
    tenant: { name: "Henrik Johansen" },
    status: "occupied",
    contract: {
      leaseExpires: "2026-01-01",
      monthlyRent: { amount: 16500, currency: "NOK" },
      paymentStatus: "overdue",
    },
  },
  {
    id: "unit-14",
    address: {
      line1: "Strandgaten 44",
      zip: "5013",
      city: "Bergen",
      country: "NO",
    },
    tenant: { name: "Lise Hauge" },
    status: "occupied",
    contract: {
      leaseExpires: "2026-03-31",
      monthlyRent: { amount: 10500, currency: "NOK" },
      paymentStatus: "paid",
    },
  },
  {
    id: "unit-15",
    address: {
      line1: "Olav Tryggvasons gate 18",
      zip: "7011",
      city: "Trondheim",
      country: "NO",
    },
    tenant: null,
    status: "maintenance",
    contract: null,
  },
  {
    id: "unit-16",
    address: { line1: "Kirkegata 5", zip: "0153", city: "Oslo", country: "NO" },
    tenant: { name: "Thomas Bakke" },
    status: "occupied",
    contract: {
      leaseExpires: "2027-06-15",
      monthlyRent: { amount: 13800, currency: "NOK" },
      paymentStatus: "paid",
    },
  },
];
