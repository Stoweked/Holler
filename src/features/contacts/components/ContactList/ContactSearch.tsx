"use client";

import { ActionIcon, Group, Input, Tooltip } from "@mantine/core";
import { Cancel01Icon, PlusSignIcon, Search01Icon } from "hugeicons-react";

interface ContactSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onInviteNew: () => void;
}

export default function ContactSearch({
  searchValue,
  onSearchChange,
  onInviteNew,
}: ContactSearchProps) {
  return (
    <Group wrap="nowrap" w="100%">
      <Tooltip label="Invite contact" position="right">
        <ActionIcon
          onClick={onInviteNew}
          size={50}
          radius="xl"
          aria-label="Invite contact"
        >
          <PlusSignIcon size={32} />
        </ActionIcon>
      </Tooltip>
      <Input
        w="100%"
        placeholder="Search all users or invite"
        leftSection={<Search01Icon size={20} />}
        radius="xl"
        size="lg"
        value={searchValue}
        onChange={(event) => onSearchChange(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        rightSection={
          searchValue && (
            <Tooltip label="Clear search" position="left">
              <ActionIcon
                onClick={() => onSearchChange("")}
                variant="subtle"
                aria-label="Clear search"
                radius="xl"
                size="lg"
                color="gray"
              >
                <Cancel01Icon size={24} />
              </ActionIcon>
            </Tooltip>
          )
        }
      />
    </Group>
  );
}
