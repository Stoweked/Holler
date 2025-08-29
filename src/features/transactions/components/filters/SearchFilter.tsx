// stoweked/holler/Holler-main/src/features/transactions/components/filters/SearchFilter.tsx
import { Button, Indicator, Menu, Stack, TagsInput } from "@mantine/core";
import { Search01Icon } from "hugeicons-react";

interface SearchFilterProps {
  searchQuery: string[];
  onSearchQueryChange: (query: string[]) => void;
}

export function SearchFilter({
  searchQuery,
  onSearchQueryChange,
}: SearchFilterProps) {
  const isSearchFilterActive = searchQuery.length > 0;

  return (
    <Menu
      shadow="md"
      width={310}
      radius="md"
      position="bottom-start"
      closeOnItemClick={false}
    >
      <Menu.Target>
        <Indicator
          disabled={!isSearchFilterActive}
          color="lime"
          position="top-end"
          size={10}
          offset={6}
        >
          <Button
            size="sm"
            variant="default"
            leftSection={<Search01Icon size={16} />}
          >
            Search
          </Button>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        <Stack p="xs" gap="xs">
          <TagsInput
            leftSection={<Search01Icon size={16} />}
            placeholder="Enter keyword"
            value={searchQuery}
            onChange={onSearchQueryChange}
            radius="md"
            size="md"
            style={{ flex: 1 }}
            acceptValueOnBlur
          />
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
