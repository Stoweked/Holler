import { Space, Stack } from "@mantine/core";
import SectionHeader from "../SectionHeader";
import BusinessProfileCard from "@/features/business/components/BusinessProfileCard";

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
