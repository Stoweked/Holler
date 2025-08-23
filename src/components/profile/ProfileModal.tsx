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

interface ProfileModalProps {
  opened: boolean;
  close: () => void;
  contact: Contact | null;
  showButtons?: boolean;
}

export default function ProfileModal({
  opened,
  close,
  contact,
  showButtons = true,
}: ProfileModalProps) {
  if (!contact) {
    return null;
  }

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
            <Button radius="xl" size="lg" variant="outline">
              Request payment
            </Button>
            <Button radius="xl" size="lg">
              Send payment
            </Button>
          </Group>
        )}
      </Stack>
    </Modal>
  );
}
