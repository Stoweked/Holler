// src/features/contacts/hooks/useContacts.ts
import { useState, useEffect } from "react";
import { Contact } from "../types/contact";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      const response = await fetch("/api/contacts");
      const data = await response.json();
      if (response.ok) {
        setContacts(data);
      } else {
        console.error("Failed to fetch contacts:", data.error);
        setContacts([]);
      }
      setLoading(false);
    };

    fetchContacts();
  }, []);

  return { contacts, loading };
}
