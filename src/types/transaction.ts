// src/types/transactions.ts

export type TransactionStatus = "Completed" | "Pending" | "Failed";

export type TransactionType = "Sent" | "Received" | "Deposited" | "Transferred";

export type TransactionFilter = TransactionType | "All" | "Pending";

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  type: TransactionType;
  sender: string;
  receiver: string;
  bankAccount: string;
  avatar: string;
}
