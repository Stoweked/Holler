// src/components/layout/TopNav/TopNav.tsx
"use client";

import {
  ActionIcon,
  Burger,
  Group,
  Image,
  Indicator,
  Title,
} from "@mantine/core";
import { InboxIcon } from "hugeicons-react";
import React, { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import AccountDropdown from "../../../features/account/components/AccountDropdown";
import NotificationDrawer from "@/features/notifications/components/NotificationDrawer";
import SearchBar from "./SearchBar";

interface TopNavProps {
  opened: boolean;
  toggle: () => void;
}

export default function TopNav({ opened, toggle }: TopNavProps) {
  const [
    openedNotificationDrawer,
    { open: openNotificationDrawer, close: closeNotificationDrawer },
  ] = useDisclosure(false);

  // Add event listener for opening notifications from Spotlight
  useEffect(() => {
    const handleOpenNotifications = () => openNotificationDrawer();

    window.addEventListener("open-notifications", handleOpenNotifications);

    return () => {
      window.removeEventListener("open-notifications", handleOpenNotifications);
    };
  }, [openNotificationDrawer]);

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
              w={24}
              h="auto"
            />
            <Title order={2} style={{ color: "var(--mantine-color-text)" }}>
              Holler
            </Title>
          </Group>
        </Group>

        {/* Search */}
        <SearchBar />

        {/* Notifications */}
        <Group wrap="nowrap" gap="xs">
          <Indicator
            color="red"
            size={10}
            offset={6}
            position="top-end"
            processing
          >
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
          <AccountDropdown />
        </Group>
      </Group>

      <NotificationDrawer
        opened={openedNotificationDrawer}
        close={closeNotificationDrawer}
      />
    </>
  );
}
