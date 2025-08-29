import {
  ActionIcon,
  Group,
  Menu,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  Delete02Icon,
  MoreVerticalCircle01Icon,
  PencilEdit02Icon,
} from "hugeicons-react";
import classes from "./Waivers.module.css";

interface WaiverItemProps {
  waiver: {
    id: string;
    title: string;
    lastModified: string;
  };
}

export default function WaiverItem({ waiver }: WaiverItemProps) {
  return (
    <UnstyledButton key={waiver.id} className={classes.item}>
      <Group justify="space-between" wrap="nowrap">
        <Stack gap={8} style={{ overflow: "hidden" }}>
          <Title order={5} lineClamp={2} lh={1.2}>
            {waiver.title}
          </Title>
          <Text size="sm" c="dimmed" w="100%">
            {waiver.lastModified}
          </Text>
        </Stack>

        <Menu shadow="md" width={110} position="bottom-end" radius="md">
          <Menu.Target>
            <ActionIcon
              component="div"
              variant="subtle"
              size="lg"
              radius="xl"
              aria-label="Options"
              color="gray"
            >
              <MoreVerticalCircle01Icon size={24} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<PencilEdit02Icon size={16} />}>
              Edit
            </Menu.Item>
            <Menu.Item leftSection={<Delete02Icon size={16} />} color="red">
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </UnstyledButton>
  );
}
