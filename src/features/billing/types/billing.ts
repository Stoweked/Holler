export interface BillingCycle {
  id: string;
  start_date: string;
  end_date: string;
  total_fees: number;
  status: "paid" | "pending" | "failed";
}
