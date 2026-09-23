import type { ReactNode } from "react";
import { Burger, Group, Image, Title } from "@mantine/core";

export interface HollerHeaderProps {
  title?: string;
  logoSrc?: string;
  navigationOpened?: boolean;
  onToggleNavigation?: () => void;
  search?: ReactNode;
  actions?: ReactNode;
}

export function HollerHeader({
  title = "Holler", logoSrc = "/images/logomark.svg", navigationOpened = false,
  onToggleNavigation, search, actions,
}: HollerHeaderProps) {
  return (
    <Group h="100%" px="md" justify="space-between" wrap="nowrap">
      <Group wrap="nowrap">
        {onToggleNavigation && <Burger opened={navigationOpened} onClick={onToggleNavigation} hiddenFrom="sm" size="sm" aria-label="Toggle navigation" />}
        <Group gap={8} wrap="nowrap" visibleFrom="xs">
          <Image src={logoSrc} alt={`${title} logo`} w={24} h="auto" />
          <Title order={2} c="var(--mantine-color-text)">{title}</Title>
        </Group>
      </Group>
      {search}
      {actions && <Group wrap="nowrap" gap="xs">{actions}</Group>}
    </Group>
  );
}
