// src/components/layout/SideNav/SideNav.tsx
"use client";

import { Anchor, Stack, Text } from "@mantine/core";
import SideNavLinks from "./SideNavLinks";
import PrimaryActionsCard from "../../../features/wallet/components/PrimaryActionsCard";
import { useViewportSize } from "@mantine/hooks";
import { useEffect } from "react";
import { useAppModals } from "@/contexts/AppModalsContext";

interface SideNavProps {
  closeMobileNav: () => void;
}

export function SideNav({ closeMobileNav }: SideNavProps) {
  const { openTerms, openPrivacy } = useAppModals();
  const { width } = useViewportSize();
  const isMobile = width < 768;

  useEffect(() => {
    const handleOpenTerms = () => openTerms();
    const handleOpenPrivacy = () => openPrivacy();

    window.addEventListener("open-terms", handleOpenTerms);
    window.addEventListener("open-privacy", handleOpenPrivacy);

    return () => {
      window.removeEventListener("open-terms", handleOpenTerms);
      window.removeEventListener("open-privacy", handleOpenPrivacy);
    };
  }, [openTerms, openPrivacy]);

  return (
    <>
      <Stack
        gap={0}
        justify="space-between"
        style={{ minHeight: "calc(100vh - 60px)" }}
      >
        <Stack gap={0}>
          {!isMobile && <PrimaryActionsCard />}
          <SideNavLinks closeMobileNav={closeMobileNav} />
        </Stack>
        <Text c="dimmed" size="xs" p="md" ta="center">
          All rights reserved Holler, LLC®{" "}
          <Anchor aria-label="Open terms and conditions" onClick={openTerms}>
            Terms & Conditions
          </Anchor>
        </Text>
      </Stack>
    </>
  );
}
