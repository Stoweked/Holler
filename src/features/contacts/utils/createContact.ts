import { Contact, ContactType, PersonContact } from "../types/contact";
import { Profile } from "@/features/account/types/account";

/**
 * Creates a temporary Contact object from a user's profile data.
 * This is used to represent the current user ("self") as a contact party.
 */
export function createContactFromProfile(profile: Profile): Contact {
  const selfAsContact: PersonContact = {
    id: profile.id,
    contactType: ContactType.Person,
    full_name: profile.full_name || "You",
    email: profile.email,
    avatar_url: profile.avatar_url,
    username: profile.username,
    favorite: false, // A user cannot be their own favorite.
  };
  return selfAsContact;
}

/**
 * Creates a temporary Contact object for a newly invited person.
 * This is used when sending money to someone who isn't in the contact list yet.
 */
export function createTemporaryContact(
  method: "email" | "phone",
  value: string,
  fullName: string
): Contact {
  const newContact: PersonContact = {
    id: `new-${Date.now()}`, // A temporary ID for local state management
    contactType: ContactType.Person,
    full_name: fullName,
    email: method === "email" ? value : "",
    phone_number: method === "phone" ? value : "",
    username: undefined,
    favorite: false, // New contacts are not favorites by default.
  };
  return newContact;
}
