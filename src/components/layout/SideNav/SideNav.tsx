"use client";

import { Anchor, Stack, Text } from "@mantine/core";
import SideNavLinks from "./SideNavLinks";
import PrimaryActionsCard from "../PrimaryActionsCard/PrimaryActionsCard";

export function SideNav() {
  return (
    <>
      <Stack gap={0}>
        <PrimaryActionsCard />
        <SideNavLinks />
        <Text c="dimmed" size="xs" p="md" ta="center">
          All rights reserved Holler, LLC® <Anchor>Terms & Conditions</Anchor>
        </Text>
      </Stack>
    </>
  );
}
