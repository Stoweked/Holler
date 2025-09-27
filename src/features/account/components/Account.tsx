import { Space, Stack } from "@mantine/core";
import { AccountUI } from ".";
import SectionHeader from "../../settings/components/SectionHeader";

export default function Account() {
  return (
    <Stack gap="lg">
      <SectionHeader
        heading="Your account"
        subHeading=" Manage your account and profile."
      />
      <AccountUI.Profile.Card />
      <AccountUI.ColorModeCard />
      <AccountUI.ResetPasswordCard />
      <AccountUI.DeleteAccountCard />
      <Space h={100} />
    </Stack>
  );
}
