import { useState } from "react";
import {
  Input,
  Stack,
  Title,
  ActionIcon,
  Tooltip,
  Divider,
  Button,
  Text,
  Center,
} from "@mantine/core";
import ContactItem from "./ContactItem";
import {
  Cancel01Icon,
  Search01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";
import { Contact } from "@/types/recipient";

interface ContactsListProps {
  contacts: Contact[];
  onContactClick?: (contact: Contact) => void;
}

export default function ContactsList({
  contacts,
  onContactClick,
}: ContactsListProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleContactClick = (contact: Contact) => {
    if (onContactClick) {
      onContactClick(contact);
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      contact.details.toLowerCase().includes(searchValue.toLowerCase())
  );

  const topContacts = filteredContacts.filter((c) => c.topContact);
  const otherContacts = filteredContacts.filter((c) => !c.topContact);

  const groupedContacts = otherContacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {} as Record<string, typeof otherContacts>);

  const showDivider = topContacts.length > 0 && otherContacts.length > 0;

  return (
    <Stack gap="lg">
      <Input
        placeholder="Search name or number"
        leftSection={<Search01Icon size={20} />}
        radius="xl"
        size="xl"
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        rightSection={
          searchValue && (
            <Tooltip label="Clear search" position="left">
              <ActionIcon
                onClick={() => setSearchValue("")}
                variant="subtle"
                aria-label="Clear search"
                radius="xl"
                size="lg"
              >
                <Cancel01Icon size={24} />
              </ActionIcon>
            </Tooltip>
          )
        }
      />

      {/* Show content only if there are results */}
      {filteredContacts.length > 0 ? (
        <>
          {topContacts.length > 0 && (
            <Stack gap={8}>
              <Title order={4} px="xs">
                Favorites
              </Title>
              <Stack gap={0}>
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
            </Stack>
          )}

          {/* Conditionally render the divider */}
          {showDivider && <Divider />}

          <Stack gap="lg">
            {Object.keys(groupedContacts)
              .sort()
              .map((letter) => (
                <Stack gap={8} key={letter}>
                  <Title order={4} px="xs">
                    {letter}
                  </Title>
                  <Stack gap={0}>
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
                </Stack>
              ))}
          </Stack>
        </>
      ) : (
        // Show a message and a create button if no results are found
        <Center>
          <Stack align="center" mt="xl" gap="lg">
            <UserMultiple02Icon size={40} color="grey" />
            <Stack gap={0} align="center">
              <Title order={4} ta="center">
                No contacts found
              </Title>
              <Text c="dimmed" ta="center">
                Try adjusting your search or invite a new contact.
              </Text>
            </Stack>

            <Button
              size="lg"
              radius="xl"
              variant="default"
              fullWidth
              onClick={() => setSearchValue("")}
            >
              Clear search
            </Button>
          </Stack>
        </Center>
      )}
    </Stack>
  );
}
