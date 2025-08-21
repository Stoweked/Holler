"use client";

import { ActionIcon, Group, Stack, Text, Title } from "@mantine/core";
import {
  ArrowDown02Icon,
  ArrowUp02Icon,
  BankIcon,
  PlusSignIcon,
} from "hugeicons-react";

export function SideNav() {
  return (
    <>
      <Stack align="center" gap="xl" py="xl">
        {/* Heading */}
        <Stack align="center" gap="sm">
          <Text c="dimmed">Welcome, Jonah</Text>
          <Stack align="center" gap="xs">
            <Title order={1}>$0.00</Title>
            <Text size="xs">Current balance</Text>
          </Stack>
        </Stack>

        {/* Action buttons */}
        <Group wrap="nowrap" gap="xl">
          {/* Deposit button */}
          <Stack gap={4} align="center">
            <ActionIcon
              variant="default"
              size="xl"
              radius="xl"
              aria-label="Deposit funds"
            >
              <PlusSignIcon size={20} />
            </ActionIcon>
            <Text size="xs" fw="bold">
              Deposit
            </Text>
          </Stack>

          {/* Request button */}
          <Stack gap={4} align="center">
            <ActionIcon
              variant="default"
              size="xl"
              radius="xl"
              aria-label="Request funds"
            >
              <ArrowDown02Icon size={20} />
            </ActionIcon>
            <Text size="xs" fw="bold">
              Request
            </Text>
          </Stack>

          {/* Send button */}
          <Stack gap={4} align="center">
            <ActionIcon
              variant="default"
              size="xl"
              radius="xl"
              aria-label="Send funds"
            >
              <ArrowUp02Icon size={20} />
            </ActionIcon>
            <Text size="xs" fw="bold">
              Send
            </Text>
          </Stack>

          {/* Transfer button */}
          <Stack gap={4} align="center">
            <ActionIcon
              variant="default"
              size="xl"
              radius="xl"
              aria-label="Transfer funds"
            >
              <BankIcon size={20} />
            </ActionIcon>
            <Text size="xs" fw="bold">
              Transfer
            </Text>
          </Stack>
        </Group>
      </Stack>
    </>
  );
}
