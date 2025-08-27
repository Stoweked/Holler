// src/features/transactions/components/filters/TransactionFilters.tsx
import {
  Group,
  Stack,
  ScrollArea,
  Button,
  Pill,
  Space,
  Indicator,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { FilterHorizontalIcon } from "hugeicons-react";
import classes from "../Transactions.module.css";
import dayjs from "dayjs";
import {
  DateFilter,
  SortOption,
  TransactionStatusFilter,
  TransactionTypeFilter,
} from "../../types/transaction";
import { TypeFilter } from "./TypeFilter";
import { StatusFilter } from "./StatusFilter";
import { DateFilterComponent } from "./DateFilter";
import { AmountFilter } from "./AmountFilter";
import { ContactFilter } from "./ContactFilter";
import { Sort } from "./Sort";
import { Options } from "./Options";
import TransactionFiltersDrawer from "./TransactionFiltersDrawer";

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

interface TransactionFiltersProps {
  activeStatusFilter: TransactionStatusFilter;
  onStatusFilterChange: (filter: TransactionStatusFilter) => void;
  activeTypeFilter: TransactionTypeFilter;
  onTypeFilterChange: (filter: TransactionTypeFilter) => void;
  activeSortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  activeDateFilter: DateFilter | [Date, Date];
  onDateChange: (date: DateFilter | [Date, Date]) => void;
  activeAmountFilter: [number, number];
  onAmountFilterChange: (range: [number, number]) => void;
  activeContactFilter: string;
  onContactFilterChange: (contact: string) => void;
  resetFilters: () => void;
  total: number;
}

export default function TransactionFilters({
  activeStatusFilter,
  onStatusFilterChange,
  activeTypeFilter,
  onTypeFilterChange,
  activeSortOption,
  onSortChange,
  activeDateFilter,
  onDateChange,
  activeAmountFilter,
  onAmountFilterChange,
  activeContactFilter,
  onContactFilterChange,
  resetFilters,
  total,
}: TransactionFiltersProps) {
  const { width } = useViewportSize();
  const condenseFilters = width < 1118;

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const isStatusFilterActive = activeStatusFilter !== "All";
  const isTypeFilterActive = activeTypeFilter !== "All";
  const isDateFilterActive = Array.isArray(activeDateFilter)
    ? activeDateFilter[0] !== null && activeDateFilter[1] !== null
    : activeDateFilter !== "All";
  const isSortActive = activeSortOption !== "Newest first";
  const isAmountFilterActive =
    activeAmountFilter[0] !== 0 || activeAmountFilter[1] !== 999999;
  const isContactFilterActive = activeContactFilter !== "All";

  const isAnyFilterActive =
    isStatusFilterActive ||
    isTypeFilterActive ||
    isDateFilterActive ||
    isAmountFilterActive ||
    isContactFilterActive;

  const getDateFilterLabel = () => {
    if (!isDateFilterActive) {
      return null;
    }

    if (Array.isArray(activeDateFilter)) {
      const [start, end] = activeDateFilter;
      if (start && end) {
        const format = "MMM D";
        if (dayjs(start).isSame(end, "day")) {
          return dayjs(start).format(format);
        }
        return `${dayjs(start).format(format)} - ${dayjs(end).format(format)}`;
      }
    } else if (activeDateFilter !== "All") {
      return activeDateFilter;
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
              <Indicator
                disabled={!isAnyFilterActive}
                color="lime"
                position="top-end"
                size={10}
                offset={6}
              >
                <Button
                  variant="default"
                  size="sm"
                  leftSection={<FilterHorizontalIcon size={16} />}
                  style={{ flexShrink: 0 }}
                  onClick={openDrawer}
                >
                  Filters
                </Button>
              </Indicator>
            ) : (
              <Group wrap="nowrap" gap="sm">
                <TypeFilter
                  activeTypeFilter={activeTypeFilter}
                  onTypeFilterChange={onTypeFilterChange}
                  typeFilters={typeFilters}
                />
                <StatusFilter
                  activeStatusFilter={activeStatusFilter}
                  onStatusFilterChange={onStatusFilterChange}
                  statusFilters={statusFilters}
                />
                <DateFilterComponent
                  activeDateFilter={activeDateFilter}
                  onDateChange={onDateChange}
                />
                <AmountFilter
                  activeAmountFilter={activeAmountFilter}
                  onAmountFilterChange={onAmountFilterChange}
                />
                <ContactFilter
                  activeContactFilter={activeContactFilter}
                  onContactFilterChange={onContactFilterChange}
                />
              </Group>
            )}
            {/* Right side */}
            <Group wrap="nowrap" gap="sm" pr="sm">
              <Sort
                activeSortOption={activeSortOption}
                onSortChange={onSortChange}
              />
              <Options resetFilters={resetFilters} />
            </Group>
          </Group>
        </ScrollArea>
        {/* Filter pills */}
        <ScrollArea type="never">
          {(isAnyFilterActive || isSortActive) && (
            <Group p="sm" pt={0} gap="sm" wrap="nowrap">
              {isTypeFilterActive && (
                <Pill
                  className={classes.filterPill}
                  withRemoveButton
                  onRemove={() => onTypeFilterChange("All")}
                >
                  {activeTypeFilter}
                </Pill>
              )}
              {isStatusFilterActive && (
                <Pill
                  className={classes.filterPill}
                  withRemoveButton
                  onRemove={() => onStatusFilterChange("All")}
                >
                  {activeStatusFilter}
                </Pill>
              )}
              {isAmountFilterActive && (
                <Pill
                  className={classes.filterPill}
                  withRemoveButton
                  onRemove={() => onAmountFilterChange([0, 999999])}
                >
                  {`$${activeAmountFilter[0].toLocaleString()} - $${activeAmountFilter[1].toLocaleString()}`}
                </Pill>
              )}
              {isContactFilterActive && (
                <Pill
                  className={classes.filterPill}
                  withRemoveButton
                  onRemove={() => onContactFilterChange("All")}
                >
                  {activeContactFilter}
                </Pill>
              )}
              {isDateFilterActive && (
                <Pill
                  className={classes.filterPill}
                  withRemoveButton
                  onRemove={() => onDateChange("All")}
                >
                  {dateFilterLabel}
                </Pill>
              )}
              {isSortActive && (
                <Pill
                  className={classes.filterPill}
                  withRemoveButton
                  onRemove={() => onSortChange("Newest first")}
                >
                  {activeSortOption}
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
        activeDateFilter={activeDateFilter}
        activeAmountFilter={activeAmountFilter}
        activeContactFilter={activeContactFilter}
        activeSortOption={activeSortOption}
        onSortChange={onSortChange}
        onAmountFilterChange={onAmountFilterChange}
        onStatusFilterChange={onStatusFilterChange}
        onTypeFilterChange={onTypeFilterChange}
        onDateChange={onDateChange}
        onContactFilterChange={onContactFilterChange}
        total={total}
        resetFilters={resetFilters}
      />
    </>
  );
}
