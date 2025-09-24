// src/features/transactions/filters/StatusFilter.tsx

import { Menu, Indicator, Button, Badge, Group } from "@mantine/core";
import { CheckmarkCircle02Icon } from "hugeicons-react";
import { TransactionStatusFilter } from "../../types/transaction";

interface StatusFilterProps {
  activeStatusFilter: TransactionStatusFilter;
  onStatusFilterChange: (filter: TransactionStatusFilter) => void;
  statusFilters: TransactionStatusFilter[];
}

export function StatusFilter({
  activeStatusFilter,
  onStatusFilterChange,
  statusFilters,
}: StatusFilterProps) {
  const isStatusFilterActive = activeStatusFilter !== "All";

  return (
    <Menu shadow="md" width={170} radius="md" position="bottom-start">
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
          <Menu.Item key={filter} onClick={() => onStatusFilterChange(filter)}>
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
  );
}
