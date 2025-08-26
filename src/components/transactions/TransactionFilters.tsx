import {
  TransactionStatusFilter,
  TransactionTypeFilter,
  DateFilter,
  SortOption,
} from "@/types/transaction";
import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Group,
  Indicator,
  Menu,
  Modal,
  Pill,
  ScrollArea,
  Space,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import {
  ArrowLeftRightIcon,
  Calendar02Icon,
  CheckmarkCircle02Icon,
  CoinsDollarIcon,
  FileDownloadIcon,
  FileExportIcon,
  FilterHorizontalIcon,
  MoreVerticalCircle01Icon,
  SearchRemoveIcon,
  SortByDown01Icon,
  SortByUp01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import classes from "./Transactions.module.css";
import TransactionFiltersDrawer from "./TransactionFiltersDrawer";

dayjs.extend(isBetween);

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
  activeTypeFilter: TransactionTypeFilter;
  activeDateFilter: DateFilter | [Date, Date];
  onStatusFilterChange: (filter: TransactionStatusFilter) => void;
  onTypeFilterChange: (filter: TransactionTypeFilter) => void;
  onSortChange: (sort: SortOption) => void;
  onDateChange: (date: DateFilter | [Date, Date]) => void;
  activeSortOption: SortOption;
  resetFilters: () => void;
  total: number;
}

