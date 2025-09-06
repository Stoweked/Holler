// /src/app/(landing)/page.tsx
"use client";

import TermsConditionsModal from "@/components/modals/TermsConditionsModal";
import {
  Button,
  Group,
  Stack,
  Text,
  Title,
  Image,
  Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [openedTermsModal, { open: openTermsModal, close: closeTermsModal }] =
    useDisclosure(false);
  return (
    <>
      <Stack
        align="center"
        justify="center"
        mih="100vh"
        p="md"
        className="pageBackground"
      >
        <Stack align="center" gap="xl">
          <Image
            src="/images/holler-logo-green.svg"
            alt="Holler Logo"
            w={160}
            h="auto"
          />
          <Stack align="center" gap="xs">
            <Title order={2} ta="center" size={48} lh={1.1} c="white">
              Built to keep you building
            </Title>
            <Text c="dimmed" ta="center" maw={420}>
              Send money, get paid, and manage lien waivers—all in one place,
              all from your phone.
            </Text>
          </Stack>
          <Group gap="lg">
            <Button size="lg" onClick={() => router.push("/signup")} miw={120}>
              Sign up
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/login")}
              miw={120}
            >
              Log in
            </Button>
          </Group>

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
      </Stack>

      <TermsConditionsModal opened={openedTermsModal} close={closeTermsModal} />
    </>
  );
}
