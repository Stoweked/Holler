// src/features/transactions/hooks/useTransactionFilters.ts
import { useState } from "react";
import {
  DateFilter,
  SortOption,
  Transaction,
  TransactionStatusFilter,
  TransactionTypeFilter,
} from "@/features/transactions/types/transaction";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const useTransactionFilters = (initialTransactions: Transaction[]) => {
  const [activeStatusFilter, setActiveStatusFilter] =
    useState<TransactionStatusFilter>("All");
  const [activeTypeFilter, setActiveTypeFilter] =
    useState<TransactionTypeFilter>("All");
  const [sortOption, setSortOption] = useState<SortOption>("Newest first");
  const [dateFilter, setDateFilter] = useState<DateFilter | [Date, Date]>(
    "All"
  );
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 999999]);
  const [activeContactFilter, setActiveContactFilter] = useState<string>("All");

  const processedTransactions = initialTransactions
    .filter((transaction) => {
      if (activeStatusFilter === "All") return true;
      return transaction.status === activeStatusFilter;
    })
    .filter((transaction) => {
      if (activeTypeFilter === "All") return true;
      return transaction.type === activeTypeFilter;
    })
    .filter((transaction) => {
      if (activeContactFilter === "All") return true;
      return (
        transaction.sender === activeContactFilter ||
        transaction.receiver === activeContactFilter
      );
    })
    .filter((transaction) => {
      return (
        transaction.amount >= amountRange[0] &&
        transaction.amount <= amountRange[1]
      );
    })
    .filter((transaction) => {
      const transactionDate = dayjs(transaction.date);
      if (dateFilter === "All") return true;
      if (dateFilter === "Today") {
        return transactionDate.isSame(dayjs(), "day");
      }
      if (dateFilter === "This week") {
        const startOfWeek = dayjs().startOf("week");
        const endOfWeek = dayjs().endOf("week");
        return transactionDate.isBetween(startOfWeek, endOfWeek, null, "[]");
      }
      if (dateFilter === "This month") {
        const startOfMonth = dayjs().startOf("month");
        const endOfMonth = dayjs().endOf("month");
        return transactionDate.isBetween(startOfMonth, endOfMonth, null, "[]");
      }
      if (Array.isArray(dateFilter)) {
        const startDate = dayjs(dateFilter[0]).startOf("day");
        const endDate = dayjs(dateFilter[1]).endOf("day");
        return transactionDate.isBetween(startDate, endDate, null, "[]");
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
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

  const resetFilters = () => {
    setActiveStatusFilter("All");
    setActiveTypeFilter("All");
    setDateFilter("All");
    setSortOption("Newest first");
    setAmountRange([0, 999999]);
    setActiveContactFilter("All");
  };

  return {
    activeStatusFilter,
    setActiveStatusFilter,
    activeTypeFilter,
    setActiveTypeFilter,
    sortOption,
    setSortOption,
    dateFilter,
    setDateFilter,
    amountRange,
    setAmountRange,
    activeContactFilter,
    setActiveContactFilter,
    processedTransactions,
    resetFilters,
  };
};
