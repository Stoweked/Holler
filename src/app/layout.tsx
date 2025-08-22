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
  Image,
  ScrollArea,
  ActionIcon,
  Indicator,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { theme } from "../theme";
import "./globals.css";
import { SideNav } from "@/components/layout/SideNav";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";
import AccountAvatar from "@/components/layout/TopNav/AccountAvatar";
import { InboxIcon } from "hugeicons-react";
import TopNav from "@/components/layout/TopNav/TopNav";

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
              <TopNav opened={opened} toggle={toggle} />
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
