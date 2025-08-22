"use client";

import PrimaryActionsCard from "@/components/primaryActions/PrimaryActionsCard";
import { Skeleton, Group } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export default function HomePage() {
  const { width } = useViewportSize();
  const isMobile = width < 768;

  return (
    <>
      {isMobile && <PrimaryActionsCard />}

      <Group p="xl" gap="xl">
        <Skeleton radius="lg" width={300} height={400} />
        <Skeleton radius="lg" width={300} height={400} />
      </Group>
    </>
  );
}
