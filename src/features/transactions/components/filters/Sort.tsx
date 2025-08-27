import { Menu, Indicator, Button } from "@mantine/core";
import { SortByDown01Icon, SortByUp01Icon } from "hugeicons-react";
import { SortOption } from "../../types/transaction";

interface SortProps {
  activeSortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function Sort({ activeSortOption, onSortChange }: SortProps) {
  const isSortActive = activeSortOption !== "Newest first";
  const isSortAscending =
    activeSortOption === "Oldest first" ||
    activeSortOption === "Amount (Low to High)";

  return (
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
        <Menu.Item onClick={() => onSortChange("Amount (High to Low)")}>
          Amount (High to Low)
        </Menu.Item>
        <Menu.Item onClick={() => onSortChange("Amount (Low to High)")}>
          Amount (Low to High)
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
