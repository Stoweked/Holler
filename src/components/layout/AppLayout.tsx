"use client";

import "@mantine/core/styles.css";
import React, { lazy, useEffect, useState } from "react";
import { HollerLayout } from "@/ui/HollerLayout";
import { useDisclosure } from "@mantine/hooks";
import { SideNav } from "@/components/layout/SideNav";
import TopNav from "@/components/layout/TopNav/TopNav";
import { useProfile } from "@/features/account/contexts/ProfileContext";
import { getSpotlightActions } from "@/components/spotlight/spotlightActions";
import { useRouter } from "@/lib/navigation/NavigationProvider";
import { Spotlight } from "@mantine/spotlight";
import { Search01Icon } from "hugeicons-react";
import { useWallet } from "@/features/wallet/contexts/WalletContext";
import { useWaivers } from "@/features/waivers/contexts/WaiversContext";
import { useProjects } from "@/features/projects/contexts/ProjectsContext";
import { ClientOnly } from "@/components/shared/ClientOnly";
import { HollerFeatureProviders } from "@/ui/HollerFeatureProviders";

const LienWaiversDrawer = lazy(
  () => import("@/features/waivers/components/LienWaiversDrawer")
);
const ProjectsDrawer = lazy(
  () => import("@/features/projects/components/ProjectsDrawer")
);
const ProjectOverviewDrawer = lazy(
  () =>
    import(
      "@/features/projects/components/ProjectOverview/ProjectOverviewDrawer"
    )
);

const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  const { signOut } = useProfile();
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

  const actions = getSpotlightActions(
    router,
    openActionDrawer,
    openWaiversDrawer,
    openListDrawer,
    close,
    signOut
  );

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
      <HollerLayout
        header={<TopNav opened={opened} toggle={toggle} />}
        sidebar={<SideNav closeMobileNav={close} />}
        navigationOpened={opened}
      >
        {children}
      </HollerLayout>

      <ClientOnly>
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
      </ClientOnly>
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
    <HollerFeatureProviders>
      <DashboardShell>{children}</DashboardShell>
    </HollerFeatureProviders>
  );
}
