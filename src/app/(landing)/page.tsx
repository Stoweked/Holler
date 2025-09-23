// /src/app/(landing)/page.tsx
import LandingPageButtons from "@/features/marketing/landing/LandingPageButtons";
import TermsAndConditions from "@/features/marketing/landing/TermsAndConditions";
import { Stack, Text, Title, Image } from "@mantine/core";

export default function LandingPage() {
  return (
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
            Send money, get paid, and manage lien waivers—all in one place, all
            from your phone.
          </Text>
        </Stack>
        <LandingPageButtons />
        <TermsAndConditions />
      </Stack>
    </Stack>
  );
}
