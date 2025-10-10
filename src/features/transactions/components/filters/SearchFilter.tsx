// src/features/transactions/filters/SearchFilter.tsx

import { Button, Indicator, Menu, Stack, TagsInput } from "@mantine/core";
import { Search01Icon } from "hugeicons-react";
import { useEffect, useRef, useState } from "react";

interface SearchFilterProps {
  searchQuery: string[];
  onSearchQueryChange: (query: string[]) => void;
}

export function SearchFilter({
  searchQuery,
  onSearchQueryChange,
}: SearchFilterProps) {
  const isSearchFilterActive = searchQuery.length > 0;
  const [opened, setOpened] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [opened]);

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
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
            aria-label="Search transactions"
          >
            Search
          </Button>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        <Stack p="xs" gap="xs">
          <TagsInput
            ref={inputRef}
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
