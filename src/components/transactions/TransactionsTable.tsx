import { useState } from "react";
import { Box, Button, Center, Space, Stack, Text, Title } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import TransactionFilters from "./TransactionFilters";
import TransactionItem from "./TransactionItem"; // Import the new item component
import {
  DateFilter,
  SortOption,
  Transaction,
  TransactionFilter,
} from "@/types/transaction";
import { mockTransactions } from "../mockData/mockTransactions";
import { Search01Icon } from "hugeicons-react";
import classes from "./Transactions.module.css";
import TransactionDetailsDrawer from "./TransactionDetailsDrawer";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export default function TransactionsTable() {
  const { width } = useViewportSize();
  const isMobile = width < 768;
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>("All");
  const [sortOption, setSortOption] = useState<SortOption>("Newest first");
  const [dateFilter, setDateFilter] = useState<DateFilter | [Date, Date]>(
    "All"
  );
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    openDrawer();
  };

  const processedTransactions = mockTransactions
    .filter((transaction) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Pending") return transaction.status === "Pending";
      return transaction.type === activeFilter;
    })
    .filter((transaction) => {
      const transactionDate = dayjs(transaction.date);
      if (dateFilter === "All") return true;
      if (dateFilter === "Today") {
        return transactionDate.isSame(dayjs(), "day");
      }
      if (dateFilter === "This Week") {
        return transactionDate.isBetween(
          dayjs().startOf("week"),
          dayjs().endOf("week")
        );
      }
      if (dateFilter === "This Month") {
        return transactionDate.isSame(dayjs(), "month");
      }
      if (Array.isArray(dateFilter)) {
        return transactionDate.isBetween(
          dateFilter[0],
          dateFilter[1],
          "day",
          "[]"
        );
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
    setActiveFilter("All");
    setDateFilter("All");
    setSortOption("Newest first");
  };

  return (
    <>
      <Stack>
        <Stack gap={0}>
          <Box p="md">
            <TransactionFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onSortChange={setSortOption}
              onDateChange={setDateFilter}
              activeDateFilter={dateFilter}
            />
          </Box>

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
            <Stack align="center" gap={0} className={classes.transactionStack}>
              {processedTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onClick={() => handleTransactionClick(transaction)}
                />
              ))}
              {activeFilter !== "All" || dateFilter !== "All" ? (
                <Button
                  mt="lg"
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

        <Space h={100} />
      </Stack>

      <TransactionDetailsDrawer
        opened={drawerOpened}
        close={closeDrawer}
        transaction={selectedTransaction}
      />
    </>
  );
}
