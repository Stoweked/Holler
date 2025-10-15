// src/features/contacts/hooks/useContacts.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { Contact } from "../types/contact";
import { getContacts } from "../actions/get-contacts";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return { contacts, loading, refetchContacts: fetchContacts };
}
