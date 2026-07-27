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

export interface TransactionFilters {
  status: TransactionStatusFilter;
  type: TransactionTypeFilter;
  contact: string;
  project: string;
  minAmount: number;
  maxAmount: number;
  search: string;
  dateFilter: DateFilter | [Date, Date];
  sortBy: SortOption;
}

function matchesDate(
  transaction: Transaction,
  dateFilter: DateFilter | [Date, Date]
): boolean {
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
    case "Today":
      return transactionDate.isSame(dayjs(), "day");
    case "This week":
      return transactionDate.isBetween(
        dayjs().startOf("week"),
        dayjs().endOf("week"),
        null,
        "[]"
      );
    case "This month":
      return transactionDate.isBetween(
        dayjs().startOf("month"),
        dayjs().endOf("month"),
        null,
        "[]"
      );
    case "All":
    default:
      return true;
  }
}

function matchesSearch(transaction: Transaction, search: string): boolean {
  if (!search) return true;

  const searchableText = [
    getPartyName(transaction.from),
    getPartyName(transaction.to),
    transaction.bankAccount ?? "",
    transaction.project?.name ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return search
    .toLowerCase()
    .split(" ")
    .every((keyword) => searchableText.includes(keyword));
}

function compare(sortBy: SortOption) {
  return (a: Transaction, b: Transaction): number => {
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
  };
}

export function filterTransactions(
  transactions: Transaction[],
  {
    status = "All",
    type = "All",
    contact = "All",
    project = "All",
    minAmount = 0,
    maxAmount = 999999,
    search = "",
    dateFilter = "All",
    sortBy = "Newest first",
  }: Partial<TransactionFilters>
): Transaction[] {
  return transactions
    .filter((t) => status === "All" || t.status === status)
    .filter((t) => type === "All" || t.type === type)
    .filter(
      (t) =>
        contact === "All" ||
        getPartyName(t.from) === contact ||
        getPartyName(t.to) === contact
    )
    .filter((t) => project === "All" || t.project?.id === project)
    .filter((t) => t.amount >= minAmount && t.amount <= maxAmount)
    .filter((t) => matchesSearch(t, search))
    .filter((t) => matchesDate(t, dateFilter))
    .sort(compare(sortBy));
}
