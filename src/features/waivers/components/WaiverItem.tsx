import {
  Badge,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { ArrowRight01Icon, File01Icon } from "hugeicons-react";
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
        <Group>
          <ThemeIcon variant="default" radius="xl" size="xl">
            <File01Icon size={20} />
          </ThemeIcon>

          {/* Title */}
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
              <Title order={4} lineClamp={2} lh={1.2}>
                {waiver.title}
              </Title>
              <Text size="xs" c="dimmed" w="100%">
                Last modified: {dayjs(waiver.updated_at).fromNow()}
              </Text>
            </Stack>
          </Stack>
        </Group>

        <ArrowRight01Icon size={32} color="gray" />
      </Group>
    </UnstyledButton>
  );
}

export default React.memo(WaiverItem);
