"use client";

import {
  Button,
  Group,
  Paper,
  Stack,
  Title,
  TextInput,
  CloseButton,
} from "@mantine/core";
import { Project } from "../../types/project";
import ContactDetailsCard from "@/features/contacts/components/ContactDetailsCard";
import { Contact, ContactType, useContacts } from "@/features/contacts"; // 1. Import useContacts
import { useState, useMemo } from "react"; // 2. Import useMemo
import { useDisclosure } from "@mantine/hooks";
import ContactModal from "@/features/contacts/components/ContactModal";
import { Search01Icon } from "hugeicons-react";

interface ProjectContactsProps {
  project: Project;
}

// Helper function to get the correct name based on contact type
const getContactName = (contact: Contact): string => {
  if (contact.contactType === ContactType.Person) {
    return contact.full_name || "";
  }
  if (contact.contactType === ContactType.Business) {
    return contact.business_name || "";
  }
  return "";
};

export default function ProjectOverviewContacts({
  project,
}: ProjectContactsProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [searchValue, setSearchValue] = useState("");

  // 3. Get all contacts from the global context
  const { contacts: allContacts } = useContacts();

  // 4. Filter the global contacts to get only those associated with this project
  const projectContacts = useMemo(() => {
    if (!project || !project.id || !allContacts) {
      return [];
    }
    return allContacts.filter((contact) =>
      contact.projects?.some((p) => p.id === project.id)
    );
  }, [project, allContacts]);

  const handleViewProfile = (contact: Contact) => {
    setSelectedContact(contact);
    open();
  };

  // 5. Filter the project-specific contacts for the search input
  const filteredContacts = projectContacts.filter((contact) =>
    getContactName(contact).toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Paper withBorder radius="lg" shadow="xs" p="md">
        <Stack>
          <Group justify="space-between" wrap="nowrap">
            <Title order={5}>Associated contacts</Title>
            <Button variant="subtle" size="compact-sm">
              Add contact
            </Button>
          </Group>

          <TextInput
            radius="xl"
            size="lg"
            placeholder="Search contacts"
            leftSection={<Search01Icon size={16} />}
            value={searchValue}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            rightSection={
              searchValue ? (
                <CloseButton
                  size="md"
                  onClick={() => setSearchValue("")}
                  aria-label="Clear search"
                />
              ) : null
            }
          />

          {filteredContacts.map((contact) => (
            <ContactDetailsCard
              key={contact.id}
              contact={contact}
              label="Contact"
              onViewProfile={() => handleViewProfile(contact)}
            />
          ))}
        </Stack>
      </Paper>
      <ContactModal opened={opened} close={close} contact={selectedContact} />
    </>
  );
}
