import {
  Group,
  Stack,
  Text,
  ThemeIcon,
  Paper,
  Menu,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import classes from "./Banks.module.css";
import { Recipient } from "../contacts/types";
import {
  BankIcon,
  MoreVerticalCircle01Icon,
  PencilEdit02Icon,
} from "hugeicons-react";

interface BankDetailsCardProps {
  bank: Recipient;
  label: string;
  onEdit?: () => void;
}

export default function BankDetailsCard({
  bank,
  label,
  onEdit,
}: BankDetailsCardProps) {
  return (
    <Paper withBorder radius="lg" p="xs" w="100%">
      <Group gap="xs" className={classes.recipientContainer}>
        <Group wrap="nowrap" gap={8} className={classes.recipientDetailsGroup}>
          <ThemeIcon variant="default" radius="xl" size="lg">
            <BankIcon size={18} />
          </ThemeIcon>
          <Stack gap={0} className={classes.recipientTextContainer}>
            <Text size="sm" c="dimmed">
              {label}
            </Text>
            <Text fw={500} lineClamp={3} lh={1.2}>
              {bank.name}
            </Text>
            <Text
              size="xs"
              c="dimmed"
              lineClamp={1}
              className={classes.detailsText}
            >
              {bank.details}
            </Text>
          </Stack>
        </Group>
        <Menu shadow="md" width={150} position="bottom-end" radius="md">
          <Menu.Target>
            <Tooltip position="left" label="Change bank">
              <ActionIcon
                aria-label="Change bank"
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
              Change bank
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
}
