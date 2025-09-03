import ContactsList from "@/features/contacts/components/ContactList";
import { mockContacts } from "@/mockData/mockContacts";
import { Contact } from "../types/contact";

interface SelectContactStepProps {
  onSelectContact: (contact: Contact) => void;
}

export default function SelectContactStep({
  onSelectContact,
}: SelectContactStepProps) {
  return (
    <ContactsList contacts={mockContacts} onContactClick={onSelectContact} />
  );
}
