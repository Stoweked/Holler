import { Drawer, Stack, Avatar, Title, Text } from "@mantine/core";

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
}

export default function ProfileDrawer({
  opened,
  close,
  contact,
  position = "right",
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
      <Stack align="center" gap="xl" mt="xl">
        <Avatar color="lime" size={120} radius="50%">
          <Title order={1}>{contact.avatar}</Title>
        </Avatar>
        <Stack align="center" gap={4}>
          <Title order={2}>{contact.name}</Title>
          <Text c="dimmed">{contact.details}</Text>
        </Stack>
      </Stack>
    </Drawer>
  );
}
