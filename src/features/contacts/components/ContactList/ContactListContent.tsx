"use client";

import {
  Stack,
  Title,
  Text,
  Center,
  Skeleton,
  Button,
  Divider,
} from "@mantine/core";

import { UserMultiple02Icon } from "hugeicons-react";
import ContactItem from "./ContactItem";
import { Contact, ContactType } from "../../types/contact";

interface ContactListContentProps {
  isLoading: boolean;
  isSearching: boolean;
  showSearchResults: boolean;
  showSuggestions: boolean;
  showSuggestionsDivider: boolean;
  suggestionsLoading: boolean;
  searchResults: Contact[];
  suggestedContacts: Contact[];
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
  onInviteNew: () => void;
}

export default function ContactListContent({
  isLoading,
  isSearching,
  showSearchResults,
  showSuggestions,
  showSuggestionsDivider,
  suggestionsLoading,
  searchResults,
  suggestedContacts,
  contacts,
  onContactClick,
  onInviteNew,
}: ContactListContentProps) {
  const favorites = contacts.filter((c) => c.favorite);
  const otherContacts = contacts.filter((c) => !c.favorite);
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
  const showFavoritesDivider = favorites.length > 0 && otherContacts.length > 0;

  //   Loading skeletons
  if (isLoading && !showSearchResults) {
    return (
      <Stack gap="md">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} height={60} radius="xl" w="100%" />
        ))}
      </Stack>
    );
  }

  //   Search results
  if (showSearchResults) {
    return (
      <Stack gap={8}>
        <Title order={3} px="xs">
          Search results
        </Title>
        {isSearching && (
          <Stack gap="md">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} height={60} radius="xl" w="100%" />
            ))}
          </Stack>
        )}
        {!isSearching && searchResults.length > 0 && (
          <Stack gap={0}>
            {searchResults.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                onClick={() => onContactClick(contact)}
              />
            ))}
          </Stack>
        )}
        {!isSearching && searchResults.length === 0 && (
          <Text c="dimmed" ta="center" mt="md">
            No users found. You can invite them.
          </Text>
        )}
      </Stack>
    );
  }

  //   Favorite contacts
  if (contacts.length > 0 || showSuggestions || suggestionsLoading) {
    return (
      <>
        {favorites.length > 0 && (
          <Stack gap={8}>
            <Title order={3} px="xs">
              Favorites
            </Title>
            <Stack gap={0}>
              {favorites.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  onClick={() => onContactClick(contact)}
                />
              ))}
            </Stack>
          </Stack>
        )}

        {showFavoritesDivider && <Divider my="md" />}

        {/* Main contacts list */}
        <Stack gap="lg">
          {Object.keys(groupedContacts)
            .sort()
            .map((letter) => (
              <Stack gap={8} key={letter}>
                <Title order={3} px="xs">
                  {letter}
                </Title>
                <Stack gap={0}>
                  {groupedContacts[letter].map((contact) => (
                    <ContactItem
                      key={contact.id}
                      contact={contact}
                      onClick={() => onContactClick(contact)}
                    />
                  ))}
                </Stack>
              </Stack>
            ))}
        </Stack>

        {showSuggestionsDivider && <Divider mt="md" />}

        {/* Suggested contacts */}
        {suggestionsLoading && (
          <Stack gap={8}>
            <Title order={3} px="xs">
              You might know
            </Title>
            <Stack gap="md">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={`suggestion-loader-${i}`}
                  height={60}
                  radius="xl"
                  w="100%"
                />
              ))}
            </Stack>
          </Stack>
        )}

        {showSuggestions && (
          <Stack gap={8} mt="lg">
            <Title order={3} px="xs">
              You might know
            </Title>
            <Stack gap={0}>
              {suggestedContacts.map((contact) => (
                <ContactItem
                  key={`suggestion-${contact.id}`}
                  contact={contact}
                  onClick={() => onContactClick(contact)}
                />
              ))}
            </Stack>
          </Stack>
        )}
      </>
    );
  }

  return (
    <Center>
      <Stack align="center" mt="xl" gap="lg">
        <UserMultiple02Icon size={40} color="grey" />
        <Stack gap={0} align="center">
          <Title order={4} ta="center">
            Your contact list is empty
          </Title>
          <Text c="dimmed" ta="center">
            Search for people to add or invite a new contact.
          </Text>
        </Stack>
        <Button onClick={onInviteNew} size="lg" radius="xl" fullWidth>
          Invite a new contact
        </Button>
      </Stack>
    </Center>
  );
}
