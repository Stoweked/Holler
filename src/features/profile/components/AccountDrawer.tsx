import { Profile } from "@/features/auth/types/profile";
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

interface AccountDrawerProps {
  opened: boolean;
  close: () => void;
  profile: Profile | null;
  position?: "left" | "right";
  showButtons?: boolean;
}

export default function AccountDrawer({
  opened,
  close,
  profile,
  position = "right",
  showButtons = true,
}: AccountDrawerProps) {
  if (!profile) {
    return null;
  }

  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Your account"
      padding="lg"
      size="lg"
      position={position}
    >
      <Stack gap="xl">
        <Stack align="center" gap="sm">
          <Avatar color="lime" size={100} radius="50%">
            <Title order={1}>{getInitials(profile.full_name)}</Title>
          </Avatar>
          <Stack align="center" gap={4}>
            <Title order={2} ta="center">
              {profile.full_name}
            </Title>
            <Text c="dimmed" ta="center">
              {profile.email}
            </Text>
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
