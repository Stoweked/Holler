import { Stack } from "@mantine/core";
import ProfileCard from "./ProfileCard";
import ColorModeCard from "./ColorModeCard";

export default function AccountProfile() {
  return (
    <Stack>
      <ProfileCard />
      <ColorModeCard />
    </Stack>
  );
}
