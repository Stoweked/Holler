import { Stack, Space } from "@mantine/core";
import SectionHeader from "../../settings/components/SectionHeader";
import { BillingTable } from "@/features/billing/components/BillingTable";

export function BillingSettings() {
  return (
    <Stack gap="lg">
      <SectionHeader
        heading="Billing"
        subHeading="Review your monthly statements and transaction fees."
      />
      <BillingTable />
      <Space h={100} />
    </Stack>
  );
}
