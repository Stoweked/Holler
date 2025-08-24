import { TransactionFilter } from "@/types/transaction";
import { Badge, Button, Group, Indicator, Menu } from "@mantine/core";
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
  const condenseFilters = width < 1390;
  const isMobile = width < 800;
  const smallMobile = width < 350;

  // Calculate if any filter other than "All" is active
  const isFilterActive = activeFilter !== "All";
  const mainFilters = condenseFilters ? (
    // On mobile, render a dropdown Menu
    <Menu shadow="md" width={170} radius="md">
      <Menu.Target>
        <Indicator
          disabled={!isFilterActive}
          color="lime"
          position="top-end"
          size={12}
          offset={7}
        >
          <Button
            variant="default"
            size={isMobile ? "sm" : "md"}
            leftSection={
              smallMobile ? null : <FilterHorizontalIcon size={16} />
            }
            style={{ flexShrink: 0 }}
          >
            Filters
          </Button>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Filter by type</Menu.Label>
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
  ) : (
    // On desktop, render the full group of buttons
    <Group wrap="nowrap" gap="sm">
      {filters.map((filter) => (
        <Button
          size={isMobile ? "sm" : "md"}
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
    <Group wrap="nowrap" justify="space-between" gap="sm">
      {/* Render the appropriate filter group (mobile or desktop) */}
      {mainFilters}

      {/* Right side: Date and Sort dropdowns */}
      <Group wrap="nowrap" gap="sm">
        {/* --- Date Filter Dropdown --- */}
        <Menu shadow="md" width={150} radius="md" position="bottom-end">
          <Menu.Target>
            <Button
              size={isMobile ? "sm" : "md"}
              variant="default"
              leftSection={smallMobile ? null : <Calendar02Icon size={16} />}
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
        <Menu shadow="md" width={180} radius="md" position="bottom-end">
          <Menu.Target>
            <Button
              size={isMobile ? "sm" : "md"}
              variant="default"
              rightSection={smallMobile ? null : <Sorting01Icon size={16} />}
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
  );
}
