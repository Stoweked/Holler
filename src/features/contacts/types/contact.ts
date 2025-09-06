// src/features/contacts/types/contact.ts
export interface Contact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  phone_number?: string;
  username?: string;
  avatar_url?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  favorite?: boolean;
  type?: "profile" | "business";
}
