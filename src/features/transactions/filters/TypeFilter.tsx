// src/features/transactions/filters/TypeFilter.tsx

import { Menu, Indicator, Button, Badge, Group } from "@mantine/core";
import { ArrowLeftRightIcon } from "hugeicons-react";
import { TransactionTypeFilter } from "../types/transaction";

interface TypeFilterProps {
  activeTypeFilter: TransactionTypeFilter;
  onTypeFilterChange: (filter: TransactionTypeFilter) => void;
  typeFilters: TransactionTypeFilter[];
}

export function TypeFilter({
  activeTypeFilter,
  onTypeFilterChange,
  typeFilters,
}: TypeFilterProps) {
  const isTypeFilterActive = activeTypeFilter !== "All";

  return (
    <Menu shadow="md" width={170} radius="md" position="bottom-start">
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
          <Menu.Item key={filter} onClick={() => onTypeFilterChange(filter)}>
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
  );
}
