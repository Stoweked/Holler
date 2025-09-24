// src/features/transactions/hooks/useTransactionFilters.ts
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  DateFilter,
  SortOption,
  Transaction,
  TransactionStatusFilter,
  TransactionTypeFilter,
} from "@/features/transactions/types/transaction";
import { useRouter, useSearchParams } from "next/navigation";
import { getTransactions } from "../actions/get-transactions";

export const useTransactionFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Memoize all derived state from searchParams to prevent re-renders
  const {
    activeStatusFilter,
    activeTypeFilter,
    sortOption,
    dateFilter,
    amountRange,
    activeContactFilter,
    searchQuery,
  } = useMemo(() => {
    const status = (searchParams.get("status") ||
      "All") as TransactionStatusFilter;
    const type = (searchParams.get("type") || "All") as TransactionTypeFilter;
    const sortBy = (searchParams.get("sortBy") || "Newest first") as SortOption;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const date: DateFilter | [Date, Date] =
      startDate && endDate
        ? [new Date(startDate), new Date(endDate)]
        : (searchParams.get("dateFilter") as DateFilter) || "All";
    const range: [number, number] = [
      Number(searchParams.get("minAmount")) || 0,
      Number(searchParams.get("maxAmount")) || 999999,
    ];
    const contact = searchParams.get("contact") || "All";
    const search = searchParams.get("search") || "";
    return {
      activeStatusFilter: status,
      activeTypeFilter: type,
      sortOption: sortBy,
      dateFilter: date,
      amountRange: range,
      activeContactFilter: contact,
      searchQuery: search,
    };
  }, [searchParams]);

  // Function to update URL search params
  const updateParams = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const data = await getTransactions({
          status: activeStatusFilter,
          type: activeTypeFilter,
          sortBy: sortOption,
          dateFilter: dateFilter,
          minAmount: amountRange[0],
          maxAmount: amountRange[1],
          contact: activeContactFilter,
          search: searchQuery,
        });
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [
    activeStatusFilter,
    activeTypeFilter,
    sortOption,
    dateFilter,
    amountRange,
    activeContactFilter,
    searchQuery,
  ]);

  const resetFilters = () => {
    router.push("?");
  };

  return {
    activeStatusFilter,
    setActiveStatusFilter: (status: TransactionStatusFilter) =>
      updateParams({ status }),
    activeTypeFilter,
    setActiveTypeFilter: (type: TransactionTypeFilter) =>
      updateParams({ type }),
    sortOption,
    setSortOption: (sort: SortOption) => updateParams({ sortBy: sort }),
    dateFilter,
    setDateFilter: (date: DateFilter | [Date, Date]) => {
      if (Array.isArray(date)) {
        updateParams({
          startDate: date[0].toISOString(),
          endDate: date[1].toISOString(),
          dateFilter: "",
        });
      } else {
        updateParams({ dateFilter: date, startDate: "", endDate: "" });
      }
    },
    amountRange,
    setAmountRange: (range: [number, number]) =>
      updateParams({
        minAmount: String(range[0]),
        maxAmount: String(range[1]),
      }),
    activeContactFilter,
    setActiveContactFilter: (contact: string) => updateParams({ contact }),
    searchQuery: searchQuery.split(" ").filter(Boolean),
    setSearchQuery: (query: string[]) =>
      updateParams({ search: query.join(" ") }),
    processedTransactions: transactions,
    resetFilters,
    loading,
  };
};
