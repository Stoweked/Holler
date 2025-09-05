// src/features/settings/components/tabs/account/profile/ProfileView.tsx
import {
  Avatar,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Badge,
} from "@mantine/core";
import {
  Calendar02Icon,
  Location01Icon,
  TelephoneIcon,
  UserStar01Icon,
} from "hugeicons-react";
import { useFormattedDate } from "@/lib/hooks/useFormattedDate";
import { getInitials } from "@/lib/hooks/getInitials";
import { Profile } from "@/features/settings/types/account";

interface ProfileViewProps {
  profile: Profile | null;
  emailPending: boolean;
  onEdit: () => void;
}

export default function ProfileView({
  profile,
  emailPending,
  onEdit,
}: ProfileViewProps) {
  const initials = getInitials(profile?.full_name);
  const formattedDob = useFormattedDate(profile?.dob);

  return (
    <Stack>
      <Group align="center" justify="space-between" wrap="nowrap">
        <Title order={5}>Profile</Title>
        <Button size="compact-sm" variant="subtle" onClick={onEdit}>
          Edit
        </Button>
      </Group>
      <Group>
        <Avatar src={profile?.avatar_url} color="lime" size="lg" radius="xl">
          {initials}
        </Avatar>
        <Stack gap={0}>
          <Title order={3}>{profile?.full_name}</Title>
          <Group gap="xs">
            <Text size="sm">{profile?.email}</Text>
            {emailPending && (
              <Badge variant="outline" color="yellow" size="xs">
                Validation pending
              </Badge>
            )}
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
          <Calendar02Icon size={20} color="gray" />
          <Stack gap={0}>
            <Text size="sm" c="dimmed">
              Date of Birth
            </Text>
            <Text fw={500}>{formattedDob || "Not provided"}</Text>
          </Stack>
        </Group>
        <Group gap="sm" wrap="nowrap">
          <UserStar01Icon size={20} color="gray" />
          <Stack gap={0}>
            <Text size="sm" c="dimmed">
              Gender
            </Text>
            <Text fw={500}>{profile?.gender || "Not provided"}</Text>
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
