// src/app/layout.tsx
"use client";
import "@mantine/core/styles.css";
import React from "react";
import {
  AppShell,
  Burger,
  Group,
  MantineProvider,
  ColorSchemeScript,
  Text,
  Image,
  ScrollArea,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { theme } from "../theme";
import "./globals.css";
import { SideNav } from "@/components/layout/SideNav";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <title>Holler</title>
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: 380,
              breakpoint: "sm",
              collapsed: { mobile: !opened },
            }}
            padding="md"
          >
            <AppShell.Header>
              <Group h="100%" px="md" justify="space-between">
                <Group wrap="nowrap" gap="xs">
                  <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                  />
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
                  <Avatar radius="xl" color="lime" variant="filled">
                    JS
                  </Avatar>
                </Group>
              </Group>
            </AppShell.Header>
            <AppShell.Navbar>
              <ScrollArea type="never">
                <SideNav />
              </ScrollArea>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
