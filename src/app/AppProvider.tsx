// src/app/AppProvider.tsx
"use client";

import "@mantine/core/styles.css";
import React from "react";
import { AppShell, MantineProvider, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { theme } from "../theme";
import "./globals.css";
import { SideNav } from "@/components/layout/SideNav";
import TopNav from "@/components/layout/TopNav/TopNav";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 380,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding={0}
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
  );
}
