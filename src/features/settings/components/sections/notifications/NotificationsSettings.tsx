import { Skeleton, Space, Stack } from "@mantine/core";
import SectionHeader from "../SectionHeader";

export function NotificationsSettings() {
  return (
    <Stack gap="lg">
      <SectionHeader
        heading="Notifications"
        subHeading="Manage your notification preferences."
      />
      <Skeleton height={200} radius="lg" />
      <Skeleton height={200} radius="lg" />
      <Skeleton height={200} radius="lg" />
      <Space h={100} />
    </Stack>
  );
}
