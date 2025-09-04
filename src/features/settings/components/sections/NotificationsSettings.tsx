import { Skeleton, Stack, Title, Text } from "@mantine/core";

export function NotificationsSettings() {
  return (
    <Stack gap="xl">
      <Stack gap="sm">
        <Title order={3}>Notifications</Title>
        <Text c="dimmed" size="sm">
          Manage your notification preferences.
        </Text>
      </Stack>
      <Stack>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </Stack>
    </Stack>
  );
}
