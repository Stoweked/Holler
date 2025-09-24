// src/features/transactions/actions/getTransactions.ts
"use server";

import { mockTransactions } from "@/mockData/mockTransactions";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { getPartyName } from "@/features/transactions/types/transactionParty";
import {
  Transaction,
  TransactionStatusFilter,
  TransactionTypeFilter,
  DateFilter,
  SortOption,
} from "../types/transaction";

dayjs.extend(isBetween);

interface GetTransactionsParams {
  status: TransactionStatusFilter;
  type: TransactionTypeFilter;
  contact: string;
  minAmount: number;
  maxAmount: number;
  search: string;
  dateFilter: DateFilter | [Date, Date];
  sortBy: SortOption;
}

export async function getTransactions({
  status = "All",
  type = "All",
  contact = "All",
  minAmount = 0,
  maxAmount = 999999,
  search = "",
  dateFilter = "All",
  sortBy = "Newest first",
}: Partial<GetTransactionsParams>): Promise<Transaction[]> {
  // Directly use the mock data as if it were a database response
  const transactions = mockTransactions;

  const processedTransactions = transactions
    .filter((transaction) => {
      if (status === "All") return true;
      return transaction.status === status;
    })
    .filter((transaction) => {
      if (type === "All") return true;
      return transaction.type === type;
    })
    .filter((transaction) => {
      if (contact === "All") return true;
      return (
        getPartyName(transaction.from) === contact ||
        getPartyName(transaction.to) === contact
      );
    })
    .filter((transaction) => {
      return transaction.amount >= minAmount && transaction.amount <= maxAmount;
    })
    .filter((transaction) => {
      if (!search) return true;
      const searchableText = `${getPartyName(transaction.from)} ${getPartyName(
        transaction.to
      )} ${transaction.bankAccount}`.toLowerCase();
      return search
        .toLowerCase()
        .split(" ")
        .every((keyword) => searchableText.includes(keyword));
    })
    .filter((transaction) => {
      const transactionDate = dayjs(transaction.date);

      if (Array.isArray(dateFilter)) {
        const [startDate, endDate] = dateFilter;
        return transactionDate.isBetween(
          dayjs(startDate).startOf("day"),
          dayjs(endDate).endOf("day"),
          null,
          "[]"
        );
      }

      switch (dateFilter) {
        case "All":
          return true;
        case "Today":
          return transactionDate.isSame(dayjs(), "day");
        case "This week":
          const startOfWeek = dayjs().startOf("week");
          const endOfWeek = dayjs().endOf("week");
          return transactionDate.isBetween(startOfWeek, endOfWeek, null, "[]");
        case "This month":
          const startOfMonth = dayjs().startOf("month");
          const endOfMonth = dayjs().endOf("month");
          return transactionDate.isBetween(
            startOfMonth,
            endOfMonth,
            null,
            "[]"
          );
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Oldest first":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "Amount (High to Low)":
          return b.amount - a.amount;
        case "Amount (Low to High)":
          return a.amount - b.amount;
        case "Newest first":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  return processedTransactions;
}
