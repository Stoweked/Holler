import { Group, Stack, ScrollArea, Button } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { FilterHorizontalIcon } from "hugeicons-react";
import classes from "../Transactions.module.css";
import TransactionFiltersDrawer from "./TransactionFiltersDrawer";
import { TypeFilter } from "./TypeFilter";
import { StatusFilter } from "./StatusFilter";
import { useTransactionFilters } from "../../hooks/useTransactionFilters";
import { mockTransactions } from "@/mockData/mockTransactions";
import {
  TransactionStatusFilter,
  TransactionTypeFilter,
} from "../../types/transaction";

const statusFilters: TransactionStatusFilter[] = [
  "All",
  "Pending",
  "Completed",
  "Failed",
];
const typeFilters: TransactionTypeFilter[] = [
  "All",
  "Sent",
  "Received",
  "Deposited",
  "Transferred",
];

export default function TransactionFilters() {
  const { width } = useViewportSize();
  const condenseFilters = width < 1118;

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const {
    activeStatusFilter,
    setActiveStatusFilter,
    activeTypeFilter,
    setActiveTypeFilter,
    sortOption,
    setSortOption,
    dateFilter,
    setDateFilter,
    processedTransactions,
    resetFilters,
  } = useTransactionFilters(mockTransactions);

  return (
    <>
      <Stack gap={0} className={classes.filterHeader}>
        {/* Filter buttons */}
        <ScrollArea type="never">
          <Group wrap="nowrap" justify="space-between" gap="sm" pl="sm" py="sm">
            {/* Left side */}
            {condenseFilters ? (
              <Button
                variant="default"
                size="sm"
                leftSection={<FilterHorizontalIcon size={16} />}
                style={{ flexShrink: 0 }}
                onClick={openDrawer}
              >
                Filters
              </Button>
            ) : (
              <Group wrap="nowrap" gap="sm">
                <TypeFilter
                  activeTypeFilter={activeTypeFilter}
                  onTypeFilterChange={setActiveTypeFilter}
                  typeFilters={typeFilters}
                />
                <StatusFilter
                  activeStatusFilter={activeStatusFilter}
                  onStatusFilterChange={setActiveStatusFilter}
                  statusFilters={statusFilters}
                />
                {/* Add other filters here in a similar way */}
              </Group>
            )}
            {/* Right side remains the same */}
          </Group>
        </ScrollArea>
        {/* Filter pills remain the same */}
      </Stack>

      <TransactionFiltersDrawer
        opened={drawerOpened}
        onClose={closeDrawer}
        activeStatusFilter={activeStatusFilter}
        activeTypeFilter={activeTypeFilter}
        activeDateFilter={dateFilter}
        onStatusFilterChange={setActiveStatusFilter}
        onTypeFilterChange={setActiveTypeFilter}
        onDateChange={setDateFilter}
        total={processedTransactions.length}
        resetFilters={resetFilters}
      />
    </>
  );
}
