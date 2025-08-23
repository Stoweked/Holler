import { Drawer, Input, Stack, Title } from "@mantine/core";
import ContactItem from "./ContactItem"; // Import the new component
import { Search01Icon } from "hugeicons-react";

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

// Mock data for contacts
const mockContacts = [
  {
    name: "John Doe",
    avatar: "JD",
    details: "123-456-7890",
    topContact: true,
  },
  {
    name: "Jane Smith",
    avatar: "JS",
    details: "jane.smith@example.com",
    topContact: true,
  },
  {
    name: "Alice Johnson",
    avatar: "AJ",
    details: "alice.j@business.com",
  },
  {
    name: "Bob Williams",
    avatar: "BW",
    details: "bob-williams",
  },
  {
    name: "Charlie Brown",
    avatar: "CB",
    details: "charlie.brown@business.com",
  },
];

export default function ContactsDrawer({
  opened,
  close,
  onContactClick,
}: ContactsDrawerProps) {
  const topContacts = mockContacts.filter((c) => c.topContact);
  const otherContacts = mockContacts.filter((c) => !c.topContact);

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
    <Drawer
      opened={opened}
      onClose={close}
      title="Contacts"
      padding="lg"
      size="md"
    >
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
    </Drawer>
  );
}
