// src/features/settings/components/sections/business/BusinessProfileView.tsx
import {
  Avatar,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Location01Icon, TelephoneIcon } from "hugeicons-react";
import { getInitials } from "@/lib/hooks/getInitials";
import { Profile } from "@/features/settings/types/account";

interface ProfileViewProps {
  profile: Profile | null;
  onEdit: () => void;
}

export default function BusinessProfileView({
  profile,
  onEdit,
}: ProfileViewProps) {
  const initials = getInitials(profile?.business_name);

  return (
    <Stack>
      <Group align="center" justify="space-between" wrap="nowrap">
        <Title order={5}>Business Profile</Title>
        <Button size="compact-sm" variant="subtle" onClick={onEdit}>
          Edit
        </Button>
      </Group>
      <Group>
        <Avatar src={profile?.avatar_url} color="lime" size="lg" radius="xl">
          {initials}
        </Avatar>
        <Stack gap={0}>
          <Title order={3}>{profile?.business_name}</Title>
          <Group gap="xs">
            <Text size="sm">{profile?.email}</Text>
          </Group>
        </Stack>
      </Group>
      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="lg">
        <Group gap="sm" wrap="nowrap">
          <TelephoneIcon size={20} color="gray" />
          <Stack gap={0}>
            <Text size="sm" c="dimmed">
              Phone
            </Text>
            <Text fw={500}>{profile?.phone_number || "Not provided"}</Text>
          </Stack>
        </Group>
        <Group gap="sm" wrap="nowrap">
          <Location01Icon size={20} color="gray" />
          <Stack gap={0}>
            <Text size="sm" c="dimmed">
              Address
            </Text>
            <Text fw={500}>
              {profile?.address1
                ? `${profile.address1}, ${profile.city}, ${profile.state} ${profile.zip}`
                : "Not provided"}
            </Text>
          </Stack>
        </Group>
      </SimpleGrid>
    </Stack>
  );
}
