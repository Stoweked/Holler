import {
  Group,
  Stack,
  Text,
  Menu,
  ActionIcon,
  Tooltip,
  Card,
  Avatar,
} from "@mantine/core";
import classes from "./Banks.module.css";
import {
  BankIcon,
  MoreVerticalCircle01Icon,
  PencilEdit02Icon,
} from "hugeicons-react";
import { Bank } from "../types/bank";

interface BankDetailsCardProps {
  bank: Bank;
  label: string;
  onEdit?: () => void;
}

export default function BankDetailsCard({
  bank,
  label,
  onEdit,
}: BankDetailsCardProps) {
  return (
    <Card withBorder radius="lg" p="xs" w="100%">
      <Group gap="xs" className={classes.recipientContainer}>
        <Group wrap="nowrap" gap={8} className={classes.recipientDetailsGroup}>
          <Avatar src={bank.avatar_url} variant="default" radius="xl" size={34}>
            <BankIcon size={18} />
          </Avatar>
          <Stack gap={0} className={classes.recipientTextContainer}>
            <Text size="sm" c="dimmed">
              {label}
            </Text>
            <Text fw="bold" lineClamp={3} lh={1.2}>
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

        {onEdit && (
          <Menu shadow="md" width={150} position="bottom-end" radius="md">
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
              <Menu.Item
                leftSection={<PencilEdit02Icon size={16} />}
                onClick={onEdit}
              >
                Change bank
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Card>
  );
}
