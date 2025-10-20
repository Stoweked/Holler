"use client";

import { useState, useEffect } from "react";
import { Stack, Button } from "@mantine/core";
import { Contact } from "../../types/contact";
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

  const { contacts, loading: contactsLoading } = useContacts();

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
      if (contacts.length < 50) {
        const suggestions = await getSuggestedContacts();
        setSuggestedContacts(suggestions);
      }
      setSuggestionsLoading(false);
    };
    fetchSuggestions();
  }, [contacts]);

  const handleContactClick = async (contact: Contact) => {
    await addContact(contact.id, contact.contactType);

    if (onContactClick) {
      onContactClick(contact);
    }
  };

  const showSearchResults = searchValue.trim().length >= 2;
  const showSuggestions =
    suggestedContacts.length > 0 && !showSearchResults && !contactsLoading;
  const showSuggestionsDivider =
    suggestedContacts.length > 0 &&
    contacts.filter((c) => !c.favorite).length > 0;

  return (
    <Stack gap="lg">
      <ContactSearch
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onInviteNew={onInviteNew}
      />
      <ContactListContent
        isLoading={contactsLoading}
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
      <Button onClick={onInviteNew} variant="light" size="lg">
        Invite new contact
      </Button>
    </Stack>
  );
}
