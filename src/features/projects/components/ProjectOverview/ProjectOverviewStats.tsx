import { Group, Stack, Text, Title, Button, Paper } from "@mantine/core";
import { Project } from "../../types/project";

interface ProjectOverviewStatsProps {
  project: Project;
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <Stack gap={0} align="center">
      <Text size="lg" fw={700}>
        {value}
      </Text>
      <Text size="xs" c="dimmed">
        {label}
      </Text>
    </Stack>
  );
}

export default function ProjectOverviewStats({
  project,
}: ProjectOverviewStatsProps) {
  // Mock data - replace with actual transaction data fetching logic
  const stats = {
    sent: "$12,500.00",
    requested: "$3,400.00",
    pending: "$1,200.00",
  };

  const handleViewTransactions = () => {
    // This will eventually link to the transactions page with a filter
    console.log("Navigating to transactions for project:", project.id);
  };

  return (
    <Paper withBorder radius="lg" p="md">
      <Stack>
        <Group justify="space-between">
          <Title order={5}>Transactions</Title>
        </Group>
        <Group grow justify="space-around" py="md">
          <StatItem label="Total Sent" value={stats.sent} />
          <StatItem label="Total Requested" value={stats.requested} />
          <StatItem label="Pending" value={stats.pending} />
        </Group>
        <Button variant="outline" onClick={handleViewTransactions}>
          View transactions
        </Button>
      </Stack>
    </Paper>
  );
}
