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
  Skeleton,
} from "@mantine/core";
import ContactItem from "./ContactItem";
import {
  Cancel01Icon,
  Search01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";
import { Contact, ContactType } from "../types/contact";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useContacts } from "../hooks/useContacts";

interface ContactsListProps {
  onContactClick?: (contact: Contact) => void;
}

export default function ContactsList({ onContactClick }: ContactsListProps) {
  const [searchValue, setSearchValue] = useState("");
  const { contacts, loading: contactsLoading } = useContacts();
  const { favoriteContacts, loading: favoritesLoading } = useFavorites();

  const handleContactClick = (contact: Contact) => {
    if (onContactClick) {
      onContactClick({
        ...contact,
        favorite: favoriteContacts.has(contact.id),
      });
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const searchTerm = searchValue.toLowerCase();
    const name =
      contact.contactType === ContactType.Person
        ? contact.full_name
        : contact.business_name;
    const email = contact.email?.toLowerCase() || "";
    const phone = contact.phone_number || "";

    return (
      name?.toLowerCase().includes(searchTerm) ||
      email.includes(searchTerm) ||
      phone.includes(searchTerm)
    );
  });

  const favorites = filteredContacts.filter((c) => favoriteContacts.has(c.id));
  const otherContacts = filteredContacts.filter(
    (c) => !favoriteContacts.has(c.id)
  );

  const groupedContacts = otherContacts.reduce((acc, contact) => {
    const name =
      contact.contactType === ContactType.Person
        ? contact.full_name
        : contact.business_name;
    const firstLetter = (name || "#")[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {} as Record<string, typeof otherContacts>);

  const showDivider = favorites.length > 0 && otherContacts.length > 0;

  if (contactsLoading || favoritesLoading) {
    return (
      <Stack gap="lg">
        <Skeleton height={60} radius="xl" w="100%" />
        <Stack gap="md">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} height={60} radius="xl" w="100%" />
          ))}
        </Stack>
      </Stack>
    );
  }

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
          {favorites.length > 0 && (
            <Stack gap={8}>
              <Title order={4} px="xs">
                Favorites
              </Title>
              <Stack gap={0}>
                {favorites.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    contact={contact}
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
                        contact={contact}
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
            {searchValue && (
              <Button
                size="lg"
                radius="xl"
                variant="default"
                fullWidth
                onClick={() => setSearchValue("")}
              >
                Clear search
              </Button>
            )}
          </Stack>
        </Center>
      )}
    </Stack>
  );
}
