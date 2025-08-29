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

interface Waiver {
  id: string;
  title: string;
  lastModified: string;
  content: string;
}

interface WaiverItemProps {
  waiver: Waiver;
  onEdit: (waiver: Waiver) => void;
}

export default function WaiverItem({ waiver, onEdit }: WaiverItemProps) {
  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    onEdit(waiver);
  };

  return (
    <UnstyledButton
      key={waiver.id}
      className={classes.item}
      onClick={() => onEdit(waiver)}
    >
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
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVerticalCircle01Icon size={24} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<PencilEdit02Icon size={16} />}
              onClick={handleEdit}
            >
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
