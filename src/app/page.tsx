"use client";

import { Title, Stack, Text, Image } from "@mantine/core";

export default function HomePage() {
  return (
    <Stack align="center" mt="xl">
      <Image
        src="/images/logomark.png"
        alt="Holler Logo"
        w={120}
        h={120}
        mb="md"
      />
      <Title order={1}>Holler</Title>
      <Text>Peer to peer solutions</Text>
    </Stack>
  );
}
