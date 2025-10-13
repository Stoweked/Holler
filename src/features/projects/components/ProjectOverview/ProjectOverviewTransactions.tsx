// src/features/projects/components/ProjectOverview/ProjectOverviewStats.tsx
import {
  Group,
  Stack,
  Text,
  Title,
  Button,
  Paper,
  Box,
  SimpleGrid,
  useMantineTheme,
  useMantineColorScheme,
  Center,
} from "@mantine/core";
import { DonutChart } from "@mantine/charts";
import { useRouter } from "next/navigation";
import { Project } from "../../types/project";
import { useProjects } from "../../contexts/ProjectsContext";
import { useElementSize } from "@mantine/hooks";
import { useState } from "react";
import classes from "../Projects.module.css";

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
    <Group wrap="nowrap" gap="xs" align="stretch">
      <Box bg={color} w={8} style={{ borderRadius: "99px" }} />
      <Stack gap={0} align="flex-start" justify="center">
        <Text size="sm">{label}</Text>
        <Title order={3}>{value}</Title>
      </Stack>
    </Group>
  );
}

export default function ProjectOverviewStats({
  project,
}: ProjectOverviewStatsProps) {
  const router = useRouter();
  const { closeOverviewDrawer } = useProjects();
  const { ref, width } = useElementSize();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [hoveredChartSegment, setHoveredChartSegment] = useState<string | null>(
    null
  );

  // Mock data for aggregate stats
  const stats = {
    sent: "$12,500.00",
    received: "$2,134.10",
    pending: "$1,200.00",
    requested: "$3,400.00",
  };

  const total = Object.values(stats).reduce(
    (acc, value) => acc + currencyToNumber(value),
    0
  );

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

  // Create a new data array for display based on the hovered segment
  const displayData = chartData.map((item) => ({
    ...item,
    color:
      hoveredChartSegment === null || hoveredChartSegment === item.name
        ? item.color
        : colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
  }));

  // Dynamically create StatItem components
  const statItems = chartData.map((item) => (
    <Box
      key={item.name}
      onMouseEnter={() => setHoveredChartSegment(item.name)}
      onMouseLeave={() => setHoveredChartSegment(null)}
      className={classes.chartStatItemBox}
    >
      <StatItem
        label={item.name}
        value={stats[item.name.toLowerCase() as keyof typeof stats]}
        color={item.color}
      />
    </Box>
  ));

  return (
    <Paper ref={ref} withBorder radius="lg" p="md" shadow="xs">
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

        <Stack gap="xl">
          <Center>
            <Box pos="relative">
              <DonutChart
                size={width - 80 > 340 ? 340 : width - 80}
                thickness={40}
                withLabelsLine
                withTooltip={false}
                strokeWidth={4}
                data={displayData}
                tooltipDataSource="segment"
                valueFormatter={(value) =>
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(value)
                }
              />
              <Stack
                pos="absolute"
                top="50%"
                left="50%"
                style={{ transform: "translate(-50%, -50%)" }}
                align="center"
                gap={0}
              >
                <Text size="sm" c="dimmed">
                  Total
                </Text>
                <Title order={3}>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(total)}
                </Title>
              </Stack>
            </Box>
          </Center>

          <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={0} verticalSpacing={0}>
            {statItems}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Paper>
  );
}
