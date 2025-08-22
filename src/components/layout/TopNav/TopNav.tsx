import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";
import { ActionIcon, Burger, Group, Image, Indicator } from "@mantine/core";
import { InboxIcon } from "hugeicons-react";
import React from "react";
import AccountAvatar from "./AccountAvatar";

interface TopNavProps {
  opened: boolean;
  toggle: () => void;
}

export default function TopNav({ opened, toggle }: TopNavProps) {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Group wrap="nowrap" gap="xs">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Image
          src="/images/holler-grey.svg"
          alt="Holler Logo"
          maw={120}
          w="100%"
          h="auto"
        />
      </Group>

      <Group wrap="nowrap" gap="xs">
        <ColorSchemeToggle />
        <Indicator color="red" size={10} offset={6} position="top-end">
          <ActionIcon
            variant="default"
            size={38}
            radius="xl"
            aria-label="Notifications"
          >
            <InboxIcon size={20} />
          </ActionIcon>
        </Indicator>
        <AccountAvatar />
      </Group>
    </Group>
  );
}
