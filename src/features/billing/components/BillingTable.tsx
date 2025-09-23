import { Table, Badge, Paper, Text } from "@mantine/core";
import { mockBillingHistory } from "@/mockData/mockBilling";
import { BillingCycle } from "@/features/billing/types/billing";

export function BillingTable() {
  const rows = mockBillingHistory.map((row: BillingCycle) => (
    <Table.Tr key={row.id}>
      <Table.Td>
        <Text>{new Date(row.start_date).toLocaleDateString()}</Text>
      </Table.Td>
      <Table.Td>
        <Text>{new Date(row.end_date).toLocaleDateString()}</Text>
      </Table.Td>
      <Table.Td>
        <Text>${row.total_fees.toFixed(2)}</Text>
      </Table.Td>
      <Table.Td>
        <Badge
          variant="light"
          color={
            row.status === "paid"
              ? "lime"
              : row.status === "pending"
              ? "yellow"
              : "red"
          }
        >
          {row.status}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder radius="lg" style={{ overflow: "hidden" }}>
      <Table
        striped
        highlightOnHover
        verticalSpacing="sm"
        horizontalSpacing="md"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Text fw="bold">Start date</Text>
            </Table.Th>
            <Table.Th>
              <Text fw="bold">End date</Text>
            </Table.Th>
            <Table.Th>
              <Text fw="bold">Total fees</Text>
            </Table.Th>
            <Table.Th>
              <Text fw="bold">Status</Text>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}
