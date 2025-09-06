import { Space, Stack } from "@mantine/core";
import SectionHeader from "../SectionHeader";
import BusinessProfileCard from "@/features/business/components/BusinessProfileCard";

export function BusinessSettings() {
  return (
    <Stack gap="lg">
      <SectionHeader
        heading="Your business"
        subHeading="Manage your Holler business profile."
      />
      <BusinessProfileCard />
      <Space h={100} />
    </Stack>
  );
}
