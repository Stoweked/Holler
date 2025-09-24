import { Space, Stack } from "@mantine/core";
import AccountNotificationsCard from "./AccountNotificationsCard";
import SectionHeader from "@/features/settings/components/SectionHeader";

export function NotificationsSettings() {
  return (
    <Stack gap="lg">
      <SectionHeader
        heading="Notifications"
        subHeading="Manage your notification preferences."
      />
      <AccountNotificationsCard />
      <Space h={100} />
    </Stack>
  );
}
