import { Group, Skeleton, Stack } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export default function TransactionsTable() {
  const { width } = useViewportSize();
  const isMobile = width < 768;

  return (
    <Stack p={isMobile ? "md" : "xl"}>
      <Stack>
        <Group wrap="nowrap">
          <Skeleton radius="xl" w="100%" maw={140} height={32} />
          <Skeleton radius="xl" w="100%" maw={140} height={32} />
          <Skeleton radius="xl" w="100%" maw={140} height={32} />
          <Skeleton radius="xl" w="100%" maw={140} height={32} />
          <Skeleton radius="xl" w="100%" maw={140} height={32} />
          <Skeleton radius="xl" w="100%" maw={140} height={32} />
        </Group>
        <Skeleton radius="lg" width="100%" height={80} />
        <Skeleton radius="lg" width="100%" height={80} />
        <Skeleton radius="lg" width="100%" height={80} />
        <Skeleton radius="lg" width="100%" height={80} />
        <Skeleton radius="lg" width="100%" height={80} />
        <Skeleton radius="lg" width="100%" height={80} />
        <Skeleton radius="lg" width="100%" height={80} />
        <Skeleton radius="lg" width="100%" height={80} />
      </Stack>
    </Stack>
  );
}
