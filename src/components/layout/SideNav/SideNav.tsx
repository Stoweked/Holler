"use client";

import {
  ActionIcon,
  Card,
  Divider,
  Group,
  NavLink,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  ArrowDown02Icon,
  ArrowRight01Icon,
  ArrowUp02Icon,
  BankIcon,
  PlusSignIcon,
  UserIcon,
  UserMultiple02Icon,
} from "hugeicons-react";

export function SideNav() {
  return (
    <>
      <Stack gap={0}>
        <Card w="100%" py="xl">
          <Stack align="center">
            {/* Heading */}
            <Stack align="center" gap="sm">
              <Text c="dimmed" size="lg">
                Welcome, Jonah
              </Text>
              <Stack align="center" gap={2}>
                <Title order={1} size={40}>
                  $0.00
                </Title>
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
        </Card>

        <Divider w="100%" />

        <Stack w="100%" gap={0}>
          <Title order={3} p="md">
            Option menu
          </Title>
          <NavLink
            href="#required-for-focus"
            label="Your profile"
            leftSection={<UserIcon size={16} />}
            rightSection={<ArrowRight01Icon size={12} />}
          />

          <NavLink
            href="#required-for-focus"
            label="Contacts"
            leftSection={<UserMultiple02Icon size={16} />}
            rightSection={<ArrowRight01Icon size={12} />}
          />

          <NavLink
            href="#required-for-focus"
            label="Connected bank account(s)"
            leftSection={<BankIcon size={16} />}
            rightSection={<ArrowRight01Icon size={12} />}
          />
        </Stack>
      </Stack>
    </>
  );
}
