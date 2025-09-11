// src/components/layout/SideNav/SideNav.tsx
"use client";

import { Anchor, Space, Stack, Text } from "@mantine/core";
import SideNavLinks from "./SideNavLinks";
import PrimaryActionsCard from "../../../features/wallet/components/PrimaryActionsCard";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import TermsConditionsModal from "@/components/modals/TermsConditionsModal";
import PrivacyPolicyModal from "@/components/modals/PrivacyPolicyModal";
import { useEffect } from "react";

interface SideNavProps {
  closeMobileNav: () => void;
}

export function SideNav({ closeMobileNav }: SideNavProps) {
  const { width } = useViewportSize();
  const isMobile = width < 768;
  const [openedTermsModal, { open: openTermsModal, close: closeTermsModal }] =
    useDisclosure(false);
  const [
    openedPrivacyModal,
    { open: openPrivacyModal, close: closePrivacyModal },
  ] = useDisclosure(false);

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
      <TermsConditionsModal opened={openedTermsModal} close={closeTermsModal} />
      <PrivacyPolicyModal
        opened={openedPrivacyModal}
        close={closePrivacyModal}
      />
    </>
  );
}
