import { Space, Stack } from "@mantine/core";
import ProfileCard from "./profile/ProfileCard";
import ColorModeCard from "./ColorModeCard";
import ResetPasswordCard from "./ResetPasswordCard";
import DeleteAccountCard from "./DeleteAccountCard";

export default function Account() {
  return (
    <Stack gap="lg">
      <ProfileCard />
      <ColorModeCard />
      <ResetPasswordCard />
      <DeleteAccountCard />
      <Space h={100} />
    </Stack>
  );
}
