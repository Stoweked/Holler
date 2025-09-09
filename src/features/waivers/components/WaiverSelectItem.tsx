// src/features/waivers/components/WaiverSelectItem.tsx
import { Waiver } from "@/features/waivers/types/waiver";
import { Badge, Group, Stack, Title } from "@mantine/core";
import { PlusSignIcon } from "hugeicons-react";

interface WaiverSelectItemProps {
  waiver: Waiver;
}

export default function WaiverSelectItem({ waiver }: WaiverSelectItemProps) {
  const capitalize = (s: string) => {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <Group wrap="nowrap" gap="xs" justify="space-between">
      <Stack gap={8}>
        <Group gap="xs">
          <Badge
            variant="light"
            size="sm"
            color={waiver.type === "conditional" ? "cyan" : "orange"}
          >
            {capitalize(waiver.type)}
          </Badge>
          <Badge
            variant="light"
            size="sm"
            color={waiver.payment_type === "progress" ? "indigo" : "red"}
          >
            {capitalize(waiver.payment_type)}
          </Badge>
        </Group>
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
