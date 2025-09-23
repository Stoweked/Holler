// src/features/contacts/hooks/useContacts.ts
"use client";

import { useState, useEffect } from "react";
import { Contact } from "../types/contact";
import { getContacts } from "../actions/getContacts";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return { contacts, loading };
}
