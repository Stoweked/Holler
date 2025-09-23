// app/api/transactions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { mockTransactions } from "@/mockData/mockTransactions";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { getPartyName } from "@/features/transactions/types/transactionParty";

dayjs.extend(isBetween);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "All";
  const type = searchParams.get("type") || "All";
  const contact = searchParams.get("contact") || "All";
  const minAmount = Number(searchParams.get("minAmount")) || 0;
  const maxAmount = Number(searchParams.get("maxAmount")) || 999999;
  const search = searchParams.get("search") || "";
  const dateFilter = searchParams.get("dateFilter") || "All";
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const sortBy = searchParams.get("sortBy") || "Newest first";

  const processedTransactions = mockTransactions
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
      if (startDate && endDate) {
        return transactionDate.isBetween(
          dayjs(startDate).startOf("day"),
          dayjs(endDate).endOf("day"),
          null,
          "[]"
        );
      }
      return true;
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

  return NextResponse.json(processedTransactions);
}
