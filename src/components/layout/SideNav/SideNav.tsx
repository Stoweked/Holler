"use client";

import { Anchor, Stack, Text } from "@mantine/core";
import SideNavLinks from "./SideNavLinks";
import SideNavHeading from "./SideNavHeading";

export function SideNav() {
  return (
    <>
      <Stack gap={0}>
        <SideNavHeading />
        <SideNavLinks />
        <Text c="dimmed" size="xs" p="md" ta="center">
          All rights reserved Holler, LLC® <Anchor>Terms & Conditions</Anchor>
        </Text>
      </Stack>
    </>
  );
}
