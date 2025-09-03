import { Skeleton, Stack, Title, Text } from "@mantine/core";

export function BillingSettings() {
  return (
    <Stack gap="xl">
      <Stack gap="sm">
        <Title order={3}>Billing</Title>
        <Text c="dimmed" size="sm">
          Manage your billing and payment information.
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
