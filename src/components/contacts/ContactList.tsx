import { Input, Stack, Title } from "@mantine/core";
import ContactItem from "./ContactItem";
import { Search01Icon } from "hugeicons-react";

interface Contact {
  name: string;
  avatar: string;
  details: string;
  topContact?: boolean;
}

interface ContactsListProps {
  contacts: Contact[];
  onContactClick?: (contact: Contact) => void;
}

export default function ContactsList({
  contacts,
  onContactClick,
}: ContactsListProps) {
  const topContacts = contacts.filter((c) => c.topContact);
  const otherContacts = contacts.filter((c) => !c.topContact);

  // Group contacts alphabetically
  const groupedContacts = otherContacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {} as Record<string, typeof otherContacts>);

  // Default handler if onContactClick is not provided
  const handleContactClick = (contact: Contact) => {
    if (onContactClick) {
      onContactClick(contact);
    }
  };
  return (
    <Stack gap="xl">
      {/* Search Input */}
      <Input
        placeholder="Search name or number"
        leftSection={<Search01Icon size={20} />}
        radius="xl"
        size="xl"
      />

      {/* Top Contacts Section */}
      <Stack gap="md">
        <Title order={4}>Top Contacts</Title>
        {topContacts.map((contact) => (
          <ContactItem
            key={contact.name}
            avatar={contact.avatar}
            name={contact.name}
            details={contact.details}
            onClick={() => handleContactClick(contact)}
          />
        ))}
      </Stack>

      {/* Alphabetical Contacts */}
      <Stack gap="md">
        {Object.keys(groupedContacts)
          .sort()
          .map((letter) => (
            <div key={letter}>
              <Title order={5} mb="sm">
                {letter}
              </Title>
              <Stack gap="md">
                {groupedContacts[letter].map((contact) => (
                  <ContactItem
                    key={contact.name}
                    avatar={contact.avatar}
                    name={contact.name}
                    details={contact.details}
                    onClick={() => handleContactClick(contact)}
                  />
                ))}
              </Stack>
            </div>
          ))}
      </Stack>
    </Stack>
  );
}
