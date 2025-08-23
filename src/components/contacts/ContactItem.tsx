import {
  ActionIcon,
  Avatar,
  Group,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { ArrowRight01Icon } from "hugeicons-react";
import classes from "./ContactItem.module.css";

interface ContactItemProps {
  avatar: string;
  name: string;
  details: string;
  onClick?: () => void;
}

export default function ContactItem({
  avatar,
  name,
  details,
  onClick,
}: ContactItemProps) {
  return (
    <UnstyledButton className={classes.contactItem} onClick={onClick}>
      <Group justify="space-between" wrap="nowrap">
        <Group wrap="nowrap" align="center" className={classes.contactDetails}>
          <Avatar color="lime" radius="xl" size={44}>
            {avatar}
          </Avatar>

          <Stack gap={0} style={{ overflow: "hidden" }}>
            <Title order={4} lineClamp={2}>
              {name}
            </Title>
            <Text size="sm" c="dimmed" w="100%" className={classes.detailsText}>
              {details}
            </Text>
          </Stack>
        </Group>

        <ActionIcon
          component="div"
          variant="light"
          size="xl"
          radius="xl"
          aria-label="Select contact"
        >
          <ArrowRight01Icon size={32} />
        </ActionIcon>
      </Group>
    </UnstyledButton>
  );
}
