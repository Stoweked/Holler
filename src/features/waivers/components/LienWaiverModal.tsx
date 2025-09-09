// src/features/waivers/components/LienWaiverModal.tsx
import { Modal, Group, Badge, Stack, Title } from "@mantine/core";
import { Waiver } from "@/features/waivers/types/waiver";
import { capitalize } from "@/lib/hooks/textUtils";
import classes from "./Waivers.module.css";

interface LienWaiverModalProps {
  opened: boolean;
  onClose: () => void;
  waiver: Waiver | null;
}

export default function LienWaiverModal({
  opened,
  onClose,
  waiver,
}: LienWaiverModalProps) {
  if (!waiver) {
    return null;
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Lien waiver"
      centered
      size="lg"
    >
      <Stack>
        <Group>
          <Badge
            variant="light"
            size="lg"
            color={waiver.type === "conditional" ? "cyan" : "orange"}
          >
            {capitalize(waiver.type)}
          </Badge>
          <Badge
            variant="light"
            size="lg"
            color={waiver.payment_type === "progress" ? "indigo" : "red"}
          >
            {capitalize(waiver.payment_type)}
          </Badge>
        </Group>

        <Title order={3}>{waiver.title}</Title>

        <div
          className={classes.renderedContent}
          dangerouslySetInnerHTML={{ __html: waiver.content }}
        />
      </Stack>
    </Modal>
  );
}
