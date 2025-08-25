import { TransactionFilter, DateFilter, SortOption } from "@/types/transaction";
import {
  Badge,
  Button,
  Center,
  Group,
  Indicator,
  Menu,
  Modal,
  Pill,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import {
  ArrowLeftRightIcon,
  Calendar02Icon,
  CoinsDollarIcon,
  Sorting01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import classes from "./Transactions.module.css";

dayjs.extend(isBetween);

const filters: TransactionFilter[] = [
  "All",
  "Sent",
  "Pending",
  "Received",
  "Deposited",
  "Transferred",
];

interface TransactionFiltersProps {
  activeFilter: TransactionFilter;
  activeDateFilter: DateFilter | [Date, Date];
  onFilterChange: (filter: TransactionFilter) => void;
  onSortChange: (sort: SortOption) => void;
  onDateChange: (date: DateFilter | [Date, Date]) => void;
}

export default function TransactionFilters({
  activeFilter,
  activeDateFilter,
  onFilterChange,
  onSortChange,
  onDateChange,
}: TransactionFiltersProps) {
  const { width } = useViewportSize();
  const condenseFilters = width < 1390;
  const isMobile = width < 800;
  const smallMobile = width < 350;

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

  const isFilterActive = activeFilter !== "All";
  const isDateFilterActive = Array.isArray(activeDateFilter)
    ? activeDateFilter[0] !== null && activeDateFilter[1] !== null
    : activeDateFilter !== "All";

  // Create a readable label for the active date filter
  const getDateFilterLabel = () => {
    if (!isDateFilterActive) {
      return null;
    }

    if (Array.isArray(activeDateFilter)) {
      const [start, end] = activeDateFilter;
      if (start && end) {
        const format = "M/D";
        if (dayjs(start).isSame(end, "day")) {
          return dayjs(start).format(format);
        }
        return `${dayjs(start).format(format)}-${dayjs(end).format(format)}`;
      }
    } else if (activeDateFilter !== "All") {
      return activeDateFilter;
    }

    return null;
  };

  const dateFilterLabel = getDateFilterLabel();

  const mainFilters = (
    <Menu shadow="md" width={170} radius="md" position="bottom-start">
      <Menu.Target>
        <Button
          variant="default"
          size="sm"
          leftSection={<ArrowLeftRightIcon size={16} />}
          style={{ flexShrink: 0 }}
          pr={smallMobile ? 0 : "md"}
        >
          {!smallMobile && "Status"}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Filter by status</Menu.Label>
        {filters.map((filter) => (
          <Menu.Item key={filter} onClick={() => onFilterChange(filter)}>
            <Group wrap="nowrap" gap="xs">
              {filter}
              {activeFilter === filter && (
                <Badge variant="light" size="sm">
                  Active
                </Badge>
              )}
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <>
      <ScrollArea type="never" className={classes.filterHeader}>
        <Stack gap={0}>
          <Group wrap="nowrap" justify="space-between" gap="sm" pl="sm" pt="sm">
            <Group wrap="nowrap" gap="sm">
              {mainFilters}
              {/* Dates */}
              <Menu shadow="md" width={170} radius="md" position="bottom-start">
                <Menu.Target>
                  <Button
                    size="sm"
                    variant="default"
                    pr={smallMobile ? 0 : "md"}
                    leftSection={<Calendar02Icon size={16} />}
                    rightSection={
                      dateFilterLabel && !smallMobile ? (
                        <Text style={{ whiteSpace: "nowrap" }} size="sm">
                          {dateFilterLabel}
                        </Text>
                      ) : null
                    }
                  >
                    {!smallMobile && "Dates"}
                  </Button>
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
                      onDateChange("This Week");
                      setDateRange([null, null]);
                    }}
                  >
                    <Group gap="xs">
                      This week
                      {activeDateFilter === "This Week" && (
                        <Badge variant="light" size="sm">
                          Active
                        </Badge>
                      )}
                    </Group>
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      onDateChange("This Month");
                      setDateRange([null, null]);
                    }}
                  >
                    <Group gap="xs">
                      This month
                      {activeDateFilter === "This Month" && (
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
              <Menu shadow="md" width={170} radius="md" position="bottom-start">
                <Menu.Target>
                  <Button
                    size="sm"
                    variant="default"
                    pr={smallMobile ? 0 : "md"}
                    leftSection={<CoinsDollarIcon size={16} />}
                    rightSection={
                      dateFilterLabel && !smallMobile ? (
                        <Text style={{ whiteSpace: "nowrap" }} size="sm">
                          {dateFilterLabel}
                        </Text>
                      ) : null
                    }
                  >
                    {!smallMobile && "Amount"}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Filter by amount</Menu.Label>
                  <Menu.Item
                    onClick={() => {
                      onDateChange("All");
                      setDateRange([null, null]);
                    }}
                  >
                    Show all
                  </Menu.Item>
                  <Menu.Divider />
                  Slider components
                </Menu.Dropdown>
              </Menu>

              {/* Contacts */}
              <Menu shadow="md" width={170} radius="md" position="bottom-start">
                <Menu.Target>
                  <Button
                    size="sm"
                    variant="default"
                    pr={smallMobile ? 0 : "md"}
                    leftSection={<UserMultiple02Icon size={16} />}
                    rightSection={
                      dateFilterLabel && !smallMobile ? (
                        <Text style={{ whiteSpace: "nowrap" }} size="sm">
                          {dateFilterLabel}
                        </Text>
                      ) : null
                    }
                  >
                    {!smallMobile && "Contacts"}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Filter by contact</Menu.Label>
                  <Menu.Item
                    onClick={() => {
                      onDateChange("All");
                      setDateRange([null, null]);
                    }}
                  >
                    Show all
                  </Menu.Item>
                  <Menu.Divider />
                  Contacts list
                </Menu.Dropdown>
              </Menu>
            </Group>

            <Group wrap="nowrap" gap="sm" pr="sm">
              {/* Sort */}
              <Menu shadow="md" width={180} radius="md" position="bottom-end">
                <Menu.Target>
                  <Button
                    size="sm"
                    variant="default"
                    pl={smallMobile ? 0 : "md"}
                    rightSection={<Sorting01Icon size={16} />}
                  >
                    {!smallMobile && "Sort"}
                  </Button>
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
            </Group>
          </Group>

          <Group p="sm" gap="sm">
            <Pill className={classes.filterPill} withRemoveButton>
              Sent
            </Pill>
            <Pill className={classes.filterPill} withRemoveButton>
              Jonah Stowe
            </Pill>
            <Pill className={classes.filterPill} withRemoveButton>
              $200-$400
            </Pill>
          </Group>
        </Stack>
      </ScrollArea>

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
