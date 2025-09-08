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
import classes from "../Transactions.module.css";
import { getInitials } from "@/lib/hooks/getInitials";
import { useProfile } from "@/contexts/ProfileContext";
import { getPartyName } from "../types/transactionParty";
import { ContactType } from "@/features/contacts/types/contact";

interface TransactionItemProps {
  transaction: Transaction;
  onClick: () => void;
}

export default function TransactionItem({
  transaction,
  onClick,
}: TransactionItemProps) {
  const { profile } = useProfile();
  const { amount, date, status, type, from, to } = transaction;

  const isCredit = type === "Received" || type === "Deposited";
  const formattedAmount = `${isCredit ? "+" : "-"} $${amount.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}`;
  const amountColor = isCredit ? "lime" : "inherit";

  const description =
    type === "Sent" || type === "Transferred"
      ? `To: ${getPartyName(to)}`
      : `From: ${getPartyName(from)}`;

  const getAvatarContent = () => {
    const relevantParty = type === "Sent" || type === "Transferred" ? to : from;
    switch (relevantParty.type) {
      case "self":
        return {
          src: profile?.avatar_url,
          children: getInitials(profile?.full_name),
        };
      case "contact":
        const name =
          relevantParty.data.contactType === ContactType.Person
            ? relevantParty.data.full_name
            : relevantParty.data.business_name;
        return {
          src: relevantParty.data.avatar_url,
          children: getInitials(name),
        };
      case "bank":
        return {
          src: undefined,
          children: getInitials(relevantParty.data.name),
        };
      default:
        return {
          src: undefined,
        };
    }
  };

  const avatarContent = getAvatarContent();

  const statusColors: Record<TransactionStatus, string> = {
    Completed: "lime",
    Pending: "yellow",
    Failed: "red",
  };

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
          src={avatarContent.src}
          variant="light"
          color="gray"
          radius="100%"
          size={48}
          visibleFrom="xs"
        >
          {avatarContent.children}
        </Avatar>
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
