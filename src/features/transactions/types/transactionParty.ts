import { Bank } from "@/features/banks/types/bank";
import { Business } from "@/features/business/types/business";
import { Contact } from "@/features/contacts/types/contact";

// This is now the single, authoritative definition
export type TransactionParty =
  | { type: "contact"; data: Contact }
  | { type: "bank"; data: Bank }
  | { type: "business"; data: Business }
  | { type: "self"; name: "You" }
  | { type: "wallet"; name: string }
  | { type: "external"; name: string };

// Helper function to get the name from a TransactionParty object
export const getPartyName = (party: TransactionParty): string => {
  switch (party.type) {
    case "contact":
      return party.data.full_name || "Unknown Contact";
    case "business":
      return party.data.business_name || "Unknown Business";
    case "bank":
      return party.data.name;
    case "self":
    case "wallet":
    case "external":
      return party.name;
    default:
      return "";
  }
};
