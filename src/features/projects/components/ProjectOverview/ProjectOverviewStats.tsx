import {
  Group,
  Stack,
  Text,
  Title,
  Button,
  Paper,
  Divider,
} from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { useRouter } from "next/navigation";
import { Project } from "../../types/project";
import { useProjects } from "../../contexts/ProjectsContext";

interface ProjectOverviewStatsProps {
  project: Project;
}

// Helper to convert currency string to a number for the chart
const currencyToNumber = (currency: string) => {
  return Number(currency.replace(/[^0-9.-]+/g, ""));
};

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

  // Mock data for aggregate stats
  const stats = {
    sent: "$12,500.00",
    received: "$2,134.10",
    pending: "$1,200.00",
    requested: "$3,400.00",
  };

  // Data for the chart, remains the same
  const chartData = [
    {
      category: "Transactions",
      Sent: currencyToNumber(stats.sent),
      Received: currencyToNumber(stats.received),
      Pending: currencyToNumber(stats.pending),
      Requested: currencyToNumber(stats.requested),
    },
  ];

  // Define the series with their values for sorting
  const series = [
    { name: "Sent", color: "blue.5", value: currencyToNumber(stats.sent) },
    {
      name: "Received",
      color: "green.5",
      value: currencyToNumber(stats.received),
    },
    {
      name: "Pending",
      color: "pink.5",
      value: currencyToNumber(stats.pending),
    },
    {
      name: "Requested",
      color: "cyan.5",
      value: currencyToNumber(stats.requested),
    },
  ];

  // Sort the series array from most to least
  series.sort((a, b) => b.value - a.value);

  const handleViewTransactions = () => {
    closeOverviewDrawer();
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

        <Divider />

        <BarChart
          h={200}
          data={chartData}
          dataKey="category"
          yAxisProps={{ width: 80 }}
          withXAxis={false}
          gridAxis="none"
          withTooltip={false}
          withLegend
          legendProps={{ verticalAlign: "bottom", height: 50 }}
          valueFormatter={(value) =>
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(value)
          }
          series={series}
        />
      </Stack>
    </Paper>
  );
}
