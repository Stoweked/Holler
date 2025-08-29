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

interface WaiverItemProps {
  waiver: Waiver;
  onEdit: (waiver: Waiver) => void;
}

export default function WaiverItem({ waiver, onEdit }: WaiverItemProps) {
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
            <Badge
              variant="light"
              color={waiver.type === "conditional" ? "indigo" : "orange"}
            >
              {waiver.type}
            </Badge>
            <Stack gap={4} style={{ overflow: "hidden" }}>
              <Title order={5} lineClamp={2} lh={1.2}>
                {waiver.title}
              </Title>
              <Text size="sm" c="dimmed" w="100%">
                Last modified: {waiver.lastModified}
              </Text>
            </Stack>
          </Stack>
        </Group>

        <ArrowRight01Icon size={32} color="gray" />
      </Group>
    </UnstyledButton>
  );
}
