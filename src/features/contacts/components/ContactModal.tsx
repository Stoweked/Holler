// src/features/contacts/components/ContactModal.tsx
import {
  Stack,
  Avatar,
  Title,
  Text,
  Button,
  Group,
  Modal,
} from "@mantine/core";
import { CheckmarkCircle01Icon, StarIcon } from "hugeicons-react";
import { Contact } from "../types/contact";
import { getInitials } from "@/lib/hooks/getInitials";
import { useFavorites } from "@/contexts/FavoritesContext"; // Update the import path

interface ContactModalProps {
  opened: boolean;
  close: () => void;
  contact: Contact | null;
  showButtons?: boolean;
  onSendClick?: (contact: Contact) => void;
  onRequestClick?: (contact: Contact) => void;
}

interface ContactModalContentProps extends Omit<ContactModalProps, "contact"> {
  contact: Contact;
}

function ContactModalContent({
  contact,
  showButtons,
  onSendClick,
  onRequestClick,
}: ContactModalContentProps) {
  const { favoriteContacts, toggleFavorite } = useFavorites();
  const isFavorite = favoriteContacts.has(contact.id);

  const handleToggleFavorite = () => {
    toggleFavorite(contact);
  };

  const handleSend = () => {
    if (onSendClick && contact) {
      onSendClick(contact);
    }
  };

  const handleRequest = () => {
    if (onRequestClick && contact) {
      onRequestClick(contact);
    }
  };

  return (
    <Stack gap="xl" pb="sm">
      <Stack align="center" gap="sm">
        <Avatar src={contact.avatar_url} color="lime" size={100} radius="50%">
          <Title order={1}>{getInitials(contact.full_name)}</Title>
        </Avatar>

        <Button
          variant="default"
          size="compact-md"
          leftSection={
            <StarIcon
              size={16}
              style={{ fill: isFavorite ? "currentColor" : "none" }}
            />
          }
          onClick={handleToggleFavorite}
        >
          {isFavorite ? "Favorite" : "Add to favorites"}
        </Button>
        <Stack align="center" gap={4}>
          <Title order={2} ta="center">
            {contact.full_name}
          </Title>
          <Text c="dimmed" ta="center">
            {contact.email || contact.phone_number}
          </Text>
        </Stack>
      </Stack>
      {showButtons && (
        <Group justify="center">
          <Button
            radius="xl"
            size="lg"
            variant="outline"
            onClick={handleRequest}
          >
            Request payment
          </Button>
          <Button radius="xl" size="lg" onClick={handleSend}>
            Send payment
          </Button>
        </Group>
      )}
    </Stack>
  );
}

export default function ContactModal({
  opened,
  close,
  contact,
  showButtons = true,
  onSendClick,
  onRequestClick,
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
          onSendClick={onSendClick}
          onRequestClick={onRequestClick}
        />
      )}
    </Modal>
  );
}
