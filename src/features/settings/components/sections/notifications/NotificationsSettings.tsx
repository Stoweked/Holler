import { Space, Stack } from "@mantine/core";
import SectionHeader from "../SectionHeader";
import AccountNotificationsCard from "./AccountNotificationsCard";

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
