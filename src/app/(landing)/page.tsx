// /src/app/(landing)/page.tsx
"use client";

import { Button, Group, Stack, Text, Title, Image } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <Stack
      align="center"
      justify="center"
      mih="100vh"
      p="md"
      className="pageBackground"
    >
      <Stack align="center" gap="lg">
        <Image src="/images/logomark.svg" alt="Holler Logo" w={56} h="auto" />
        <Stack align="center" gap="xs">
          <Title order={1} ta="center" lh={1.2} c="white">
            Holler
          </Title>
          <Text c="dimmed" ta="center" maw={480}>
            Get paid faster on the job. Holler provides secure payments designed
            for construction trades.
          </Text>
        </Stack>
        <Group gap="lg">
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/login")}
          >
            Log in
          </Button>
          <Button size="lg" onClick={() => router.push("/signup")}>
            Sign up
          </Button>
        </Group>
      </Stack>
    </Stack>
  );
}