export default function TransactionFilters({
  activeStatusFilter,
  activeTypeFilter,
  activeDateFilter,
  onStatusFilterChange,
  onTypeFilterChange,
  onSortChange,
  onDateChange,
  activeSortOption,
  resetFilters,
  total,
}: TransactionFiltersProps) {
  const { width } = useViewportSize();
  const condenseFilters = width < 1118;

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [datePickerOpened, { open: openDatePicker, close: closeDatePicker }] =
    useDisclosure(false);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const handleDateChange = (value: [string | null, string | null]) => {
    const newRange: [Date | null, Date | null] = [
      value[0] ? dayjs(value[0]).toDate() : null,
      value[1] ? dayjs(value[1]).toDate() : null,
    ];
    setDateRange(newRange);
    if (newRange[0] && newRange[1]) {
      onDateChange(newRange as [Date, Date]);
      closeDatePicker();
    }
  };

  const isStatusFilterActive = activeStatusFilter !== "All";
  const isTypeFilterActive = activeTypeFilter !== "All";
  const isDateFilterActive = Array.isArray(activeDateFilter)
    ? activeDateFilter[0] !== null && activeDateFilter[1] !== null
    : activeDateFilter !== "All";
  const isSortActive = activeSortOption !== "Newest first";
  const isSortAscending =
    activeSortOption === "Oldest first" ||
    activeSortOption === "Amount (Low to High)";

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
                {/* Type */}
                <Menu
                  shadow="md"
                  width={170}
                  radius="md"
                  position="bottom-start"
                >
                  <Menu.Target>
                    <Indicator
                      disabled={!isTypeFilterActive}
                      color="lime"
                      position="top-end"
                      size={10}
                      offset={6}
                    >
                      <Button
                        variant="default"
                        size="sm"
                        leftSection={<ArrowLeftRightIcon size={16} />}
                        style={{ flexShrink: 0 }}
                      >
                        Type
                      </Button>
                    </Indicator>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Filter by type</Menu.Label>
                    {typeFilters.map((filter) => (
                      <Menu.Item
                        key={filter}
                        onClick={() => onTypeFilterChange(filter)}
                      >
                        <Group wrap="nowrap" gap="xs">
                          {filter}
                          {activeTypeFilter === filter && (
                            <Badge variant="light" size="sm">
                              Active
                            </Badge>
                          )}
                        </Group>
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>

                {/* Status */}
                <Menu
                  shadow="md"
                  width={170}
                  radius="md"
                  position="bottom-start"
                >
                  <Menu.Target>
                    <Indicator
                      disabled={!isStatusFilterActive}
                      color="lime"
                      position="top-end"
                      size={10}
                      offset={6}
                    >
                      <Button
                        variant="default"
                        size="sm"
                        leftSection={<CheckmarkCircle02Icon size={16} />}
                        style={{ flexShrink: 0 }}
                      >
                        Status
                      </Button>
                    </Indicator>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Filter by status</Menu.Label>
                    {statusFilters.map((filter) => (
                      <Menu.Item
                        key={filter}
                        onClick={() => onStatusFilterChange(filter)}
                      >
                        <Group wrap="nowrap" gap="xs">
                          {filter}
                          {activeStatusFilter === filter && (
                            <Badge variant="light" size="sm">
                              Active
                            </Badge>
                          )}
                        </Group>
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>

                {/* Dates */}
                <Menu
                  shadow="md"
                  width={170}
                  radius="md"
                  position="bottom-start"
                >
                  <Menu.Target>
                    <Indicator
                      disabled={!isDateFilterActive}
                      color="lime"
                      position="top-end"
                      size={10}
                      offset={6}
                    >
                      <Button
                        size="sm"
                        variant="default"
                        leftSection={<Calendar02Icon size={16} />}
                      >
                        Dates
                      </Button>
                    </Indicator>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Filter by date</Menu.Label>
                    <Menu.Item
                      onClick={() => {
                        onDateChange("All");
                        setDateRange([null, null]);
                      }}
                    >
                      Show all
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      onClick={() => {
                        onDateChange("Today");
                        setDateRange([null, null]);
                      }}
                    >
                      <Group gap="xs">
                        Today
                        {activeDateFilter === "Today" && (
                          <Badge variant="light" size="sm">
                            Active
                          </Badge>
                        )}
                      </Group>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        onDateChange("This week");
                        setDateRange([null, null]);
                      }}
                    >
                      <Group gap="xs">
                        This week
                        {activeDateFilter === "This week" && (
                          <Badge variant="light" size="sm">
                            Active
                          </Badge>
                        )}
                      </Group>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        onDateChange("This month");
                        setDateRange([null, null]);
                      }}
                    >
                      <Group gap="xs">
                        This month
                        {activeDateFilter === "This month" && (
                          <Badge variant="light" size="sm">
                            Active
                          </Badge>
                        )}
                      </Group>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item onClick={openDatePicker}>
                      <Stack gap={4}>
                        <Group gap="xs">
                          Custom
                          {Array.isArray(activeDateFilter) && (
                            <Badge variant="light" size="sm">
                              Active
                            </Badge>
                          )}
                        </Group>
                        {Array.isArray(activeDateFilter) && dateFilterLabel && (
                          <Text size="sm" c="dimmed">
                            {dateFilterLabel}
                          </Text>
                        )}
                      </Stack>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                {/* Amount */}
                <Menu
                  shadow="md"
                  width={170}
                  radius="md"
                  position="bottom-start"
                >
                  <Menu.Target>
                    <Indicator
                      disabled
                      color="lime"
                      position="top-end"
                      size={10}
                      offset={6}
                    >
                      <Button
                        size="sm"
                        variant="default"
                        leftSection={<CoinsDollarIcon size={16} />}
                      >
                        Amount
                      </Button>
                    </Indicator>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Filter by amount</Menu.Label>
                    <Menu.Item>Show all</Menu.Item>
                    <Menu.Divider />
                    Slider components
                  </Menu.Dropdown>
                </Menu>

                {/* Contacts */}
                <Menu
                  shadow="md"
                  width={170}
                  radius="md"
                  position="bottom-start"
                >
                  <Menu.Target>
                    <Indicator
                      disabled
                      color="lime"
                      position="top-end"
                      size={10}
                      offset={6}
                    >
                      <Button
                        size="sm"
                        variant="default"
                        leftSection={<UserMultiple02Icon size={16} />}
                      >
                        Contacts
                      </Button>
                    </Indicator>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Filter by contact</Menu.Label>
                    <Menu.Item>Show all</Menu.Item>
                    <Menu.Divider />
                    Contacts list
                  </Menu.Dropdown>
                </Menu>
              </Group>
            )}

            {/* Right side */}
            <Group wrap="nowrap" gap="sm" pr="sm">
              {/* Sort */}
              <Menu shadow="md" width={180} radius="md" position="bottom-end">
                <Menu.Target>
                  <Indicator
                    disabled={!isSortActive}
                    color="lime"
                    position="top-end"
                    size={10}
                    offset={6}
                  >
                    <Button
                      size="sm"
                      variant="default"
                      rightSection={
                        isSortAscending ? (
                          <SortByUp01Icon size={16} />
                        ) : (
                          <SortByDown01Icon size={16} />
                        )
                      }
                    >
                      Sort
                    </Button>
                  </Indicator>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Sort by</Menu.Label>
                  <Menu.Item onClick={() => onSortChange("Newest first")}>
                    Newest first
                  </Menu.Item>
                  <Menu.Item onClick={() => onSortChange("Oldest first")}>
                    Oldest first
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => onSortChange("Amount (High to Low)")}
                  >
                    Amount (High to Low)
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => onSortChange("Amount (Low to High)")}
                  >
                    Amount (Low to High)
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              {/* Options */}
              <Menu shadow="md" width={180} radius="md" position="bottom-end">
                <Menu.Target>
                  <Tooltip position="left" label="Options">
                    <ActionIcon
                      aria-label="Options"
                      variant="subtle"
                      color="gray"
                      size="lg"
                    >
                      <MoreVerticalCircle01Icon size={24} />
                    </ActionIcon>
                  </Tooltip>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Options</Menu.Label>
                  <Menu.Item leftSection={<FileExportIcon size={16} />}>
                    Export as PDF
                  </Menu.Item>
                  <Menu.Item leftSection={<FileDownloadIcon size={16} />}>
                    Download as CSV
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={<SearchRemoveIcon size={16} />}
                    onClick={resetFilters}
                  >
                    Clear all filters
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
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
        onStatusFilterChange={onStatusFilterChange}
        onTypeFilterChange={onTypeFilterChange}
        onDateChange={onDateChange}
        total={total}
        resetFilters={resetFilters}
      />

      <Modal
        opened={datePickerOpened}
        onClose={closeDatePicker}
        title="Select date range"
        centered
        size="auto"
      >
        <Center>
          <DatePicker
            size="lg"
            type="range"
            value={
              dateRange.map((d) =>
                d ? dayjs(d).format("YYYY-MM-DD") : null
              ) as [string | null, string | null]
            }
            onChange={handleDateChange}
          />
        </Center>
      </Modal>
    </>
  );
}
