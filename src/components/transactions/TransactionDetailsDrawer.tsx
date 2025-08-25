import {
  Avatar,
  Badge,
  Divider,
  Drawer,
  Group,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Transaction, TransactionStatus } from "@/types/transaction";

interface TransactionDetailsDrawerProps {
  opened: boolean;
  close: () => void;
  transaction: Transaction | null;
}

export default function TransactionDetailsDrawer({
  opened,
  close,
  transaction,
}: TransactionDetailsDrawerProps) {
  if (!transaction) {
    return null;
  }

  const { amount, date, status, type, sender, receiver, avatar, bankAccount } =
    transaction;

  const isCredit = type === "Received" || type === "Deposited";
  const formattedAmount = `${isCredit ? "+" : "-"} $${amount.toFixed(2)}`;
  const amountColor = isCredit ? "lime" : "inherit";
  const statusColors: Record<TransactionStatus, string> = {
    Completed: "lime",
    Pending: "yellow",
    Failed: "red",
  };
  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Transaction details"
      position="right"
      padding="md"
      size="md"
    >
      <Stack gap="lg">
        <Stack align="center">
          <Avatar color="lime" size={80} radius="50%">
            <Title order={2}>{avatar}</Title>
          </Avatar>
          <Badge
            color={statusColors[status]}
            variant="light"
            size="xl"
            radius="xl"
          >
            {status}
          </Badge>
          <Stack align="center" gap={4}>
            <Title order={1} c={amountColor}>
              {formattedAmount}
            </Title>
          </Stack>
        </Stack>

        <Divider />

        <Stack>
          <Stack gap={0}>
            <Text c="dimmed">Date</Text>
            <Title order={4}>{formattedDate}</Title>
          </Stack>

          <Stack gap={0}>
            <Text c="dimmed">From</Text>
            <Title order={4}>{sender}</Title>
          </Stack>

          <Stack gap={0}>
            <Text c="dimmed">To</Text>
            <Title order={4}>{receiver}</Title>
          </Stack>

          <Stack gap={0}>
            <Text c="dimmed">Account</Text>
            <Title order={4}>{bankAccount}</Title>
          </Stack>

          <Stack gap={0}>
            <Text c="dimmed">Type</Text>
            <Title order={4}>{type}</Title>
          </Stack>

          <Stack gap={0}>
            <Text c="dimmed">Transaction ID</Text>
            <Title order={4}>{transaction.id}</Title>
          </Stack>
        </Stack>
        <Space h={100} />
      </Stack>
    </Drawer>
  );
}
