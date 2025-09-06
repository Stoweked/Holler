// src/features/contacts/hooks/useContacts.ts
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/contexts/ProfileContext";
import { Contact } from "../types/contact";

const supabase = createClient();

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useProfile();

  useEffect(() => {
    const fetchContacts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, email, phone_number, avatar_url")
        .neq("id", user.id);

      const { data: businesses, error: businessError } = await supabase
        .from("businesses")
        .select("id, business_name, email, phone_number, avatar_url");

      const { data: userBusinesses, error: userBusinessError } = await supabase
        .from("business_admins")
        .select("business_id")
        .eq("user_id", user.id);

      if (profileError || businessError || userBusinessError) {
        console.error(
          "Error fetching contacts:",
          profileError || businessError || userBusinessError
        );
        setContacts([]);
        setLoading(false);
        return;
      }

      const userBusinessIds = new Set(
        userBusinesses.map((ub) => ub.business_id)
      );

      const profileContacts: Contact[] =
        profiles?.map((p) => ({
          ...p,
          type: "profile", // Add type for profiles
        })) || [];

      const businessContacts: Contact[] =
        businesses
          ?.filter((b) => !userBusinessIds.has(b.id))
          .map((b) => ({
            ...b,
            full_name: b.business_name,
            type: "business", // Add type for businesses
          })) || [];

      const allContacts = [...profileContacts, ...businessContacts].sort(
        (a, b) => (a.full_name || "").localeCompare(b.full_name || "")
      );

      setContacts(allContacts);
      setLoading(false);
    };

    fetchContacts();
  }, [user]);

  return { contacts, loading };
}
