import { useState, useEffect } from "react";
import {
  Input,
  Stack,
  Title,
  ActionIcon,
  Tooltip,
  Divider,
  Text,
  Center,
  Skeleton,
  Group,
  Button,
} from "@mantine/core";
import ContactItem from "./ContactItem";
import {
  Cancel01Icon,
  PlusSignIcon,
  Search01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";
import { Contact, ContactType } from "../types/contact";
import { useContacts } from "../hooks/useContacts";
import { useFavorites } from "../contexts/FavoritesContext";
import { addContact } from "../actions/add-contact";
import { searchGlobalContacts } from "../actions/search-global-contacts";
import { getSuggestedContacts } from "../actions/get-suggested-contacts";

interface ContactsListProps {
  onContactClick?: (contact: Contact) => void;
  onInviteNew: () => void;
}

export default function ContactsList({
  onContactClick,
  onInviteNew,
}: ContactsListProps) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Contact[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestedContacts, setSuggestedContacts] = useState<Contact[]>([]);

  // This hook fetches the user's PERSONAL contacts list
  const { contacts, loading: contactsLoading } = useContacts();
  const { favoriteContacts, loading: favoritesLoading } = useFavorites();

  // Effect to handle global search when the user types
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchValue.trim().length >= 2) {
        setIsSearching(true);
        const results = await searchGlobalContacts(searchValue);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  // Fetch suggested contacts on component mount or when contacts change
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (contacts.length < 50) {
        const suggestions = await getSuggestedContacts();
        setSuggestedContacts(suggestions);
      }
    };
    fetchSuggestions();
  }, [contacts]);

  const handleContactClick = async (contact: Contact) => {
    await addContact(contact.id, contact.contactType);
    if (onContactClick) {
      onContactClick({
        ...contact,
        favorite: favoriteContacts.has(contact.id),
      });
    }
  };

  // Logic for displaying the user's personal contacts
  const favorites = contacts.filter((c) => favoriteContacts.has(c.id));
  const otherContacts = contacts.filter((c) => !favoriteContacts.has(c.id));
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
  const isLoading = contactsLoading || favoritesLoading;

  // RENDER LOGIC
  const showSearchResults = searchValue.trim().length >= 2;
  const showSuggestions =
    suggestedContacts.length > 0 && !showSearchResults && !isLoading;

  const renderContent = () => {
    if (isLoading && !showSearchResults) {
      return (
        <Stack gap="md">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} height={60} radius="xl" w="100%" />
          ))}
        </Stack>
      );
    }

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
                  onClick={() => handleContactClick(contact)}
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

    if (contacts.length > 0 || showSuggestions) {
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
                    onClick={() => handleContactClick(contact)}
                  />
                ))}
              </Stack>
            </Stack>
          )}

          {showFavoritesDivider && <Divider my="md" />}

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
                        onClick={() => handleContactClick(contact)}
                      />
                    ))}
                  </Stack>
                </Stack>
              ))}
          </Stack>

          {showSuggestions && (
            <Stack gap="md">
              <Divider my="md" />
              <Title order={3} px="xs">
                You might know...
              </Title>
              <Stack gap={0}>
                {suggestedContacts.map((contact) => (
                  <ContactItem
                    key={`suggestion-${contact.id}`}
                    contact={contact}
                    onClick={() => handleContactClick(contact)}
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
        </Stack>
      </Center>
    );
  };

  return (
    <Stack gap="lg">
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
      </Group>
      {renderContent()}

      <Button onClick={onInviteNew} variant="light" size="lg">
        Invite new contact
      </Button>
    </Stack>
  );
}
