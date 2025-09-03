// src/features/contacts/components/ContactList.tsx

import { useState } from "react";
import {
  Input,
  Stack,
  Title,
  ActionIcon,
  Tooltip,
  Divider,
  Button,
  Text,
  Center,
} from "@mantine/core";
import ContactItem from "./ContactItem";
import {
  Cancel01Icon,
  Search01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";
import { Contact } from "../types/contact";
import { getInitials } from "@/lib/hooks/getInitials"; // Import the utility function

interface ContactsListProps {
  contacts: Contact[];
  onContactClick?: (contact: Contact) => void;
}

export default function ContactsList({
  contacts,
  onContactClick,
}: ContactsListProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleContactClick = (contact: Contact) => {
    if (onContactClick) {
      onContactClick(contact);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const searchTerm = searchValue.toLowerCase();
    const fullName = contact.full_name?.toLowerCase() || "";
    const email = contact.email?.toLowerCase() || "";
    const phone = contact.phone_number || "";

    return (
      fullName.includes(searchTerm) ||
      email.includes(searchTerm) ||
      phone.includes(searchTerm)
    );
  });

  const topContacts = filteredContacts.filter((c) => c.topContact);
  const otherContacts = filteredContacts.filter((c) => !c.topContact);

  const groupedContacts = otherContacts.reduce((acc, contact) => {
    const firstLetter = (contact.full_name || "#")[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {} as Record<string, typeof otherContacts>);

  const showDivider = topContacts.length > 0 && otherContacts.length > 0;

  return (
    <Stack gap="lg">
      <Input
        placeholder="Search name, email, or number"
        leftSection={<Search01Icon size={20} />}
        radius="xl"
        size="xl"
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        rightSection={
          searchValue && (
            <Tooltip label="Clear search" position="left">
              <ActionIcon
                onClick={() => setSearchValue("")}
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

      {filteredContacts.length > 0 ? (
        <>
          {topContacts.length > 0 && (
            <Stack gap={8}>
              <Title order={4} px="xs">
                Favorites
              </Title>
              <Stack gap={0}>
                {topContacts.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    avatar={
                      contact.avatar_url || getInitials(contact.full_name)
                    }
                    name={contact.full_name || "Unknown"}
                    details={contact.email || contact.phone_number || ""}
                    onClick={() => handleContactClick(contact)}
                  />
                ))}
              </Stack>
            </Stack>
          )}

          {showDivider && <Divider />}

          <Stack gap="lg">
            {Object.keys(groupedContacts)
              .sort()
              .map((letter) => (
                <Stack gap={8} key={letter}>
                  <Title order={4} px="xs">
                    {letter}
                  </Title>
                  <Stack gap={0}>
                    {groupedContacts[letter].map((contact) => (
                      <ContactItem
                        key={contact.id}
                        avatar={
                          contact.avatar_url || getInitials(contact.full_name)
                        }
                        name={contact.full_name || "Unknown"}
                        details={contact.email || contact.phone_number || ""}
                        onClick={() => handleContactClick(contact)}
                      />
                    ))}
                  </Stack>
                </Stack>
              ))}
          </Stack>
        </>
      ) : (
        <Center>
          <Stack align="center" mt="xl" gap="lg">
            <UserMultiple02Icon size={40} color="grey" />
            <Stack gap={0} align="center">
              <Title order={4} ta="center">
                No contacts found
              </Title>
              <Text c="dimmed" ta="center">
                Try adjusting your search or invite a new contact.
              </Text>
            </Stack>
            <Button
              size="lg"
              radius="xl"
              variant="default"
              fullWidth
              onClick={() => setSearchValue("")}
            >
              Clear search
            </Button>
          </Stack>
        </Center>
      )}
    </Stack>
  );
}
