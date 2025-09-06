// src/components/layout/AppLayout.tsx
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
import { FavoritesProvider } from "@/contexts/FavoritesContext";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useProfile();
  const [opened, { toggle, close }] = useDisclosure();

  // While the ProfileContext is loading the session, we show a full-screen loader.
  // This prevents any flickering or premature rendering of content.
  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  // If loading is complete and there is still no user, we render nothing.
  // The middleware is responsible for the actual redirect. This just prevents
  // a flash of the component before the middleware kicks in.
  if (!user) {
    return null;
  }

  // If loading is complete and we have a user, render the main application shell.
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
        <FavoritesProvider>
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
        </FavoritesProvider>
      </WalletProvider>
    </ProfileProvider>
  );
}
