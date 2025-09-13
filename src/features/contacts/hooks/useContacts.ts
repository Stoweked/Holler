// src/features/contacts/hooks/useContacts.ts
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/contexts/ProfileContext";
import {
  Contact,
  ContactType,
  PersonContact,
  BusinessContact,
} from "../types/contact";

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
        .select("id, full_name, email, phone_number, avatar_url, username")
        .neq("id", user.id);

      const { data: businesses, error: businessError } = await supabase
        .from("businesses")
        .select("id, business_name, email, phone_number, avatar_url, username");

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

      const profileContacts: PersonContact[] =
        profiles?.map((p) => ({
          id: p.id,
          contactType: ContactType.Person,
          full_name: p.full_name,
          email: p.email,
          phone_number: p.phone_number,
          avatar_url: p.avatar_url,
          username: p.username,
        })) || [];

      const businessContacts: BusinessContact[] =
        businesses
          ?.filter((b) => !userBusinessIds.has(b.id))
          .map((b) => ({
            id: b.id,
            contactType: ContactType.Business,
            business_name: b.business_name,
            email: b.email,
            phone_number: b.phone_number,
            avatar_url: b.avatar_url,
            username: b.username,
          })) || [];

      const allContacts: Contact[] = [
        ...profileContacts,
        ...businessContacts,
      ].sort((a, b) => {
        const nameA =
          a.contactType === ContactType.Person ? a.full_name : a.business_name;
        const nameB =
          b.contactType === ContactType.Person ? b.full_name : b.business_name;
        return (nameA || "").localeCompare(nameB || "");
      });

      setContacts(allContacts);
      setLoading(false);
    };

    fetchContacts();
  }, [user]);

  return { contacts, loading };
}
