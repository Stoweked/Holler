// stoweked/holler/Holler-main/src/components/profile/ProfileModal.tsx
import {
  Stack,
  Avatar,
  Title,
  Text,
  Button,
  Group,
  Modal,
} from "@mantine/core";
import { StarIcon } from "hugeicons-react";

interface Contact {
  name: string;
  avatar: string;
  details: string;
  topContact?: boolean;
}

interface ContactModalProps {
  opened: boolean;
  close: () => void;
  contact: Contact | null;
  showButtons?: boolean;
  onSendClick?: (contact: Contact) => void;
  onRequestClick?: (contact: Contact) => void;
}

export default function ContactModal({
  opened,
  close,
  contact,
  showButtons = true,
  onSendClick,
  onRequestClick,
}: ContactModalProps) {
  if (!contact) {
    return null;
  }

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
    <Modal
      opened={opened}
      onClose={close}
      title="Profile"
      padding="lg"
      size="md"
      centered
    >
      <Stack gap="xl">
        <Stack align="center" gap="sm">
          <Avatar color="lime" size={100} radius="50%">
            <Title order={1}>{contact.avatar}</Title>
          </Avatar>
          <Button
            variant="default"
            size="compact-md"
            leftSection={<StarIcon size={16} />}
          >
            Favorite
          </Button>
          <Stack align="center" gap={4}>
            <Title order={2} ta="center">
              {contact.name}
            </Title>
            <Text c="dimmed" ta="center">
              {contact.details}
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
    </Modal>
  );
}
