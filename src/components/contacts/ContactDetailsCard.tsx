import {
  Avatar,
  Group,
  Stack,
  Text,
  Paper,
  Menu,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import classes from "./Contacts.module.css";
import { Recipient } from "../contacts/types";
import {
  MoreVerticalCircle01Icon,
  PencilEdit02Icon,
  UserIcon,
} from "hugeicons-react";

interface ContactDetailsCardProps {
  contact: Recipient;
  label: string;
  onEdit?: () => void;
  onViewProfile?: () => void;
}

export default function ContactDetailsCard({
  contact,
  label,
  onEdit,
  onViewProfile,
}: ContactDetailsCardProps) {
  return (
    <Paper withBorder radius="lg" p="xs" w="100%">
      <Group gap="xs" className={classes.recipientContainer}>
        <Group wrap="nowrap" gap={8} className={classes.recipientDetailsGroup}>
          <Avatar variant="light" color="lime" radius="xl" size={34}>
            {contact.avatar}
          </Avatar>
          <Stack gap={0} className={classes.recipientTextContainer}>
            <Text size="sm" c="dimmed">
              {label}
            </Text>
            <Text fw={500} lineClamp={2} lh={1.2}>
              {contact.name}
            </Text>
            <Text
              size="xs"
              c="dimmed"
              lineClamp={1}
              className={classes.detailsText}
            >
              {contact.details}
            </Text>
          </Stack>
        </Group>
        <Menu shadow="md" width={155} position="bottom-end" radius="md">
          <Menu.Target>
            <Tooltip position="left" label="Options">
              <ActionIcon
                aria-label="Options"
                size="lg"
                variant="subtle"
                color="grey"
              >
                <MoreVerticalCircle01Icon size={24} />
              </ActionIcon>
            </Tooltip>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<PencilEdit02Icon size={16} />}
              onClick={onEdit}
            >
              Edit recipient
            </Menu.Item>
            <Menu.Item
              leftSection={<UserIcon size={16} />}
              onClick={onViewProfile}
            >
              View profile
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
}
