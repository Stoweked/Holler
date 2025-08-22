// src/app/layout.tsx
"use client";
import "@mantine/core/styles.css";
import React from "react";
import {
  AppShell,
  MantineProvider,
  ColorSchemeScript,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { theme } from "../theme";
import "./globals.css";
import { SideNav } from "@/components/layout/SideNav";
import TopNav from "@/components/layout/TopNav/TopNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  const { width } = useViewportSize();
  const isMobile = width < 768;

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
            padding={isMobile ? 0 : "md"}
          >
            <AppShell.Header>
              <TopNav opened={opened} toggle={toggle} />
            </AppShell.Header>
            <AppShell.Navbar>
              <ScrollArea type="never">
                <SideNav />
              </ScrollArea>
            </AppShell.Navbar>
            <AppShell.Main pt={60}>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
