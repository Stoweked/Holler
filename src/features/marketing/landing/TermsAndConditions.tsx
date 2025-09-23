"use client";

import TermsConditionsModal from "@/components/modals/TermsConditionsModal";
import { Text, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function TermsAndConditions() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Text c="dimmed" size="xs" p="md" ta="center">
        All rights reserved Holler, LLC®{" "}
        <Anchor aria-label="Open terms and conditions" onClick={open}>
          Terms & Conditions
        </Anchor>
      </Text>
      <TermsConditionsModal opened={opened} close={close} />
    </>
  );
}
