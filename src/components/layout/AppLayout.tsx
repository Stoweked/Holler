"use client";

import "@mantine/core/styles.css";
import React, { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { AppShell, ScrollArea, Center, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SideNav } from "@/components/layout/SideNav";
import TopNav from "@/components/layout/TopNav/TopNav";
import {
  ProfileProvider,
  useProfile,
} from "@/features/account/contexts/ProfileContext";
import { getSpotlightActions } from "@/features/spotlight/spotlightActions";
import { useRouter } from "next/navigation";
import { Spotlight } from "@mantine/spotlight";
import { Search01Icon } from "hugeicons-react";
import {
  WalletProvider,
  useWallet,
} from "@/features/wallet/contexts/WalletContext";
import {
  useWaivers,
  WaiversProvider,
} from "@/features/waivers/contexts/WaiversContext";
import {
  ProjectsProvider,
  useProjects,
} from "@/features/projects/contexts/ProjectsContext";
import dynamic from "next/dynamic";
import { ModalProvider } from "@/contexts/ModalContext";
import { FavoritesProvider } from "@/features/contacts/contexts/FavoritesContext";

const LienWaiversDrawer = dynamic(
  () => import("@/features/waivers/components/LienWaiversDrawer"),
  { ssr: false }
);
const ProjectsDrawer = dynamic(
  () => import("@/features/projects/components/ProjectsDrawer"),
  { ssr: false }
);
const ProjectOverviewDrawer = dynamic(
  () =>
    import(
      "@/features/projects/components/ProjectOverview/ProjectOverviewDrawer"
    ),
  { ssr: false }
);

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useProfile();
  const [opened, { toggle, close }] = useDisclosure();
  const router = useRouter();

  // Wallet
  const { openActionDrawer } = useWallet();

  // Waivers
  const {
    drawerOpened: waiversDrawerOpened,
    closeDrawer: closeWaiversDrawer,
    openDrawer: openWaiversDrawer,
  } = useWaivers();

  // Projects
  const {
    listDrawerOpened,
    closeListDrawer,
    openListDrawer,
    overviewDrawerOpened,
    closeOverviewDrawer,
    selectedProject,
  } = useProjects();

  useEffect(() => {
    if (!loading && user && profile) {
      if (!profile.username || !profile.phone_number) {
        router.push("/signup/multi-step");
      }
    }
  }, [user, profile, loading, router]);

  const actions = getSpotlightActions(
    router,
    openActionDrawer,
    openWaiversDrawer,
    openListDrawer,
    close
  );

  if (loading || !profile) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
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

      <LienWaiversDrawer
        opened={waiversDrawerOpened}
        close={closeWaiversDrawer}
      />
      <ProjectsDrawer opened={listDrawerOpened} close={closeListDrawer} />
      <ProjectOverviewDrawer
        opened={overviewDrawerOpened}
        onClose={closeOverviewDrawer}
        project={selectedProject}
      />
    </>
  );
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
        <WaiversProvider>
          <ProjectsProvider>
            <FavoritesProvider>
              <ModalProvider>
                <AuthenticatedLayout>
                  {children}
                  <SpeedInsights />
                  <Analytics />
                </AuthenticatedLayout>
              </ModalProvider>
            </FavoritesProvider>
          </ProjectsProvider>
        </WaiversProvider>
      </WalletProvider>
    </ProfileProvider>
  );
}
