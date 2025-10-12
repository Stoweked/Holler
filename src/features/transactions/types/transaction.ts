// src/features/transactions/types/transaction.ts
import { TransactionParty } from "./transactionParty";
import { Project } from "@/features/projects/types/project"; // <-- Import Project type

export type TransactionStatus = "Completed" | "Pending" | "Failed";
export type TransactionType = "Sent" | "Received" | "Deposited" | "Transferred";
export type TransactionStatusFilter = TransactionStatus | "All";
export type TransactionTypeFilter = TransactionType | "All";
export type SortOption =
  | "Newest first"
  | "Oldest first"
  | "Amount (High to Low)"
  | "Amount (Low to High)";
export type DateFilter = "All" | "Today" | "This week" | "This month";
export interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  type: TransactionType;
  from: TransactionParty;
  to: TransactionParty;
  bankAccount: string;
  projectId?: string;
  project?: Project;
}
