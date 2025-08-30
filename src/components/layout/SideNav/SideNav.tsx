"use client";

import { Anchor, Space, Stack, Text } from "@mantine/core";
import SideNavLinks from "./SideNavLinks";
import PrimaryActionsCard from "../../../features/wallet/components/PrimaryActionsCard";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import TermsConditionsModal from "@/components/modals/TermsConditionsModal";

interface SideNavProps {
  closeMobileNav: () => void;
}

export function SideNav({ closeMobileNav }: SideNavProps) {
  const { width } = useViewportSize();
  const isMobile = width < 768;
  const [openedTermsModal, { open: openTermsModal, close: closeTermsModal }] =
    useDisclosure(false);
  return (
    <>
      <Stack gap={0}>
        {!isMobile && <PrimaryActionsCard />}
        <SideNavLinks closeMobileNav={closeMobileNav} />
        <Text c="dimmed" size="xs" p="md" ta="center">
          All rights reserved Holler, LLC®{" "}
          <Anchor
            aria-label="Open terms and conditions"
            onClick={openTermsModal}
          >
            Terms & Conditions
          </Anchor>
        </Text>
        <Space h={100} />
      </Stack>
      <TermsConditionsModal opened={openedTermsModal} close={closeTermsModal} />
    </>
  );
}
