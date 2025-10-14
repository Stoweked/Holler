// src/features/contacts/actions/search-global-contacts.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import {
  Contact,
  ContactType,
  PersonContact,
  BusinessContact,
} from "@/features/contacts/types/contact";

export async function searchGlobalContacts(
  searchTerm: string
): Promise<Contact[]> {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return []; // Don't search if the term is too short
  }

  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Query the contacts_view which combines profiles and businesses
  const { data, error } = await supabase
    .from("contacts_view")
    .select("*")
    // Use .or() to search across multiple columns
    .or(
      `full_name.ilike.%${searchTerm}%,business_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,username.ilike.%${searchTerm}%,phone_number.ilike.%${searchTerm}%`
    )
    .neq("id", user.id) // Exclude the current user from results
    .limit(20); // Limit results for performance

  if (error) {
    console.error("Error searching global contacts:", error);
    throw new Error("Failed to search contacts");
  }

  const searchResults: Contact[] =
    data?.map((c) => {
      if (c.contactType === "person") {
        return {
          id: c.id,
          contactType: ContactType.Person,
          full_name: c.full_name,
          email: c.email,
          phone_number: c.phone_number,
          avatar_url: c.avatar_url,
          username: c.username,
        } as PersonContact;
      }
      return {
        id: c.id,
        contactType: ContactType.Business,
        business_name: c.business_name,
        email: c.email,
        phone_number: c.phone_number,
        avatar_url: c.avatar_url,
        username: c.username,
      } as BusinessContact;
    }) || [];

  return searchResults;
}
