import { useState, useEffect, useCallback } from "react";
import {
  DateFilter,
  SortOption,
  Transaction,
  TransactionStatusFilter,
  TransactionTypeFilter,
} from "@/features/transactions/types/transaction";
import { useRouter, useSearchParams } from "next/navigation";

export const useTransactionFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const activeStatusFilter = (searchParams.get("status") ||
    "All") as TransactionStatusFilter;
  const activeTypeFilter = (searchParams.get("type") ||
    "All") as TransactionTypeFilter;
  const sortOption = (searchParams.get("sortBy") ||
    "Newest first") as SortOption;
  const dateFilter: DateFilter | [Date, Date] =
    searchParams.get("startDate") && searchParams.get("endDate")
      ? [
          new Date(searchParams.get("startDate")!),
          new Date(searchParams.get("endDate")!),
        ]
      : (searchParams.get("dateFilter") as DateFilter) || "All";
  const amountRange: [number, number] = [
    Number(searchParams.get("minAmount")) || 0,
    Number(searchParams.get("maxAmount")) || 999999,
  ];
  const activeContactFilter = searchParams.get("contact") || "All";
  const searchQuery = searchParams.get("search")?.split(" ") || [];

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
      const params = new URLSearchParams(searchParams.toString());
      const response = await fetch(`/api/transactions?${params.toString()}`);
      const data = await response.json();
      setTransactions(data);
      setLoading(false);
    };

    fetchTransactions();
  }, [searchParams]);

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
    searchQuery,
    setSearchQuery: (query: string[]) =>
      updateParams({ search: query.join(" ") }),
    processedTransactions: transactions,
    resetFilters,
    loading,
  };
};
