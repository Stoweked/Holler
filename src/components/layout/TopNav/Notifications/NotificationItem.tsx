import {
  Group,
  Stack,
  Text,
  Title,
  UnstyledButton,
  ThemeIcon,
  Indicator,
} from "@mantine/core";
import classes from "./Notifications.module.css";
import { ReactNode } from "react";

interface NotificationItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  onClick?: () => void;
}

export default function NotificationItem({
  icon,
  title,
  description,
  timestamp,
  read,
  onClick,
}: NotificationItemProps) {
  return (
    <UnstyledButton
      className={classes.notificationButton}
      onClick={onClick}
      aria-label="View notification"
    >
      <Group gap="md" wrap="nowrap" align="flex-start">
        <ThemeIcon variant="light" size={40} radius="xl">
          {icon}
        </ThemeIcon>

        <Stack gap="xs" w="100%">
          <Title order={5} lh={1.2}>
            {title}
          </Title>
          <Text size="sm" lh={1.3}>
            {description}
          </Text>
          <Text size="xs" c="dimmed">
            {timestamp}
          </Text>
        </Stack>

        {!read && (
          <Indicator
            color="lime"
            position="middle-start"
            size={10}
            processing
          />
        )}
      </Group>
    </UnstyledButton>
  );
}
