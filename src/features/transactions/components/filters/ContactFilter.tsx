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
import { useState } from "react";
import { Contact, ContactType } from "@/features/contacts/types/contact";
import { getInitials } from "@/lib/hooks/textUtils";
import { useContacts } from "@/features/contacts";

interface ContactFilterProps {
  activeContactFilter: string;
  onContactFilterChange: (contact: string) => void;
}

export function ContactFilter({
  activeContactFilter,
  onContactFilterChange,
}: ContactFilterProps) {
  const [searchValue, setSearchValue] = useState("");
  const { contacts } = useContacts();
  const filteredContacts = contacts
    .filter((contact: Contact) => {
      const name =
        contact.contactType === ContactType.Person
          ? contact.full_name
          : contact.business_name;
      return name?.toLowerCase().includes(searchValue.toLowerCase());
    })
    .sort((a, b) => {
      const nameA =
        a.contactType === ContactType.Person ? a.full_name : a.business_name;
      const nameB =
        b.contactType === ContactType.Person ? b.full_name : b.business_name;
      return (nameA || "").localeCompare(nameB || "");
    });

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
            aria-label="Filter by contacts"
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
          {filteredContacts.map((contact) => {
            const name =
              contact.contactType === ContactType.Person
                ? contact.full_name
                : contact.business_name;
            return (
              <Menu.Item
                key={contact.id}
                onClick={() => onContactFilterChange(name || "")}
                styles={{ item: { paddingLeft: "6px", paddingRight: "6px" } }}
              >
                <Group wrap="nowrap" gap="xs">
                  <Avatar
                    variant="default"
                    src={contact.avatar_url}
                    radius="xl"
                    size="md"
                  >
                    {getInitials(name)}
                  </Avatar>
                  <Stack gap={0}>
                    <Text size="sm" fw="bold">
                      {name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {contact.email || contact.phone_number}
                    </Text>
                  </Stack>
                </Group>
              </Menu.Item>
            );
          })}
        </ScrollArea>
      </Menu.Dropdown>
    </Menu>
  );
}
