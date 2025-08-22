"use client";

import {
  Anchor,
  Badge,
  Card,
  Center,
  Divider,
  Group,
  Image,
  NavLink,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  ArrowRight01Icon,
  BankIcon,
  Call02Icon,
  ClipboardIcon,
  Logout02Icon,
  PencilEdit01Icon,
  UserIcon,
  UserMultiple02Icon,
} from "hugeicons-react";
import ActionButtons from "./ActionButtons";
import classes from "./SideNav.module.css";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";

export function SideNav() {
  return (
    <>
      <Stack gap={0}>
        {/* Heading */}
        <Card w="100%" py={48} className={classes.headingCard}>
          <Stack align="center" gap="xl">
            <Stack align="center" gap="sm">
              <Text c="dimmed" size="lg">
                Welcome, Jwonahh
              </Text>
              <Stack align="center" gap={2}>
                <Title order={1} size={40}>
                  $0.00
                </Title>
                <Text size="xs">Current balance</Text>
              </Stack>
            </Stack>

            <ActionButtons />
          </Stack>
        </Card>

        <Stack w="100%" gap={0} p="md">
          <Group justify="space-between" pb="md">
            <Title order={3}>Option menu</Title>

            <ColorSchemeToggle />
          </Group>

          <Divider />

          <NavLink
            href="#required-for-focus"
            label="Your profile"
            leftSection={<UserIcon size={20} />}
            rightSection={<ArrowRight01Icon size={24} color="grey" />}
            className={classes.navLink}
          />

          <NavLink
            href="#required-for-focus"
            label="Contacts"
            leftSection={<UserMultiple02Icon size={20} />}
            rightSection={<ArrowRight01Icon size={24} color="grey" />}
            className={classes.navLink}
          />

          <NavLink
            href="#required-for-focus"
            label={
              <>
                <Group wrap="nowrap" gap="xs">
                  Connected bank accounts{" "}
                  <Badge variant="default" size="sm">
                    2
                  </Badge>
                </Group>
              </>
            }
            leftSection={<BankIcon size={20} />}
            rightSection={<ArrowRight01Icon size={24} color="grey" />}
            className={classes.navLink}
          />

          <NavLink
            href="#required-for-focus"
            label="Lien waiver"
            leftSection={<ClipboardIcon size={20} />}
            rightSection={<ArrowRight01Icon size={24} color="grey" />}
            className={classes.navLink}
          />

          <NavLink
            href="#required-for-focus"
            label="Get support"
            leftSection={<Call02Icon size={20} />}
            rightSection={<ArrowRight01Icon size={24} color="grey" />}
            className={classes.navLink}
          />

          <NavLink
            href="#required-for-focus"
            label="Share feedback"
            leftSection={<PencilEdit01Icon size={20} />}
            rightSection={<ArrowRight01Icon size={24} color="grey" />}
            className={classes.navLink}
          />

          <NavLink
            href="#required-for-focus"
            label="Log out"
            leftSection={<Logout02Icon size={20} />}
            rightSection={<ArrowRight01Icon size={24} color="grey" />}
            className={classes.navLink}
          />
        </Stack>

        <Stack p="md" gap="xs">
          <Paper withBorder radius="md" p="md">
            <Center>
              <Image
                src="/images/holler-grey.svg"
                alt="Holler Logo"
                maw={100}
                w="100%"
                h="auto"
              />
            </Center>
          </Paper>

          <Text c="dimmed" size="xs" p="md" ta="center">
            All rights reserved Holler, LLC® <Anchor>Terms & Conditions</Anchor>
          </Text>
        </Stack>
      </Stack>
    </>
  );
}
