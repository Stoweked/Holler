// src/features/contacts/actions/get-contacts.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import {
  Contact,
  ContactType,
  PersonContact,
  BusinessContact,
} from "@/features/contacts/types/contact";

export async function getContacts(): Promise<Contact[]> {
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Fetch from user_contacts and join the related profile or business data
  const { data: userContacts, error } = await supabase
    .from("user_contacts")
    .select(
      `
      profiles (*),
      businesses (*)
    `
    )
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching user contacts:", error);
    throw new Error("Failed to fetch contacts");
  }

  const allContacts: Contact[] = (userContacts || [])
    .map((uc) => {
      const profile: Partial<PersonContact> | null = Array.isArray(uc.profiles)
        ? uc.profiles[0]
        : uc.profiles;
      const business: Partial<BusinessContact> | null = Array.isArray(
        uc.businesses
      )
        ? uc.businesses[0]
        : uc.businesses;

      if (profile) {
        return {
          id: profile.id,
          contactType: ContactType.Person,
          full_name: profile.full_name,
          email: profile.email,
          phone_number: profile.phone_number,
          avatar_url: profile.avatar_url,
          username: profile.username,
        } as PersonContact;
      }

      if (business) {
        return {
          id: business.id,
          contactType: ContactType.Business,
          business_name: business.business_name,
          email: business.email,
          phone_number: business.phone_number,
          avatar_url: business.avatar_url,
          username: business.username,
        } as BusinessContact;
      }

      return null;
    })
    .filter((c): c is Contact => c !== null);

  // FIX: Filter out duplicate contacts to prevent the React key error
  const uniqueContacts = allContacts.filter(
    (contact, index, self) =>
      index === self.findIndex((c) => c.id === contact.id)
  );

  // Sort the final, unique list alphabetically
  return uniqueContacts.sort((a, b) => {
    const nameA =
      a.contactType === ContactType.Person ? a.full_name : a.business_name;
    const nameB =
      b.contactType === ContactType.Person ? b.full_name : b.business_name;
    return (nameA || "").localeCompare(nameB || "");
  });
}
