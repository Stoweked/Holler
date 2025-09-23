// src/features/settings/components/sections/notifications/NotificationsSettingsPaper.tsx
"use client";

//mantine
import { Paper, Group, Stack, Switch, Text, Title } from "@mantine/core";
//styles
import classes from "./Notifications.module.css";
import {
  BankIcon,
  ClipboardIcon,
  Money01Icon,
  Payment01Icon,
} from "hugeicons-react";

export default function AccountNotificationsPaper() {
  return (
    <Stack gap="lg">
      <Paper withBorder shadow="none" radius="lg" p="md">
        <Group justify="space-between" className={classes.switchesGroup}>
          <Stack gap="xs">
            <Money01Icon size={32} color="gray" />
            <Stack gap={0}>
              <Title order={5}>Payments</Title>
              <Text c="dimmed" fz={14}>
                Get notified when you send or receive a payment.
              </Text>
            </Stack>
          </Stack>
          <Stack className={classes.switchesWrapper}>
            <Switch
              color="green"
              size="lg"
              onLabel="ON"
              offLabel="OFF"
              value="email"
              label="Email"
              withThumbIndicator={false}
              defaultChecked
              labelPosition="right"
              classNames={{
                label: classes.notificationLabel,
              }}
            />
            <Switch
              color="green"
              size="lg"
              onLabel="ON"
              offLabel="OFF"
              value="inapp"
              label="In app"
              withThumbIndicator={false}
              defaultChecked
              labelPosition="right"
              classNames={{
                label: classes.notificationLabel,
              }}
            />
          </Stack>
        </Group>
      </Paper>

      <Paper withBorder shadow="none" radius="lg" p="md">
        <Group justify="space-between" className={classes.switchesGroup}>
          <Stack gap="xs">
            <Payment01Icon size={32} color="gray" />
            <Stack gap={0}>
              <Title order={5}>Payment requests</Title>
              <Text c="dimmed" fz={14}>
                Get notified when you send or receive a payment request.
              </Text>
            </Stack>
          </Stack>

          <Stack className={classes.switchesWrapper}>
            <Switch
              color="green"
              size="lg"
              onLabel="ON"
              offLabel="OFF"
              value="email"
              label="Email"
              withThumbIndicator={false}
              defaultChecked
              labelPosition="right"
              classNames={{
                label: classes.notificationLabel,
              }}
            />
            <Switch
              color="green"
              size="lg"
              onLabel="ON"
              offLabel="OFF"
              value="inapp"
              label="In app"
              withThumbIndicator={false}
              defaultChecked
              labelPosition="right"
              classNames={{
                label: classes.notificationLabel,
              }}
            />
          </Stack>
        </Group>
      </Paper>

      <Paper withBorder shadow="none" radius="lg" p="md">
        <Group justify="space-between" className={classes.switchesGroup}>
          <Stack gap="xs">
            <BankIcon size={32} color="gray" />
            <Stack gap={0}>
              <Title order={5}>Transfers & deposits</Title>
              <Text c="dimmed" fz={14}>
                Get notified when a transfer or deposit is initiated or
                completed.
              </Text>
            </Stack>
          </Stack>
          <Stack className={classes.switchesWrapper}>
            <Switch
              color="green"
              size="lg"
              onLabel="ON"
              offLabel="OFF"
              value="email"
              label="Email"
              withThumbIndicator={false}
              defaultChecked
              labelPosition="right"
              classNames={{
                label: classes.notificationLabel,
              }}
            />
            <Switch
              color="green"
              size="lg"
              onLabel="ON"
              offLabel="OFF"
              value="inapp"
              label="In app"
              withThumbIndicator={false}
              defaultChecked
              labelPosition="right"
              classNames={{
                label: classes.notificationLabel,
              }}
            />
          </Stack>
        </Group>
      </Paper>

      <Paper withBorder shadow="none" radius="lg" p="md">
        <Group justify="space-between" className={classes.switchesGroup}>
          <Stack gap="xs">
            <ClipboardIcon size={32} color="gray" />
            <Stack gap={0}>
              <Title order={5}>Lien waivers</Title>
              <Text c="dimmed" fz={14}>
                Get notified about the status of your lien waivers.
              </Text>
            </Stack>
          </Stack>
          <Stack className={classes.switchesWrapper}>
            <Switch
              color="green"
              size="lg"
              onLabel="ON"
              offLabel="OFF"
              value="email"
              label="Email"
              withThumbIndicator={false}
              defaultChecked
              labelPosition="right"
              classNames={{
                label: classes.notificationLabel,
              }}
            />
            <Switch
              color="green"
              size="lg"
              onLabel="ON"
              offLabel="OFF"
              value="inapp"
              label="In app"
              withThumbIndicator={false}
              defaultChecked
              labelPosition="right"
              classNames={{
                label: classes.notificationLabel,
              }}
            />
          </Stack>
        </Group>
      </Paper>
    </Stack>
  );
}
