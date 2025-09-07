import {
  Avatar,
  Group,
  Stack,
  Text,
  Menu,
  ActionIcon,
  Tooltip,
  Card,
} from "@mantine/core";
import classes from "./Contacts.module.css";
import {
  MoreVerticalCircle01Icon,
  PencilEdit02Icon,
  UserIcon,
} from "hugeicons-react";
import { Contact } from "../types/contact";
import { getInitials } from "@/lib/hooks/getInitials";

interface ContactDetailsCardProps {
  contact: Contact;
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
    <Card withBorder radius="lg" p="xs" w="100%">
      <Group gap="xs" className={classes.recipientContainer} wrap="nowrap">
        <Group wrap="nowrap" gap={8} className={classes.recipientDetailsGroup}>
          <Avatar
            src={contact?.avatar_url}
            variant="light"
            color="lime"
            radius="xl"
            size={34}
          >
            {getInitials(contact?.full_name)}
          </Avatar>
          <Stack gap={0} className={classes.recipientTextContainer}>
            <Text size="sm" c="dimmed">
              {label}
            </Text>
            <Text fw={500} lineClamp={2} lh={1.2}>
              {contact.full_name}
            </Text>
            <Text
              size="xs"
              c="dimmed"
              lineClamp={1}
              className={classes.detailsText}
            >
              {contact.email || contact.phone_number || ""}
            </Text>
          </Stack>
        </Group>
        {(onEdit || onViewProfile) && (
          <Menu shadow="md" width={155} position="bottom-end" radius="md">
            <Menu.Target>
              <Tooltip position="left" label="Options">
                <ActionIcon
                  aria-label="Options"
                  size="lg"
                  variant="subtle"
                  color="gray"
                >
                  <MoreVerticalCircle01Icon size={24} />
                </ActionIcon>
              </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
              {onEdit && (
                <Menu.Item
                  leftSection={<PencilEdit02Icon size={16} />}
                  onClick={onEdit}
                >
                  Edit recipient
                </Menu.Item>
              )}
              {onViewProfile && (
                <Menu.Item
                  leftSection={<UserIcon size={16} />}
                  onClick={onViewProfile}
                >
                  View profile
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Card>
  );
}
