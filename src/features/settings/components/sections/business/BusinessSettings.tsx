import { Skeleton, Space, Stack } from "@mantine/core";
import SectionHeader from "../SectionHeader";

export function BusinessSettings() {
  return (
    <Stack gap="lg">
      <SectionHeader
        heading="Your business"
        subHeading="Manage your Holler business profile."
      />
      <Skeleton height={200} radius="lg" />
      <Skeleton height={200} radius="lg" />
      <Skeleton height={200} radius="lg" />
      <Space h={100} />
    </Stack>
  );
}
