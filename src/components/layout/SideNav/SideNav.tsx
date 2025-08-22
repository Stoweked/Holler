"use client";

import { Anchor, Stack, Text } from "@mantine/core";
import SideNavLinks from "./SideNavLinks";
import SideNavHeading from "./SideNavHeading";
import { useDisclosure } from "@mantine/hooks";
import DepositDrawer from "@/components/deposit/DepositDrawer";

export function SideNav() {
  const [
    openedDepositDrawer,
    { open: openDepositDrawer, close: closeDepositDrawer },
  ] = useDisclosure(false);

  return (
    <>
      <Stack gap={0}>
        <SideNavHeading onDepositClick={openDepositDrawer} />
        <SideNavLinks />
        <Text c="dimmed" size="xs" p="md" ta="center">
          All rights reserved Holler, LLC® <Anchor>Terms & Conditions</Anchor>
        </Text>
      </Stack>

      <DepositDrawer opened={openedDepositDrawer} close={closeDepositDrawer} />
    </>
  );
}
