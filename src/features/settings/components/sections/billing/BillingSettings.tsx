import { Skeleton, Stack, Space } from "@mantine/core";
import SectionHeader from "../SectionHeader";

export function BillingSettings() {
  return (
    <Stack gap="lg">
      <SectionHeader
        heading="Billing"
        subHeading="Manage your billing and payment information."
      />
      <Skeleton height={200} radius="lg" />
      <Skeleton height={200} radius="lg" />
      <Skeleton height={200} radius="lg" />
      <Space h={100} />
    </Stack>
  );
}
