// src/app/AppLayout.tsx
"use client";

import "@mantine/core/styles.css";
import React, { useEffect, useState } from "react";
import { AppShell, ScrollArea, Center, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SideNav } from "@/components/layout/SideNav";
import TopNav from "@/components/layout/TopNav/TopNav";
import { ProfileProvider, useProfile } from "@/contexts/ProfileContext";
import { getSpotlightActions } from "@/components/layout/TopNav/SpotlightSearch/spotlightActions";
import { useRouter } from "next/navigation";
import { Spotlight } from "@mantine/spotlight";
import { Search01Icon } from "hugeicons-react";
import { WalletProvider } from "@/contexts/WalletContext";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useProfile();
  const [opened, { toggle, close }] = useDisclosure();

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (!user) {
    // The context provider handles the redirect, so we render nothing here
    // to prevent a flash of content before the redirect happens.
    return null;
  }

  return (
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
  );
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const actions = getSpotlightActions(router);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ProfileProvider>
      <WalletProvider>
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
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
      </WalletProvider>
    </ProfileProvider>
  );
}
