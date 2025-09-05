import ContactsList from "@/features/contacts/components/ContactList";
import { Contact } from "../types/contact";

interface SelectContactStepProps {
  onSelectContact: (contact: Contact) => void;
}

export default function SelectContactStep({
  onSelectContact,
}: SelectContactStepProps) {
  return <ContactsList onContactClick={onSelectContact} />;
}
