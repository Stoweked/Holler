import {
  ActionIcon,
  Anchor,
  Box,
  Burger,
  Group,
  Image,
  Indicator,
  Kbd,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { InboxIcon, Search01Icon } from "hugeicons-react";
import React from "react";
import AccountAvatar from "./AccountAvatar";
import { useDisclosure } from "@mantine/hooks";
import NotificationDrawer from "./Notifications/NotificationDrawer";
import { useRouter } from "next/navigation";
import classes from "./TopNav.module.css";
import { spotlight } from "@mantine/spotlight";
interface TopNavProps {
  opened: boolean;
  toggle: () => void;
}

export default function TopNav({ opened, toggle }: TopNavProps) {
  const router = useRouter();
  const [
    openedNotificationDrawer,
    { open: openNotificationDrawer, close: closeNotificationDrawer },
  ] = useDisclosure(false);

  return (
    <>
      <Group h="100%" px="md" justify="space-between" wrap="nowrap">
        <Group wrap="nowrap">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

          {/* Logo */}
          <Group gap={8} wrap="nowrap" visibleFrom="xs">
            <Image
              src="/images/logomark.svg"
              alt="Holler Logo"
              maw={24}
              w="100%"
              h="auto"
            />
            <Title order={2} style={{ color: "var(--mantine-color-text)" }}>
              Holler
            </Title>
          </Group>
        </Group>

        {/* Search */}
        <UnstyledButton
          aria-label="Search"
          className={classes.search}
          onClick={spotlight.open}
        >
          <Group align="center" justify="space-between" w="100%">
            <Group align="center" gap="xs" wrap="nowrap">
              <Search01Icon size={16} />
              <Text style={{ whiteSpace: "nowrap" }}>Search</Text>
            </Group>
            <Box visibleFrom="md" style={{ marginTop: "-4px" }}>
              <Kbd c="dimmed">⌘</Kbd> <Kbd c="dimmed">K</Kbd>
            </Box>
          </Group>
        </UnstyledButton>

        <Group wrap="nowrap" gap="xs">
          <Indicator color="red" size={10} offset={6} position="top-end">
            <ActionIcon
              variant="default"
              size={38}
              radius="xl"
              aria-label="Notifications"
              onClick={openNotificationDrawer}
            >
              <InboxIcon size={20} />
            </ActionIcon>
          </Indicator>
          <AccountAvatar />
        </Group>
      </Group>

      <NotificationDrawer
        opened={openedNotificationDrawer}
        close={closeNotificationDrawer}
      />
    </>
  );
}
