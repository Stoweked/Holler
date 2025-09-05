// src/features/contacts/hooks/useContacts.ts
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/contexts/ProfileContext";
import { Contact } from "../types/contact";

// Create the Supabase client once at the module level, not inside the hook
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

      // Fetch all profiles except the current user's
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, email, phone_number, avatar_url")
        .neq("id", user.id);

      // Fetch all businesses
      const { data: businesses, error: businessError } = await supabase
        .from("businesses")
        .select("id, business_name, email, phone_number, avatar_url");

      // Fetch the businesses the current user is an admin of
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
          type: "profile",
        })) || [];

      // Filter out businesses the user is a member of
      const businessContacts: Contact[] =
        businesses
          ?.filter((b) => !userBusinessIds.has(b.id))
          .map((b) => ({
            ...b,
            full_name: b.business_name,
            type: "business",
          })) || [];

      // Combine, sort, and set the contacts
      const allContacts = [...profileContacts, ...businessContacts].sort(
        (a, b) => (a.full_name || "").localeCompare(b.full_name || "")
      );

      setContacts(allContacts);
      setLoading(false);
    };

    fetchContacts();
  }, [user]); // Supabase client is stable now and can be removed from dependencies

  return { contacts, loading };
}
