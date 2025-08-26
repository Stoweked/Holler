// src/app/AppLayout.tsx
"use client";

import "@mantine/core/styles.css";
import React, { useEffect, useState } from "react";
import { AppShell, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SideNav } from "@/components/layout/SideNav";
import TopNav from "@/components/layout/TopNav/TopNav";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { getSpotlightActions } from "@/components/layout/TopNav/SpotlightSearch/spotlightActions";
import { useRouter } from "next/navigation";
import { Spotlight } from "@mantine/spotlight";
import { Search01Icon } from "hugeicons-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const actions = getSpotlightActions(router);
  const [opened, { toggle }] = useDisclosure();
  const [mounted, setMounted] = useState(false);
  // Ensure the component only renders on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render null on the server and the full layout on the client
  if (!mounted) {
    return null;
  }

  return (
    <ProfileProvider>
      <Spotlight
        size="lg"
        radius="md"
        scrollable
        actions={actions}
        shortcut={["mod + k", "/"]}
        nothingFound="No results found..."
        searchProps={{
          leftSection: <Search01Icon size={20} />,
          placeholder: "Search...",
        }}
      />

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
            <SideNav closeMobileNav={close} />
          </ScrollArea>
        </AppShell.Navbar>
        <AppShell.Main pt={60} className="appShell">
          {children}
        </AppShell.Main>
      </AppShell>
    </ProfileProvider>
  );
}
