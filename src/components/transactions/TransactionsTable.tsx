import { Group, SegmentedControl, Skeleton, Stack } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export default function TransactionsTable() {
  const { width } = useViewportSize();
  const isMobile = width < 768;

  return (
    <Stack p={isMobile ? "md" : "xl"}>
      <Stack gap="lg">
        <SegmentedControl
          size="md"
          radius="xl"
          data={["All", "Sent", "Received", "Deposited", "Transferred"]}
        />
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
