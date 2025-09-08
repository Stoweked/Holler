import { Bank } from "@/features/banks/types/bank";
import { Contact, ContactType } from "@/features/contacts/types/contact";

export type TransactionParty =
  | { type: "contact"; data: Contact }
  | { type: "bank"; data: Bank }
  | { type: "self"; name: "You" }
  | { type: "wallet"; name: string }
  | { type: "external"; name: string };

export const getPartyName = (party: TransactionParty): string => {
  switch (party.type) {
    case "contact":
      if (party.data.contactType === ContactType.Person) {
        return party.data.full_name || "Unknown Contact";
      }
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
