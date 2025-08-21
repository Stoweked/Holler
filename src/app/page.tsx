"use client";

import { Skeleton, Group } from "@mantine/core";

export default function HomePage() {
  return (
    <Group p="xl" gap="xl">
      <Skeleton radius="lg" width={300} height={400} />
      <Skeleton radius="lg" width={300} height={400} />
    </Group>
  );
}
