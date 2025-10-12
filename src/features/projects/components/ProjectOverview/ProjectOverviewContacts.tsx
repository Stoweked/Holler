// src/features/projects/components/ProjectContacts.tsx
"use client";

import { Button, Group, Paper, Stack, Title } from "@mantine/core";
import { Project } from "../../types/project";
import ContactDetailsCard from "@/features/contacts/components/ContactDetailsCard";
import { Contact } from "@/features/contacts";
import { useState } from "react";
import { mockContacts } from "@/mockData/mockContacts";
import { useDisclosure } from "@mantine/hooks";
import ContactModal from "@/features/contacts/components/ContactModal";

interface ProjectContactsProps {
  project: Project;
}

export default function ProjectOverviewContacts({
  project,
}: ProjectContactsProps) {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts.slice(0, 3)); // Mock data for now
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleViewProfile = (contact: Contact) => {
    setSelectedContact(contact);
    open();
  };

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
          {contacts.map((contact) => (
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
