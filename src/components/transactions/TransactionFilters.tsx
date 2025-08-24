import { TransactionFilter } from "@/types/transaction";
import { Badge, Button, Group, Menu, ScrollArea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
  Calendar02Icon,
  FilterHorizontalIcon,
  Sorting01Icon,
} from "hugeicons-react";

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
  onFilterChange: (filter: TransactionFilter) => void;
  // Add props for sorting, but we'll implement the logic in the parent
  // onSortChange: (sort: string) => void;
  // onDateChange: (date: string) => void;
}

export default function TransactionFilters({
  activeFilter,
  onFilterChange,
}: TransactionFiltersProps) {
  const { width } = useViewportSize();
  const condenseFilters = width < 1290;

  // Calculate if any filter other than "All" is active
  const isFilterActive = activeFilter !== "All";
  const mainFilters = condenseFilters ? (
    // On mobile, render a dropdown Menu
    <Menu shadow="md" width={200} radius="md">
      <Menu.Target>
        <Button
          size="sm"
          variant="default"
          leftSection={<FilterHorizontalIcon size={16} />}
          style={{ flexShrink: 0 }}
          rightSection={
            isFilterActive ? (
              <Badge color="lime" variant="filled" size="sm" circle>
                1
              </Badge>
            ) : null
          }
        >
          Filters
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Filter by type</Menu.Label>
        {filters.map((filter) => (
          <Menu.Item
            key={filter}
            onClick={() => onFilterChange(filter)}
            // Highlight the currently active filter in the dropdown
            style={{
              backgroundColor:
                activeFilter === filter
                  ? "var(--mantine-color-lime-light-color)"
                  : "transparent",
            }}
          >
            {filter}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  ) : (
    // On desktop, render the full group of buttons
    <Group wrap="nowrap">
      {filters.map((filter) => (
        <Button
          size="sm"
          key={filter}
          variant={activeFilter === filter ? "primary" : "default"}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </Group>
  );

  return (
    <ScrollArea type="never" w="100%">
      <Group wrap="nowrap" justify="space-between">
        {/* Render the appropriate filter group (mobile or desktop) */}
        {mainFilters}

        {/* Right side: Date and Sort dropdowns */}
        <Group wrap="nowrap">
          {/* --- Date Filter Dropdown --- */}
          <Menu shadow="md" width={150} radius="md">
            <Menu.Target>
              <Button
                size="sm"
                variant="default"
                leftSection={<Calendar02Icon size={16} />}
              >
                Dates
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Filter by date</Menu.Label>
              <Menu.Item>Today</Menu.Item>
              <Menu.Item>This week</Menu.Item>
              <Menu.Item>This month</Menu.Item>
              <Menu.Item>This year</Menu.Item>
              <Menu.Divider />
              <Menu.Item>Custom range</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {/* --- Sort Options Dropdown --- */}
          <Menu shadow="md" width={180} radius="md">
            <Menu.Target>
              <Button
                size="sm"
                variant="default"
                rightSection={<Sorting01Icon size={16} />}
              >
                Sort
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Sort by</Menu.Label>
              <Menu.Item>Newest first</Menu.Item>
              <Menu.Item>Oldest first</Menu.Item>
              <Menu.Item>Amount (High to Low)</Menu.Item>
              <Menu.Item>Amount (Low to High)</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </ScrollArea>
  );
}
