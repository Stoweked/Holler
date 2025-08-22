"use client";

import {
  Anchor,
  Center,
  Divider,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";
import SideNavLinks from "./SideNavLinks";
import SideNavHeading from "./SideNavHeading";

export function SideNav() {
  return (
    <>
      <Stack gap={0}>
        {/* Heading */}
        <SideNavHeading />

        {/* Menu */}
        <Stack w="100%" gap={0}>
          {/* <Title order={3} pb="md">
            Option menu
          </Title>

          <Divider /> */}
          <SideNavLinks />
        </Stack>

        {/* Footer */}
        <Stack p="md" gap="xs">
          {/* <Paper withBorder radius="md" p="md">
            <Center>
              <Image
                src="/images/holler-grey.svg"
                alt="Holler Logo"
                maw={100}
                w="100%"
                h="auto"
              />
            </Center>
          </Paper> */}
          <Text c="dimmed" size="xs" p="md" ta="center">
            All rights reserved Holler, LLC® <Anchor>Terms & Conditions</Anchor>
          </Text>
        </Stack>
      </Stack>
    </>
  );
}
