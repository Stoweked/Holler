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
      <Stack align="center" gap="xl">
        <Image src="/images/logomark.svg" alt="Holler Logo" w={60} h="auto" />
        <Stack align="center" gap="xs">
          <Title order={1} ta="center" size={48}>
            Welcome to Holler
          </Title>
          <Text c="dimmed" ta="center" maw={480}>
            Get paid faster on the job. Holler provides secure payments designed
            for construction trades.
          </Text>
        </Stack>
        <Group>
          <Button
            size="lg"
            radius="xl"
            variant="default"
            onClick={() => router.push("/login")}
          >
            Log in
          </Button>
          <Button size="lg" radius="xl" onClick={() => router.push("/signup")}>
            Sign up
          </Button>
        </Group>
      </Stack>
    </Stack>
  );
}
