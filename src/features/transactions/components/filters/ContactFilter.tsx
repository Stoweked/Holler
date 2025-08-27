// src/features/transactions/components/filters/ContactFilter.tsx
import {
  Menu,
  Indicator,
  Button,
  TextInput,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Stack,
  CloseButton,
} from "@mantine/core";
import { UserMultiple02Icon, Search01Icon } from "hugeicons-react";
import { mockContacts } from "@/mockData/mockContacts";
import { useState } from "react";

interface ContactFilterProps {
  activeContactFilter: string;
  onContactFilterChange: (contact: string) => void;
}

export function ContactFilter({
  activeContactFilter,
  onContactFilterChange,
}: ContactFilterProps) {
  const [searchValue, setSearchValue] = useState("");

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const isContactFilterActive = activeContactFilter !== "All";

  return (
    <Menu
      shadow="md"
      width={300}
      radius="md"
      position="bottom-end"
      closeOnItemClick
    >
      <Menu.Target>
        <Indicator
          disabled={!isContactFilterActive}
          color="lime"
          position="top-end"
          size={10}
          offset={6}
        >
          <Button
            size="sm"
            variant="default"
            leftSection={<UserMultiple02Icon size={16} />}
          >
            Contacts
          </Button>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown p="sm">
        <TextInput
          placeholder="Search contacts"
          leftSection={<Search01Icon size={16} />}
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          onClick={(event) => event.stopPropagation()}
          radius="md"
          size="md"
          mb={8}
          rightSection={
            searchValue ? (
              <CloseButton
                size="sm"
                onClick={() => setSearchValue("")}
                aria-label="Clear search"
              />
            ) : null
          }
        />
        <ScrollArea h={300}>
          {filteredContacts.map((contact) => (
            <Menu.Item
              key={contact.name}
              onClick={() => onContactFilterChange(contact.name)}
              styles={{ item: { paddingLeft: "6px", paddingRight: "6px" } }}
            >
              <Group wrap="nowrap" gap="xs">
                <Avatar color="lime" radius="xl" size="md">
                  {contact.avatar}
                </Avatar>
                <Stack gap={0}>
                  <Text size="sm" fw="bold">
                    {contact.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {contact.details}
                  </Text>
                </Stack>
              </Group>
            </Menu.Item>
          ))}
        </ScrollArea>
      </Menu.Dropdown>
    </Menu>
  );
}
