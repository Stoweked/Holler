import { Group, Stack, ScrollArea, Button, Pill, Space } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { FilterHorizontalIcon } from "hugeicons-react";
import classes from "../Transactions.module.css";
import TransactionFiltersDrawer from "./TransactionFiltersDrawer";
import { mockTransactions } from "@/mockData/mockTransactions";
import dayjs from "dayjs";
import {
  TransactionStatusFilter,
  TransactionTypeFilter,
} from "../../types/transaction";
import { useTransactionFilters } from "../../hooks/useTransactionFilters";
import { TypeFilter } from "./TypeFilter";
import { StatusFilter } from "./StatusFilter";
import { DateFilterComponent } from "./DateFilter";
import { AmountFilter } from "./AmountFilter";
import { ContactFilter } from "./ContactFilter";
import { Sort } from "./Sort";
import { Options } from "./Options";

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

  const isStatusFilterActive = activeStatusFilter !== "All";
  const isTypeFilterActive = activeTypeFilter !== "All";
  const isDateFilterActive = Array.isArray(dateFilter)
    ? dateFilter[0] !== null && dateFilter[1] !== null
    : dateFilter !== "All";
  const isSortActive = sortOption !== "Newest first";

  const getDateFilterLabel = () => {
    if (!isDateFilterActive) {
      return null;
    }

    if (Array.isArray(dateFilter)) {
      const [start, end] = dateFilter;
      if (start && end) {
        const format = "MMM D";
        if (dayjs(start).isSame(end, "day")) {
          return dayjs(start).format(format);
        }
        return `${dayjs(start).format(format)} - ${dayjs(end).format(format)}`;
      }
    } else if (dateFilter !== "All") {
      return dateFilter;
    }

    return null;
  };

  const dateFilterLabel = getDateFilterLabel();

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
                <DateFilterComponent
                  activeDateFilter={dateFilter}
                  onDateChange={setDateFilter}
                />
                <AmountFilter />
                <ContactFilter />
              </Group>
            )}
            {/* Right side */}
            <Group wrap="nowrap" gap="sm" pr="sm">
              <Sort
                activeSortOption={sortOption}
                onSortChange={setSortOption}
              />
              <Options resetFilters={resetFilters} />
            </Group>
          </Group>
        </ScrollArea>
        {/* Filter pills */}
        <ScrollArea type="never">
          {(isStatusFilterActive ||
            isTypeFilterActive ||
            isDateFilterActive ||
            isSortActive) && (
            <Group p="sm" pt={0} gap="sm" wrap="nowrap">
              {isTypeFilterActive && (
                <Pill
                  className={classes.filterPill}
                  withRemoveButton
                  onRemove={() => setActiveTypeFilter("All")}
                >
                  {activeTypeFilter}
                </Pill>
              )}
              {isStatusFilterActive && (
                <Pill
                  className={classes.filterPill}
                  withRemoveButton
                  onRemove={() => setActiveStatusFilter("All")}
                >
                  {activeStatusFilter}
                </Pill>
              )}
              {isDateFilterActive && (
                <Pill
                  className={classes.filterPill}
                  withRemoveButton
                  onRemove={() => setDateFilter("All")}
                >
                  {dateFilterLabel}
                </Pill>
              )}
              {isSortActive && (
                <Pill
                  className={classes.filterPill}
                  withRemoveButton
                  onRemove={() => setSortOption("Newest first")}
                >
                  {sortOption}
                </Pill>
              )}

              <Space w={4} h={8} />
            </Group>
          )}
        </ScrollArea>
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
