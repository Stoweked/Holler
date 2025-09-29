import { useState } from "react";
import { Button, Center, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import TransactionFilters from "./filters/TransactionFilters";
import TransactionItem from "./TransactionItem";
import { Transaction } from "@/features/transactions/types/transaction";
import { Search01Icon } from "hugeicons-react";
import dynamic from "next/dynamic";
import { useTransactionFilters } from "../hooks/useTransactionFilters";

const TransactionDetailsDrawer = dynamic(
  () => import("./TransactionDetailsDrawer"),
  { ssr: false }
);

export default function TransactionsTable() {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const {
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
    searchQuery,
    setSearchQuery,
    processedTransactions,
    resetFilters,
  } = useTransactionFilters();

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    openDrawer();
  };

  const isAnyFilterActive =
    activeStatusFilter !== "All" ||
    activeTypeFilter !== "All" ||
    dateFilter !== "All" ||
    activeContactFilter !== "All" ||
    amountRange[0] !== 0 ||
    amountRange[1] !== 999999 ||
    searchQuery.length > 0;

  return (
    <>
      <Stack gap={0}>
        <TransactionFilters
          activeStatusFilter={activeStatusFilter}
          onStatusFilterChange={setActiveStatusFilter}
          activeTypeFilter={activeTypeFilter}
          onTypeFilterChange={setActiveTypeFilter}
          activeSortOption={sortOption}
          onSortChange={setSortOption}
          activeDateFilter={dateFilter}
          onDateChange={setDateFilter}
          activeAmountFilter={amountRange}
          onAmountFilterChange={setAmountRange}
          activeContactFilter={activeContactFilter}
          onContactFilterChange={setActiveContactFilter}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          resetFilters={resetFilters}
          total={processedTransactions.length}
        />

        {processedTransactions.length === 0 ? (
          <Center>
            <Stack align="center" py={60} gap="lg">
              <Search01Icon size={40} color="grey" />
              <Stack gap={0} align="center">
                <Title order={3} ta="center">
                  No transactions found
                </Title>
                <Text c="dimmed" ta="center">
                  Try adjusting your transaction filters.
                </Text>
              </Stack>

              <Button
                size="md"
                radius="xl"
                variant="default"
                onClick={resetFilters}
              >
                Reset all filters
              </Button>
            </Stack>
          </Center>
        ) : (
          <Stack align="center" gap={0}>
            {processedTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onClick={() => handleTransactionClick(transaction)}
              />
            ))}
            {isAnyFilterActive ? (
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

      <TransactionDetailsDrawer
        opened={drawerOpened}
        close={closeDrawer}
        transaction={selectedTransaction}
      />
    </>
  );
}
