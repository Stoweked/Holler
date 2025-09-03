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
import { Contact } from "@/features/contacts/types/contact";

interface ContactFilterProps {
  activeContactFilter: string;
  onContactFilterChange: (contact: string) => void;
}

export function ContactFilter({
  activeContactFilter,
  onContactFilterChange,
}: ContactFilterProps) {
  const [searchValue, setSearchValue] = useState("");

  const filteredContacts = mockContacts.filter((contact: Contact) =>
    contact.full_name?.toLowerCase().includes(searchValue.toLowerCase())
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
              key={contact.id}
              onClick={() => onContactFilterChange(contact.full_name || "")}
              styles={{ item: { paddingLeft: "6px", paddingRight: "6px" } }}
            >
              <Group wrap="nowrap" gap="xs">
                <Avatar color="lime" radius="xl" size="md">
                  {contact.avatar_url || getInitials(contact.full_name)}
                </Avatar>
                <Stack gap={0}>
                  <Text size="sm" fw="bold">
                    {contact.full_name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {contact.email || contact.phone_number}
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

// Helper function to get initials from a name
const getInitials = (name: string | undefined) => {
  if (!name) return "";
  const words = name.split(" ");
  if (words.length > 1) {
    return words[0][0] + words[words.length - 1][0];
  }
  return name.substring(0, 2);
};
