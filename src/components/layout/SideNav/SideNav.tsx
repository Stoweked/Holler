"use client";

import { Anchor, Stack, Text } from "@mantine/core";
import SideNavLinks from "./SideNavLinks";
import PrimaryActionsCard from "../../primaryActions/PrimaryActionsCard";
import { useViewportSize } from "@mantine/hooks";

export function SideNav() {
  const { width } = useViewportSize();
  const isMobile = width < 768;
  return (
    <>
      <Stack gap={0}>
        {!isMobile && <PrimaryActionsCard />}
        <SideNavLinks />
        <Text c="dimmed" size="xs" p="md" ta="center">
          All rights reserved Holler, LLC® <Anchor>Terms & Conditions</Anchor>
        </Text>
      </Stack>
    </>
  );
}
