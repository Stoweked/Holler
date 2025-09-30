import {
  Badge,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { PencilEdit01Icon } from "hugeicons-react";
import classes from "./Waivers.module.css";
import { Waiver } from "../types/waiver";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { capitalize } from "@/lib/hooks/textUtils";
import React from "react";

dayjs.extend(relativeTime);

interface WaiverItemProps {
  waiver: Waiver;
  onEdit: (waiver: Waiver) => void;
}

function WaiverItem({ waiver, onEdit }: WaiverItemProps) {
  return (
    <UnstyledButton
      key={waiver.id}
      className={classes.item}
      onClick={() => onEdit(waiver)}
    >
      <Group justify="space-between" wrap="nowrap">
        {/* Title */}
        <Stack gap={8}>
          <Text size="xs" c="dimmed" w="100%">
            Last modified: {dayjs(waiver.updated_at).fromNow()}
          </Text>
          <Title order={4} lineClamp={2} lh={1.2}>
            {waiver.title}
          </Title>

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
        </Stack>

        <Tooltip label="Edit waiver" position="left">
          <PencilEdit01Icon size={32} color="gray" />
        </Tooltip>
      </Group>
    </UnstyledButton>
  );
}

export default React.memo(WaiverItem);
