import { Drawer, Space } from "@mantine/core";
import ContactsList from "./ContactList";
import { mockContacts } from "@/mockData/mockContacts";

interface Contact {
  name: string;
  avatar: string;
  details: string;
  topContact?: boolean;
}

interface ContactsDrawerProps {
  opened: boolean;
  close: () => void;
  onContactClick?: (contact: Contact) => void;
}

export default function ContactsDrawer({
  opened,
  close,
  onContactClick,
}: ContactsDrawerProps) {
  const handleContactClick = (contact: Contact) => {
    if (onContactClick) {
      onContactClick(contact);
    }
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Your contacts"
      padding="lg"
      size="md"
    >
      <ContactsList
        contacts={mockContacts}
        onContactClick={handleContactClick}
      />
      <Space h={100} />
    </Drawer>
  );
}
