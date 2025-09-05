import { Space, Stack, Text, Title } from "@mantine/core";
import ProfileCard from "./profile/ProfileCard";
import ColorModeCard from "./ColorModeCard";
import ResetPasswordCard from "./ResetPasswordCard";
import DeleteAccountCard from "./DeleteAccountCard";

export default function Account() {
  return (
    <Stack gap="lg">
      <Stack gap={0} py="xs">
        <Title order={2}>Your account</Title>
        <Text c="dimmed" size="lg">
          Manage your account and profile.
        </Text>
      </Stack>
      <ProfileCard />
      <ColorModeCard />
      <ResetPasswordCard />
      <DeleteAccountCard />
      <Space h={100} />
    </Stack>
  );
}
