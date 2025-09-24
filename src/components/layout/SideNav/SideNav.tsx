// src/components/layout/SideNav/SideNav.tsx
"use client";

import { Anchor, Stack, Text } from "@mantine/core";
import SideNavLinks from "./SideNavLinks";
import PrimaryActionsCard from "../../../features/wallet/components/PrimaryActionsCard";
import { useViewportSize } from "@mantine/hooks";
import { useEffect } from "react";
import { useModals } from "@/contexts/ModalContext";

interface SideNavProps {
  closeMobileNav: () => void;
}

export function SideNav({ closeMobileNav }: SideNavProps) {
  const { openTermsModal, openPrivacyModal } = useModals();
  const { width } = useViewportSize();
  const isMobile = width < 768;

  useEffect(() => {
    const handleOpenTerms = () => openTermsModal();
    const handleOpenPrivacy = () => openPrivacyModal();

    window.addEventListener("open-terms", handleOpenTerms);
    window.addEventListener("open-privacy", handleOpenPrivacy);

    return () => {
      window.removeEventListener("open-terms", handleOpenTerms);
      window.removeEventListener("open-privacy", handleOpenPrivacy);
    };
  }, [openTermsModal, openPrivacyModal]);

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
          <Anchor
            aria-label="Open terms and conditions"
            onClick={openTermsModal}
          >
            Terms & Conditions
          </Anchor>
        </Text>
      </Stack>
    </>
  );
}
