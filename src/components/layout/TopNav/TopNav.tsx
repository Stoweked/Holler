import {
  ActionIcon,
  Anchor,
  Burger,
  Group,
  Image,
  Indicator,
  Title,
} from "@mantine/core";
import { InboxIcon } from "hugeicons-react";
import React from "react";
import AccountAvatar from "./AccountAvatar";
import { useDisclosure } from "@mantine/hooks";
import NotificationDrawer from "./Notifications/NotificationDrawer";
import { useRouter } from "next/navigation";

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
          <Anchor
            onClick={() => router.push("/")}
            style={{ textDecoration: "none" }}
            c="initial"
          >
            <Group gap={8} wrap="nowrap">
              <Image
                src="/images/logomark.svg"
                alt="Holler Logo"
                maw={24}
                w="100%"
                h="auto"
              />
              <Title order={2}>Holler</Title>
            </Group>
          </Anchor>
        </Group>

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
