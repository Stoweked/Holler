// src/features/transactions/components/filters/TransactionFiltersDrawer.tsx
import {
  TransactionStatusFilter,
  TransactionTypeFilter,
  DateFilter,
} from "@/features/transactions/types/transaction";
import {
  Button,
  Center,
  Combobox,
  Drawer,
  Group,
  InputBase,
  Modal,
  NumberInput,
  RangeSlider,
  Select,
  Space,
  Stack,
  Text,
  useCombobox,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useState } from "react";

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

interface TransactionFiltersDrawerProps {
  opened: boolean;
  onClose: () => void;
  activeStatusFilter: TransactionStatusFilter;
  activeTypeFilter: TransactionTypeFilter;
  activeDateFilter: DateFilter | [Date, Date];
  activeAmountFilter: [number, number];
  onStatusFilterChange: (filter: TransactionStatusFilter) => void;
  onTypeFilterChange: (filter: TransactionTypeFilter) => void;
  onDateChange: (date: DateFilter | [Date, Date]) => void;
  onAmountFilterChange: (range: [number, number]) => void;
  total: number;
  resetFilters: () => void;
}

export default function TransactionFiltersDrawer({
  opened,
  onClose,
  activeStatusFilter,
  activeTypeFilter,
  activeDateFilter,
  activeAmountFilter,
  onStatusFilterChange,
  onTypeFilterChange,
  onDateChange,
  onAmountFilterChange,
  total,
  resetFilters,
}: TransactionFiltersDrawerProps) {
  const [datePickerOpened, { open: openDatePicker, close: closeDatePicker }] =
    useDisclosure(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const combobox = useCombobox();

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

  const getDateFilterLabel = () => {
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
    return "All";
  };

  const dateOptions = ["All", "Today", "This week", "This month", "Custom"].map(
    (item) => (
      <Combobox.Option value={item} key={item}>
        {item}
      </Combobox.Option>
    )
  );

  return (
    <>
      <Drawer
        opened={opened}
        onClose={onClose}
        title="Filters"
        position="right"
      >
        <Stack gap="lg">
          <Select
            label="Type"
            size="lg"
            radius="md"
            data={typeFilters}
            allowDeselect={false}
            value={activeTypeFilter}
            onChange={(value) =>
              onTypeFilterChange(value as TransactionTypeFilter)
            }
          />
          <Select
            label="Status"
            size="lg"
            radius="md"
            data={statusFilters}
            allowDeselect={false}
            value={activeStatusFilter}
            onChange={(value) =>
              onStatusFilterChange(value as TransactionStatusFilter)
            }
          />

          <Combobox
            size="lg"
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val: string) => {
              if (val === "Custom") {
                openDatePicker();
              } else {
                onDateChange(val as DateFilter);
              }
              combobox.closeDropdown();
            }}
          >
            <Combobox.Target>
              <InputBase
                label="Date"
                size="lg"
                radius="md"
                component="button"
                type="button"
                pointer
                rightSection={<Combobox.Chevron />}
                onClick={() => combobox.toggleDropdown()}
              >
                {getDateFilterLabel()}
              </InputBase>
            </Combobox.Target>
            <Combobox.Dropdown>
              <Combobox.Options>{dateOptions}</Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>

          <Stack gap="sm">
            <Stack gap={8}>
              <Text size="lg" fw={500}>
                Amount
              </Text>
              <RangeSlider
                min={0}
                max={250000}
                step={1000}
                value={activeAmountFilter}
                onChange={onAmountFilterChange}
                label={null}
                minRange={1000}
                px="xs"
                size="xl"
              />
            </Stack>
            <Group justify="space-between" grow>
              <NumberInput
                value={activeAmountFilter[0]}
                onChange={(val) =>
                  onAmountFilterChange([Number(val), activeAmountFilter[1]])
                }
                prefix="$"
                thousandSeparator
                step={1000}
                min={0}
                max={activeAmountFilter[1]}
                size="lg"
                radius="md"
                hideControls
              />
              <NumberInput
                value={activeAmountFilter[1]}
                onChange={(val) =>
                  onAmountFilterChange([activeAmountFilter[0], Number(val)])
                }
                prefix="$"
                thousandSeparator
                step={1000}
                min={activeAmountFilter[0]}
                max={250000}
                size="lg"
                radius="md"
                hideControls
              />
            </Group>
          </Stack>

          <Stack>
            <Button size="lg" onClick={onClose} disabled={total === 0}>
              {total > 0
                ? `Show ${total} transaction${total > 1 ? "s" : ""}`
                : "No matching transactions"}
            </Button>

            <Button variant="default" size="md" onClick={resetFilters}>
              Reset all filters
            </Button>
          </Stack>

          <Space h={100} />
        </Stack>
      </Drawer>
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
