import { Transaction, TransactionStatus } from "@/types/transaction";
import {
  Avatar,
  Badge,
  Group,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import classes from "./Transactions.module.css";

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const { amount, date, status, type, sender, receiver, avatar } = transaction;

  // --- Dynamic Values for Display ---
  // Determine if the transaction is a credit (money in) or debit (money out)
  const isCredit = type === "Received" || type === "Deposited";
  // Format the amount with a +/- sign and currency symbol
  const formattedAmount = `${isCredit ? "+" : "-"} $${amount.toFixed(2)}`;
  // Set the color based on credit or debit
  const amountColor = isCredit ? "lime" : "inherit";

  // Set the description text based on the transaction type
  const description = type === "Sent" ? `To: ${receiver}` : `From: ${sender}`;

  // Map status to a specific badge color
  const statusColors: Record<TransactionStatus, string> = {
    Completed: "lime",
    Pending: "yellow",
    Failed: "red",
  };

  // Format the date for better readability (e.g., "Aug 24")
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <UnstyledButton className={classes.transactionButton}>
      <Group justify="space-between">
        <Stack gap={4}>
          <Badge variant="default" style={{ cursor: "pointer" }}>
            {formattedDate}
          </Badge>
          <Stack gap={0}>
            <Group>
              <Title order={3} c={amountColor}>
                {formattedAmount}
              </Title>
              <Badge
                color={statusColors[status]}
                style={{ cursor: "pointer" }}
                variant="light"
                size="lg"
              >
                {status}
              </Badge>
            </Group>
            <Text c="dimmed">{description}</Text>
          </Stack>
        </Stack>

        <Avatar color="lime" radius="50%" size="lg">
          {avatar}
        </Avatar>
      </Group>
    </UnstyledButton>
  );
}
