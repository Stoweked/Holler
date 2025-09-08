// src/features/transactions/filters/DateFilter.tsx

import {
  Menu,
  Indicator,
  Button,
  Badge,
  Group,
  Stack,
  Text,
  Modal,
  Center,
} from "@mantine/core";
import { DatePicker, DatesRangeValue } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Calendar02Icon } from "hugeicons-react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DateFilter } from "../types/transaction";

interface DateFilterProps {
  activeDateFilter: DateFilter | [Date, Date];
  onDateChange: (date: DateFilter | [Date, Date]) => void;
}

export function DateFilterComponent({
  activeDateFilter,
  onDateChange,
}: DateFilterProps) {
  const [datePickerOpened, { open: openDatePicker, close: closeDatePicker }] =
    useDisclosure(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  // Sync state with prop
  useEffect(() => {
    if (Array.isArray(activeDateFilter)) {
      setDateRange(activeDateFilter);
    } else {
      setDateRange([null, null]);
    }
  }, [activeDateFilter]);

  const handleDateChange = (value: DatesRangeValue) => {
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

  const isDateFilterActive = Array.isArray(activeDateFilter)
    ? activeDateFilter[0] !== null && activeDateFilter[1] !== null
    : activeDateFilter !== "All";

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
      <Menu shadow="md" width={170} radius="md" position="bottom-start">
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
            }}
          >
            Show all
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={() => {
              onDateChange("Today");
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
              dateRange.map((d) => (d ? dayjs(d).toDate() : null)) as [
                Date | null,
                Date | null
              ]
            }
            onChange={handleDateChange}
          />
        </Center>
      </Modal>
    </>
  );
}
