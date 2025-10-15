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

  const { data: userContacts, error } = await supabase
    .from("user_contacts")
    .select(
      `
      is_favorite, 
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
      const profile = Array.isArray(uc.profiles) ? uc.profiles[0] : uc.profiles;
      const business = Array.isArray(uc.businesses)
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
          favorite: uc.is_favorite,
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
          favorite: uc.is_favorite,
        } as BusinessContact;
      }

      return null;
    })
    .filter((c): c is Contact => c !== null);

  const uniqueContacts = allContacts.filter(
    (contact, index, self) =>
      index === self.findIndex((c) => c.id === contact.id)
  );

  return uniqueContacts.sort((a, b) => {
    const nameA =
      a.contactType === ContactType.Person ? a.full_name : a.business_name;
    const nameB =
      b.contactType === ContactType.Person ? b.full_name : b.business_name;
    return (nameA || "").localeCompare(nameB || "");
  });
}
