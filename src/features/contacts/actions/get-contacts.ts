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
    console.log("getContacts: No user found.");
    return [];
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
    return [];
  }

  const allContacts: Contact[] = (userContacts || [])
    .map((uc) => {
      const profile = Array.isArray(uc.profiles) ? uc.profiles[0] : uc.profiles;
      const business = Array.isArray(uc.businesses)
        ? uc.businesses[0]
        : uc.businesses;

      if (profile && profile.id) {
        return {
          id: profile.id,
          contactType: ContactType.Person,
          full_name: profile.full_name,
          email: profile.email,
          phone_number: profile.phone_number,
          avatar_url: profile.avatar_url,
          username: profile.username,
          favorite: uc.is_favorite || false,
        } as PersonContact;
      }

      if (business && business.id) {
        return {
          id: business.id,
          contactType: ContactType.Business,
          business_name: business.business_name,
          email: business.email,
          phone_number: business.phone_number,
          avatar_url: business.avatar_url,
          username: business.username,
          favorite: uc.is_favorite || false,
        } as BusinessContact;
      }

      return null;
    })
    .filter((c): c is Contact => c !== null);

  // Map to de-duplicate intelligently, prioritizing favorites.
  const uniqueContactsMap = new Map<string, Contact>();
  for (const contact of allContacts) {
    const existingContact = uniqueContactsMap.get(contact.id);
    // If we haven't seen this contact OR if the new one is a favorite
    // and the old one wasn't, we add/update it in the map.
    if (!existingContact || (!existingContact.favorite && contact.favorite)) {
      uniqueContactsMap.set(contact.id, contact);
    }
  }

  const uniqueContacts = Array.from(uniqueContactsMap.values());

  return uniqueContacts.sort((a, b) => {
    const nameA =
      a.contactType === ContactType.Person ? a.full_name : a.business_name;
    const nameB =
      b.contactType === ContactType.Person ? b.full_name : b.business_name;
    return (nameA || "").localeCompare(nameB || "");
  });
}
