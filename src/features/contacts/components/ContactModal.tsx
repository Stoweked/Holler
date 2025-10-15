"use client";

import {
  Stack,
  Avatar,
  Title,
  Text,
  Button,
  Group,
  Modal,
  TagsInput,
} from "@mantine/core";
import { StarIcon } from "hugeicons-react";
import { Contact, ContactType } from "../types/contact";
import { getInitials } from "@/lib/hooks/textUtils";
import { useWallet } from "@/features/wallet/contexts/WalletContext";
import { TransactionParty } from "@/features/transactions/types/transactionParty";
import { useProjects } from "@/features/projects/contexts/ProjectsContext";
import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { updateContactProjects } from "../actions/update-contact-projects";
import { useContacts } from "../contexts/ContactsContext";
// Import the addContact action
import { addContact } from "../actions/add-contact";

interface ContactModalProps {
  opened: boolean;
  close: () => void;
  contact: Contact | null;
  showButtons?: boolean;
}

interface ContactModalContentProps extends Omit<ContactModalProps, "contact"> {
  contact: Contact;
}

function ContactModalContent({
  contact,
  showButtons,
  close,
}: ContactModalContentProps) {
  const { openActionDrawer } = useWallet();
  const { projects, refetchProjects } = useProjects();
  const { contacts, toggleFavorite } = useContacts();

  // This logic remains correct for displaying the current state
  const currentContact = contacts.find((c) => c.id === contact.id) || contact;
  const isFavorite = currentContact.favorite;

  const [selectedProjects, setSelectedProjects] = useState<string[]>(
    contact.projects?.map((p) => p.name) || []
  );

  const name =
    contact.contactType === ContactType.Person
      ? contact.full_name
      : contact.business_name;

  useEffect(() => {
    const initialProjects = new Set(contact.projects?.map((p) => p.name) || []);
    return () => {
      const currentProjects = new Set(selectedProjects);
      const hasChanged =
        initialProjects.size !== currentProjects.size ||
        [...initialProjects].some((name) => !currentProjects.has(name));

      if (hasChanged) {
        const projectIdsToSave = projects
          .filter((p) => currentProjects.has(p.name))
          .map((p) => p.id);

        updateContactProjects(
          contact.id,
          contact.contactType,
          projectIdsToSave
        ).then((result) => {
          if (result.success) {
            notifications.show({
              title: "Project tags saved",
              message: `Projects updated for ${name}.`,
              color: "lime",
            });
            refetchProjects();
          } else {
            notifications.show({
              title: "Error saving project tags",
              message: result.error || "An unknown error occurred.",
              color: "red",
            });
          }
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProjects]);

  const handleToggleFavorite = async () => {
    // Ensure the contact exists in the user_contacts table. addContact will create it if it's missing, or do nothing if it's already there.
    await addContact(contact.id, contact.contactType);
    toggleFavorite(contact);
  };

  const handleSend = () => {
    const party: TransactionParty = { type: "contact", data: contact };
    openActionDrawer("send", party);
    close();
  };

  const handleRequest = () => {
    const party: TransactionParty = { type: "contact", data: contact };
    openActionDrawer("request", party);
    close();
  };

  const projectOptions = projects
    .filter((project) => !selectedProjects.includes(project.name))
    .map((item) => item.name);

  return (
    <Stack gap="xl" pb="sm">
      <Stack align="center" gap="sm">
        <Avatar
          src={contact.avatar_url}
          variant="default"
          size={100}
          radius="50%"
        >
          <Title order={1}>{getInitials(name)}</Title>
        </Avatar>

        <Button
          variant="default"
          size="compact-md"
          leftSection={
            <StarIcon
              size={16}
              color={isFavorite ? "gold" : "gray"}
              style={{ fill: isFavorite ? "currentColor" : "none" }}
            />
          }
          onClick={handleToggleFavorite}
        >
          {isFavorite ? "Favorite" : "Add to favorites"}
        </Button>
        <Stack align="center" gap={4}>
          <Title order={2} ta="center">
            {name}
          </Title>
          {contact.username && (
            <Text c="dimmed" ta="center">
              @{contact.username}
            </Text>
          )}
        </Stack>
      </Stack>

      {showButtons && (
        <Group justify="center" grow wrap="nowrap">
          <Button
            radius="xl"
            size="lg"
            variant="outline"
            onClick={handleRequest}
          >
            Request
          </Button>
          <Button radius="xl" size="lg" onClick={handleSend}>
            Send
          </Button>
        </Group>
      )}
      {projects.length > 0 && (
        <TagsInput
          label="Projects"
          size="lg"
          radius="lg"
          placeholder="Add projects"
          data={projectOptions}
          value={selectedProjects}
          onChange={setSelectedProjects}
        />
      )}
    </Stack>
  );
}

export default function ContactModal({
  opened,
  close,
  contact,
  showButtons = true,
}: ContactModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Profile"
      padding="lg"
      size="md"
      centered
    >
      {contact && (
        <ContactModalContent
          contact={contact}
          opened={opened}
          close={close}
          showButtons={showButtons}
        />
      )}
    </Modal>
  );
}
