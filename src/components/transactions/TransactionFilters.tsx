import { TransactionFilter } from "@/types/transaction";
import { Button, Group } from "@mantine/core";

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
}

export default function TransactionFilters({
  activeFilter,
  onFilterChange,
}: TransactionFiltersProps) {
  return (
    <Group>
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={activeFilter === filter ? "primary" : "default"}
          size="sm"
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </Group>
  );
}
