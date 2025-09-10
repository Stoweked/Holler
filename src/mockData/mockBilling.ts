import { BillingCycle } from "@/features/billing/types/billing";

export const mockBillingHistory: BillingCycle[] = [
  {
    id: "1",
    start_date: "2025-08-01",
    end_date: "2025-08-31",
    total_fees: 125.5,
    status: "paid",
  },
  {
    id: "2",
    start_date: "2025-07-01",
    end_date: "2025-07-31",
    total_fees: 99.75,
    status: "paid",
  },
  {
    id: "3",
    start_date: "2025-06-01",
    end_date: "2025-06-30",
    total_fees: 150.0,
    status: "paid",
  },
];
