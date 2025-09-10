import { Space, Stack } from "@mantine/core";
import BusinessProfileCard from "@/features/business/components/BusinessProfileCard";
import SectionHeader from "@/features/settings/components/SectionHeader";

export function BusinessSettings() {
  return (
    <Stack gap="lg">
      <SectionHeader
        heading="Business"
        subHeading="Manage your Holler business account and profile."
      />
      <BusinessProfileCard />
      <Space h={100} />
    </Stack>
  );
}
