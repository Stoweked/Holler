import { Group, Stack, Text, Title, Button, Paper } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { useRouter } from "next/navigation";
import { Project } from "../../types/project";
import { useProjects } from "../../contexts/ProjectsContext";

interface ProjectOverviewStatsProps {
  project: Project;
}

const data = [
  { month: "Jan", Sent: 1200, Received: 900, Requested: 420, Pending: 200 },
  { month: "Feb", Sent: 1900, Received: 1200, Requested: 120, Pending: 400 },
  { month: "Mar", Sent: 400, Received: 1000, Requested: 590, Pending: 200 },
  { month: "Apr", Sent: 1000, Received: 200, Requested: 230, Pending: 800 },
  { month: "May", Sent: 800, Received: 1400, Requested: 540, Pending: 1200 },
  { month: "Jun", Sent: 750, Received: 600, Requested: 300, Pending: 1000 },
];

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <Stack gap={0} align="center">
      <Text size="sm" c="dimmed">
        {label}
      </Text>
      <Title order={2}>{value}</Title>
    </Stack>
  );
}

export default function ProjectOverviewStats({
  project,
}: ProjectOverviewStatsProps) {
  const router = useRouter();
  const { closeOverviewDrawer } = useProjects();

  // Mock data - replace with actual transaction data fetching logic
  const stats = {
    sent: "$12,500.00",
    requested: "$3,400.00",
    pending: "$1,200.00",
    received: "$2,134.10",
  };

  const handleViewTransactions = () => {
    // 1. Close the current project overview drawer
    closeOverviewDrawer();

    // 2. Navigate to the dashboard with the project ID as a URL parameter
    router.push(`/dashboard?project=${project.id}`);
  };

  return (
    <Paper withBorder radius="lg" p="md">
      <Stack>
        <Group justify="space-between" wrap="nowrap">
          <Title order={5}>Transactions</Title>
          <Button
            variant="subtle"
            size="compact-sm"
            onClick={handleViewTransactions}
          >
            View all
          </Button>
        </Group>

        <Group justify="space-around" py="md">
          <StatItem label="Sent" value={stats.sent} />
          <StatItem label="Received" value={stats.received} />
          <StatItem label="Pending" value={stats.pending} />
          <StatItem label="Requested" value={stats.requested} />
        </Group>

        <BarChart
          h={400}
          data={data}
          dataKey="month"
          withYAxis={false}
          type="stacked"
          withLegend
          legendProps={{ verticalAlign: "top", height: 50 }}
          valueFormatter={(value) =>
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(value)
          }
          series={[
            { name: "Sent", color: "blue.5" },
            { name: "Received", color: "green.5" },
            { name: "Pending", color: "pink.5" },
            { name: "Requested", color: "cyan.5" },
          ]}
        />
      </Stack>
    </Paper>
  );
}
