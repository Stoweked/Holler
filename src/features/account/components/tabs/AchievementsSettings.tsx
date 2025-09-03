import { Skeleton, Stack, Title, Text } from "@mantine/core";

export function AchievementsSettings() {
  return (
    <Stack gap="xl">
      <Stack gap="sm">
        <Title order={3}>Achievements</Title>
        <Text c="dimmed" size="sm">
          View your unlocked achievements and progress.
        </Text>
      </Stack>
      <Stack>
        <Skeleton height={80} />
        <Skeleton height={80} />
        <Skeleton height={80} />
      </Stack>
    </Stack>
  );
}
