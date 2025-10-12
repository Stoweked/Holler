import {
  Group,
  Stack,
  Text,
  Title,
  Button,
  Paper,
  Divider,
  Center,
  Indicator,
} from "@mantine/core";
import { PieChart } from "@mantine/charts";
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

// Updated StatItem to accept a color prop
function StatItem({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Stack gap={0} align="center">
      <Group gap="xs" wrap="nowrap">
        <Indicator color={color} size={10} />
        <Text size="sm" c="dimmed">
          {label}
        </Text>
      </Group>
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

  // Prepare the data in the format PieChart expects
  const chartData = [
    { name: "Sent", value: currencyToNumber(stats.sent), color: "blue.5" },
    {
      name: "Received",
      value: currencyToNumber(stats.received),
      color: "green.5",
    },
    {
      name: "Pending",
      value: currencyToNumber(stats.pending),
      color: "pink.5",
    },
    {
      name: "Requested",
      value: currencyToNumber(stats.requested),
      color: "yellow.5",
    },
  ];

  // Sort the data for a cleaner look
  chartData.sort((a, b) => b.value - a.value);

  const handleViewTransactions = () => {
    closeOverviewDrawer();
    router.push(`/dashboard?project=${project.id}`);
  };

  // Dynamically create StatItem components
  const statItems = chartData.map((item) => (
    <StatItem
      key={item.name}
      label={item.name}
      value={stats[item.name.toLowerCase() as keyof typeof stats]}
      color={item.color}
    />
  ));

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
          {statItems}
        </Group>

        <Divider />

        <Center>
          <PieChart
            size={300}
            withLabelsLine
            labelsType="percent"
            withLabels
            withTooltip
            data={chartData}
            tooltipDataSource="segment"
            valueFormatter={(value) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(value)
            }
          />
        </Center>
      </Stack>
    </Paper>
  );
}
