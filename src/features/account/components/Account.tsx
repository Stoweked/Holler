import { Space, Stack } from "@mantine/core";
import ProfileCard from "./profile/ProfileCard";
import ColorModeCard from "./ColorModeCard";
import ResetPasswordCard from "./ResetPasswordCard";
import DeleteAccountCard from "./DeleteAccountCard";
import SectionHeader from "../../settings/components/SectionHeader";

export default function Account() {
  return (
    <Stack gap="lg">
      <SectionHeader
        heading="Your account"
        subHeading=" Manage your account and profile."
      />
      <ProfileCard />
      <ColorModeCard />
      <ResetPasswordCard />
      <DeleteAccountCard />
      <Space h={100} />
    </Stack>
  );
}
