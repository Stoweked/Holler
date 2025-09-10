import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Badge,
} from "@mantine/core";
import { mockBillingHistory } from "@/mockData/mockBilling";
import { BillingCycle } from "@/features/billing/types/billing";

export function BillingTable() {
  const rows = mockBillingHistory.map((row: BillingCycle) => (
    <Table.Tr key={row.id}>
      <Table.Td>{new Date(row.start_date).toLocaleDateString()}</Table.Td>
      <Table.Td>{new Date(row.end_date).toLocaleDateString()}</Table.Td>
      <Table.Td>${row.total_fees.toFixed(2)}</Table.Td>
      <Table.Td>
        <Badge
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
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Start Date</Table.Th>
          <Table.Th>End Date</Table.Th>
          <Table.Th>Total Fees</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
