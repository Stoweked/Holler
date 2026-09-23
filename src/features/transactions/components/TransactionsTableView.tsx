import type { ReactNode } from "react";
import { Alert, Button, Center, Loader, Stack, Text, Title } from "@mantine/core";
import { Search01Icon } from "hugeicons-react";
import TransactionItem, { type TransactionItemProps } from "./TransactionItem";
import type { Transaction } from "../types/transaction";

export interface TransactionsTableViewProps {
  transactions: Transaction[];
  onTransactionClick: (transaction: Transaction) => void;
  profile?: TransactionItemProps["profile"];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  toolbar?: ReactNode;
  hasActiveFilters?: boolean;
  onResetFilters?: () => void;
}

/** Renders host-supplied rows. Fetching, filtering, selection and persistence stay outside. */
export function TransactionsTableView({
  transactions, onTransactionClick, profile, loading = false, error, onRetry,
  toolbar, hasActiveFilters = false, onResetFilters,
}: TransactionsTableViewProps) {
  return (
    <Stack gap={0} aria-busy={loading}>
      {toolbar}
      {loading ? (
        <Center py={60}><Loader aria-label="Loading transactions" /></Center>
      ) : error ? (
        <Alert color="red" title="Unable to load transactions" role="alert" m="md">
          <Stack gap="sm">
            <Text>{error}</Text>
            {onRetry && <Button onClick={onRetry} variant="light" color="red">Try again</Button>}
          </Stack>
        </Alert>
      ) : transactions.length === 0 ? (
        <Center>
          <Stack align="center" py={60} gap="lg">
            <Search01Icon size={40} color="grey" />
            <Stack gap={0} align="center">
              <Title order={3} ta="center">No transactions found</Title>
              <Text c="dimmed" ta="center">{hasActiveFilters ? "Try adjusting your transaction filters." : "Your transactions will appear here."}</Text>
            </Stack>
            {hasActiveFilters && onResetFilters && <Button size="md" radius="xl" variant="default" onClick={onResetFilters}>Reset all filters</Button>}
          </Stack>
        </Center>
      ) : (
        <Stack align="center" gap={0}>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} profile={profile} onClick={() => onTransactionClick(transaction)} />
          ))}
          {hasActiveFilters && onResetFilters && <Button mt="lg" mb={4} size="md" radius="xl" variant="default" onClick={onResetFilters}>Show all transactions</Button>}
        </Stack>
      )}
    </Stack>
  );
}
