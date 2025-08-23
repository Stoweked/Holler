import {
  Drawer,
  Stack,
  Avatar,
  Title,
  Text,
  Button,
  Group,
} from "@mantine/core";

interface Contact {
  name: string;
  avatar: string;
  details: string;
  topContact?: boolean;
}

interface ProfileDrawerProps {
  opened: boolean;
  close: () => void;
  contact: Contact | null;
  position?: "left" | "right";
  showButtons?: boolean;
}

export default function ProfileDrawer({
  opened,
  close,
  contact,
  position = "right",
  showButtons = true,
}: ProfileDrawerProps) {
  if (!contact) {
    return null;
  }

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Profile"
      padding="lg"
      size="lg"
      position={position}
    >
      <Stack gap="xl">
        <Stack align="center" gap="sm">
          <Avatar color="lime" size={100} radius="50%">
            <Title order={1}>{contact.avatar}</Title>
          </Avatar>
          <Stack align="center" gap={4}>
            <Title order={2}>{contact.name}</Title>
            <Text c="dimmed">{contact.details}</Text>
          </Stack>
        </Stack>
        {showButtons && (
          <Group grow wrap="nowrap">
            <Button radius="xl" size="lg" variant="outline">
              Request payment
            </Button>
            <Button radius="xl" size="lg">
              Send payment
            </Button>
          </Group>
        )}
      </Stack>
    </Drawer>
  );
}
