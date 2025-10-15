// src/features/contacts/actions/get-suggested-contacts.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import {
  Contact,
  ContactType,
  PersonContact,
  BusinessContact,
} from "@/features/contacts/types/contact";

export async function getSuggestedContacts(): Promise<Contact[]> {
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Get a list of the current user's existing contact IDs to exclude
  const { data: existingContactsData, error: existingContactsError } =
    await supabase
      .from("user_contacts")
      .select("contact_profile_id, contact_business_id")
      .eq("user_id", user.id);

  if (existingContactsError) {
    console.error("Error fetching existing contacts:", existingContactsError);
    return [];
  }

  // FIX: Filter out null or undefined values from the list of IDs
  const existingContactIds = new Set(
    (existingContactsData || [])
      .flatMap((c) => [c.contact_profile_id, c.contact_business_id])
      .filter(Boolean) // This removes null/undefined values
  );
  existingContactIds.add(user.id);

  const directContactIds = (existingContactsData || [])
    .map((c) => c.contact_profile_id)
    .filter(Boolean); // Also filter here for safety

  let suggestions: Contact[] = [];

  // --- Primary Strategy: Contacts of Contacts ---
  if (directContactIds.length > 0) {
    const { data: suggested } = await supabase
      .from("user_contacts")
      .select("profiles(*), businesses(*)")
      .in("user_id", directContactIds)
      .not("contact_profile_id", "in", `(${[...existingContactIds].join(",")})`)
      .not(
        "contact_business_id",
        "in",
        `(${[...existingContactIds].join(",")})`
      )
      .limit(10);

    if (suggested) {
      suggestions = suggested
        .map((uc) => {
          const profile = Array.isArray(uc.profiles)
            ? uc.profiles[0]
            : uc.profiles;
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
          const business = Array.isArray(uc.businesses)
            ? uc.businesses[0]
            : uc.businesses;
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
    }
  }

  // --- Fallback Strategy ---
  if (suggestions.length === 0) {
    // Ensure the array isn't empty before making the query
    const idsToExclude = [...existingContactIds];
    if (idsToExclude.length === 0) {
      // This should not happen if a user is logged in, but as a safeguard:
      idsToExclude.push(user.id);
    }

    const { data: randomContacts } = await supabase
      .from("contacts_view")
      .select("*")
      .not("id", "in", `(${idsToExclude.join(",")})`)
      .limit(5);

    if (randomContacts) {
      suggestions = randomContacts.map((c) => {
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
      });
    }
  }

  // De-duplicate the final list
  return suggestions.filter(
    (contact, index, self) =>
      index === self.findIndex((c) => c.id === contact.id)
  );
}
