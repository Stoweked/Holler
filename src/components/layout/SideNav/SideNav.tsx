"use client";

import { Anchor, Space, Stack, Text } from "@mantine/core";
import SideNavLinks from "./SideNavLinks";
import PrimaryActionsCard from "../../../features/wallet/components/PrimaryActionsCard";
import { useViewportSize } from "@mantine/hooks";

interface SideNavProps {
  closeMobileNav: () => void;
}

export function SideNav({ closeMobileNav }: SideNavProps) {
  const { width } = useViewportSize();
  const isMobile = width < 768;
  return (
    <>
      <Stack gap={0}>
        {!isMobile && <PrimaryActionsCard />}
        <SideNavLinks closeMobileNav={closeMobileNav} />
        <Text c="dimmed" size="xs" p="md" ta="center">
          All rights reserved Holler, LLC® <Anchor>Terms & Conditions</Anchor>
        </Text>
        <Space h={100} />
      </Stack>
    </>
  );
}
