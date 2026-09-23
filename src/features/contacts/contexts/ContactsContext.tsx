"use client";
import { useServices } from "@/lib/services/ServicesProvider";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { Contact, ContactType } from "../types/contact";
import { notifications } from "@mantine/notifications";
import { CheckIcon } from "@mantine/core";

interface ContactsContextType {
  contacts: Contact[];
  loading: boolean;
  refetchContacts: () => Promise<void>;
  toggleFavorite: (contact: Contact) => void;
}

const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const { getContacts, toggleFavorite: toggleFavoriteAction } = useServices();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error("❌ ContactsContext: Failed to fetch contacts:", error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [getContacts]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const toggleFavorite = useCallback(
    async (contact: Contact) => {
      const name =
        contact.contactType === ContactType.Person
          ? contact.full_name
          : contact.business_name;

      const result = await toggleFavoriteAction(
        contact.id,
        contact.contactType,
        contact.favorite
      );

      if (result.error) {
        notifications.show({
          title: "Error",
          message: `Could not update ${name}'s favorite status.`,
          color: "red",
        });
      } else {
        notifications.show({
          title: "Success",
          message: contact.favorite
            ? `${name} removed from favorites.`
            : `${name} added to favorites.`,
          color: "lime",
          icon: <CheckIcon size={16} />,
        });
        fetchContacts();
      }
    },
    [fetchContacts, toggleFavoriteAction]
  );

  const value = useMemo(
    () => ({
      contacts,
      loading,
      refetchContacts: fetchContacts,
      toggleFavorite,
    }),
    [contacts, loading, fetchContacts, toggleFavorite]
  );

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
}
