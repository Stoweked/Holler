import { useState } from "react";
import { Stack, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import TransactionFilters from "./TransactionFilters";
import TransactionItem from "./TransactionItem"; // Import the new item component
import { TransactionFilter } from "@/types/transaction";
import { mockTransactions } from "../mockData/mockTransactions";

export default function TransactionsTable() {
  const { width } = useViewportSize();
  const isMobile = width < 768;
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>("All");

  // Filter the transactions based on the active filter
  const filteredTransactions = mockTransactions.filter((transaction) => {
    if (activeFilter === "All") {
      return true;
    }
    // Handle the 'Pending' status filter separately
    if (activeFilter === "Pending") {
      return transaction.status === "Pending";
    }
    // All other filters are based on the transaction type
    return transaction.type === activeFilter;
  });

  return (
    <Stack p={isMobile ? "md" : "xl"}>
      <Stack gap="lg">
        <TransactionFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Display a message if no transactions match the filter */}
        {filteredTransactions.length === 0 ? (
          <Text c="dimmed" ta="center" pt="xl">
            No transactions found.
          </Text>
        ) : (
          // Map over the filtered data and render an item for each one
          filteredTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </Stack>
    </Stack>
  );
}
