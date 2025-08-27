import ContactsList from "@/features/contacts/components/ContactList";
import { mockContacts } from "@/mockData/mockContacts";

interface Contact {
  name: string;
  avatar: string;
  details: string;
  topContact?: boolean;
}

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
