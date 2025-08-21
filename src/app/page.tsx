"use client";

import { Button, Title, Stack } from "@mantine/core";

export default function HomePage() {
  return (
    <Stack align="center" mt="xl">
      <Title order={1}>Welcome to Your Next.js + Mantine Application</Title>
      <Button
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        size="lg"
        onClick={() => alert("Mantine is working!")}
      >
        Verify Integration
      </Button>
    </Stack>
  );
}
