import { useState } from "react";
import { Button, Center, Stack, Text, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import TransactionFilters from "./TransactionFilters";
import TransactionItem from "./TransactionItem"; // Import the new item component
import { DateFilter, SortOption, TransactionFilter } from "@/types/transaction";
import { mockTransactions } from "../mockData/mockTransactions";
import { Search01Icon } from "hugeicons-react";

export default function TransactionsTable() {
  const { width } = useViewportSize();
  const isMobile = width < 768;
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>("All");
  const [sortOption, setSortOption] = useState<SortOption>("Newest first");
  const [dateFilter, setDateFilter] = useState<DateFilter>("All");

  // Filter the transactions based on the active filter
  const processedTransactions = mockTransactions
    .filter((transaction) => {
      // 1. Filter by type/status (your existing logic)
      if (activeFilter === "All") return true;
      if (activeFilter === "Pending") return transaction.status === "Pending";
      return transaction.type === activeFilter;
    })
    .filter((transaction) => {
      // 2. Filter by date (logic would go here)
      // Example: if (dateFilter === 'Today') { ... }
      return true; // Placeholder
    })
    .sort((a, b) => {
      // 3. Sort the results
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
    setActiveFilter("All");
    setDateFilter("All");
    setSortOption("Newest first");
  };

  return (
    <Stack p={isMobile ? "md" : "xl"}>
      <Stack gap="lg">
        <TransactionFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Display a message if no transactions match the filter */}
        {processedTransactions.length === 0 ? (
          <Center>
            <Stack align="center" py={60} gap="lg">
              <Search01Icon size={40} color="grey" />
              <Stack gap={0} align="center">
                <Title order={4} ta="center">
                  No transactions found
                </Title>
                <Text c="dimmed" ta="center">
                  Try adjusting your transaction filters.
                </Text>
              </Stack>

              <Button
                size="lg"
                radius="xl"
                variant="default"
                fullWidth
                onClick={resetFilters}
              >
                Reset all filters
              </Button>
            </Stack>
          </Center>
        ) : (
          <Stack align="center">
            {processedTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
            {activeFilter !== "All" ? (
              <Button
                size="md"
                radius="xl"
                variant="default"
                onClick={resetFilters}
              >
                Show all transactions
              </Button>
            ) : null}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
