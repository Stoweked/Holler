// src/features/contacts/types/contact.ts

// This is the main, comprehensive interface for a contact
export interface Contact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  phone_number?: string;
  username?: string;
  avatar_url?: string;
  business_name?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  topContact?: boolean;
}

// This represents any entity that can be a party in a transaction (a contact, a bank, etc.)
export interface TransactionRecipient {
  name: string;
  avatar: string;
  details: string;
}
