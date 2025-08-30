import { Waiver } from "@/features/waivers/types/waiver";
import { Badge, Group, Stack, Title } from "@mantine/core";
import { PlusSignIcon } from "hugeicons-react";

interface WaiverSelectItemProps {
  waiver: Waiver;
}

export default function WaiverSelectItem({ waiver }: WaiverSelectItemProps) {
  return (
    <Group wrap="nowrap" gap="xs" justify="space-between">
      <Stack gap={8}>
        <Badge
          variant="light"
          size="sm"
          color={waiver.type === "conditional" ? "cyan" : "orange"}
        >
          {waiver.type}
        </Badge>
        <Stack gap={4} style={{ overflow: "hidden" }}>
          <Title order={6} lineClamp={2} lh={1.2}>
            {waiver.title}
          </Title>
        </Stack>
      </Stack>

      <PlusSignIcon size={20} color="gray" style={{ flexShrink: 0 }} />
    </Group>
  );
}
