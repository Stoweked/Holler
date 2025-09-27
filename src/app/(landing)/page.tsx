// src/app/(landing)/page.tsx
"use client";

import LandingPageButtons from "@/features/marketing/landing/LandingPageButtons";
import TermsAndConditions from "@/features/marketing/landing/TermsAndConditions";
import { Stack, Text, Title } from "@mantine/core";
import { ProfileProvider } from "@/features/account/contexts/ProfileContext";
import Image from "next/image";
import background from "../../../public/images/background.png";

export default function LandingPage() {
  return (
    <ProfileProvider>
      <div
        style={{
          position: "fixed",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <Image
          src={background}
          alt="Abstract background"
          fill
          style={{ objectFit: "cover" }}
          priority
          placeholder="blur"
        />
      </div>
      <Stack align="center" justify="center" mih="100vh" p="md">
        <Stack align="center" gap="xl">
          <Image
            src="/images/holler-logo-green.svg"
            alt="Holler Logo"
            width={160}
            height={40}
            priority
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
          <LandingPageButtons />
          <TermsAndConditions />
        </Stack>
      </Stack>
    </ProfileProvider>
  );
}
