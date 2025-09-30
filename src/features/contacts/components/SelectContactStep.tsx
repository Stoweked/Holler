import ContactsList from "@/features/contacts/components/ContactList";
import { Contact } from "../types/contact";

interface SelectContactStepProps {
  onSelectContact: (contact: Contact) => void;
  onInviteNew: () => void;
}

export default function SelectContactStep({
  onSelectContact,
  onInviteNew,
}: SelectContactStepProps) {
  return (
    <ContactsList onContactClick={onSelectContact} onInviteNew={onInviteNew} />
  );
}
