// src/features/contacts/components/ContactList/ContactList.tsx
"use client";

import { useState, useEffect } from "react";
import { Stack, Button } from "@mantine/core";
import { Contact } from "../../types/contact";
// Import refetchContacts from the context hook
import { useContacts } from "../../contexts/ContactsContext";
import { addContact } from "../../actions/add-contact";
import { searchGlobalContacts } from "../../actions/search-global-contacts";
import { getSuggestedContacts } from "../../actions/get-suggested-contacts";
import ContactListContent from "./ContactListContent";
import ContactSearch from "./ContactSearch";

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
  const [suggestionsLoading, setSuggestionsLoading] = useState(true);
  const { contacts, loading: contactsLoading, refetchContacts } = useContacts();

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
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setSuggestionsLoading(true);
      // Fetch suggestions only if the contact list is relatively small
      if (contacts.length < 50) {
        const suggestions = await getSuggestedContacts();
        setSuggestedContacts(suggestions);
      } else {
        setSuggestedContacts([]); // Clear suggestions if the list is large
      }
      setSuggestionsLoading(false);
    };
    // Re-fetch suggestions when the main contacts list changes
    fetchSuggestions();
  }, [contacts]);

  const handleContactClick = (contact: Contact) => {
    // 1. Immediately call the callback to open the modal and close the drawer
    if (onContactClick) {
      onContactClick(contact);
    }
    // 2. Perform the add and refetch operations asynchronously in the background
    (async () => {
      const result = await addContact(contact.id, contact.contactType);
      if (result.success) {
        // Refetch contacts silently in the background
        refetchContacts();
      } else {
        console.error("Failed to add contact relation:", result.error);
        // Optionally show a non-blocking notification here
      }
    })();
  };

  const showSearchResults = searchValue.trim().length >= 2;
  const showSuggestions =
    suggestedContacts.length > 0 && !showSearchResults && !contactsLoading;

  // Determine if the suggestions divider should be shown
  const nonFavoriteContactsExist = contacts.some((c) => !c.favorite);
  const showSuggestionsDivider = showSuggestions && nonFavoriteContactsExist;

  return (
    <Stack gap="lg">
      <ContactSearch
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onInviteNew={onInviteNew}
      />
      <ContactListContent
        isLoading={contactsLoading && !showSearchResults}
        isSearching={isSearching}
        showSearchResults={showSearchResults}
        showSuggestions={showSuggestions}
        showSuggestionsDivider={showSuggestionsDivider}
        suggestionsLoading={suggestionsLoading}
        searchResults={searchResults}
        suggestedContacts={suggestedContacts}
        contacts={contacts}
        onContactClick={handleContactClick}
        onInviteNew={onInviteNew}
      />
      {/* Conditionally render Invite button only if not searching */}
      {!showSearchResults && (
        <Button onClick={onInviteNew} variant="light" size="lg">
          Invite new contact
        </Button>
      )}
    </Stack>
  );
}
