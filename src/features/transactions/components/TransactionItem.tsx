import {
  Transaction,
  TransactionStatus,
} from "@/features/transactions/types/transaction";
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
  onClick: () => void;
}

export default function TransactionItem({
  transaction,
  onClick,
}: TransactionItemProps) {
  const { amount, date, status, type, sender, receiver, avatar } = transaction;

  // --- Dynamic Values for Display ---
  // Determine if the transaction is a credit (money in) or debit (money out)
  const isCredit = type === "Received" || type === "Deposited";
  // Format the amount with a +/- sign and currency symbol
  const formattedAmount = `${isCredit ? "+" : "-"} $${amount.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}`;
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
    <UnstyledButton
      className={classes.transactionButton}
      onClick={onClick}
      aria-label="View transactions details"
    >
      <Group gap="xs" wrap="nowrap">
        <Avatar
          variant="light"
          color="gray"
          radius="100%"
          size={48}
          visibleFrom="xs"
          src={avatar}
        >
          {avatar}
        </Avatar>

        {/* Primary info */}
        <Stack gap={4} w="100%">
          <Group justify="space-between" gap={4} w="100%">
            <Group gap={8}>
              <Title order={3} c={amountColor} lh={1.2}>
                {formattedAmount}
              </Title>

              {status !== "Completed" && (
                <Badge
                  color={statusColors[status]}
                  style={{ cursor: "pointer" }}
                  variant="dot"
                  size="md"
                >
                  {status}
                </Badge>
              )}
            </Group>

            {/* Date */}
            <Badge variant="default" style={{ cursor: "pointer" }}>
              {formattedDate}
            </Badge>
          </Group>

          <Text size="md" c="dimmed" fw={500} lh={1.2}>
            {description}
          </Text>
        </Stack>
      </Group>
    </UnstyledButton>
  );
}
