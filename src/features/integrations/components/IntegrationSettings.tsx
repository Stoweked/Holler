import { Skeleton, Space, Stack } from "@mantine/core";
import SectionHeader from "@/features/settings/components/SectionHeader";
import AddNewIntegrations from "./AddNewIntegrations";

export function IntegrationSettings() {
  return (
    <Stack gap="lg">
      <SectionHeader
        heading="Your integrations"
        subHeading="Conenct and manage your third-party integrations."
      />
      <Skeleton height={300} radius="lg" />
      <AddNewIntegrations />
      <Space h={100} />
    </Stack>
  );
}
