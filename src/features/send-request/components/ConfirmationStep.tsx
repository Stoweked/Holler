import { Contact, Recipient } from "@/features/contacts/types/recipient";
import {
  Avatar,
  Button,
  Group,
  Stack,
  Text,
  Title,
  Anchor,
  Card,
  Divider,
  Alert,
  ThemeIcon,
} from "@mantine/core";
import { BankIcon, Time02Icon } from "hugeicons-react";

interface ConfirmationStepProps {
  contact: Contact;
  bank: Recipient;
  amount: string | number;
  note?: string;
  onConfirm: () => void;
  actionType?: "send" | "request";
}

export default function ConfirmationStep({
  contact,
  bank,
  amount,
  note,
  onConfirm,
  actionType = "send",
}: ConfirmationStepProps) {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;
  const formattedAmount = (numericAmount || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Stack justify="space-between" gap="lg">
      <Card withBorder p="lg" radius="lg" w="100%">
        <Stack>
          <Group gap="xs" wrap="nowrap" justify="space-between">
            <Stack gap={0} miw={1} style={{ flex: 1 }}>
              <Text c="dimmed">
                {actionType === "send" ? "Send to" : "Request from"}
              </Text>
              <Title order={4} lineClamp={3} lh={1.2}>
                {contact.name}
              </Title>
              <Text
                size="xs"
                c="dimmed"
                lineClamp={1}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {contact.details}
              </Text>
            </Stack>

            <Avatar
              src={null}
              alt={contact.name}
              variant="light"
              color="lime"
              size={44}
            >
              {contact.avatar}
            </Avatar>
          </Group>

          <Divider />

          <Group gap="xs" wrap="nowrap" justify="space-between">
            <Stack gap={0} miw={1} style={{ flex: 1 }}>
              <Text c="dimmed">
                {actionType === "send" ? "Pay from" : "Deposit into"}
              </Text>
              <Title order={4} lineClamp={3} lh={1.2}>
                {bank.name}
              </Title>
              <Text
                size="xs"
                c="dimmed"
                lineClamp={1}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {bank.details}
              </Text>
            </Stack>
            <ThemeIcon variant="default" radius="xl" size={44}>
              <BankIcon size={24} />
            </ThemeIcon>
          </Group>

          {note && (
            <Stack>
              <Divider />
              <Stack gap={0}>
                <Text c="dimmed">Notes</Text>
                <Text size="lg">{note}</Text>
              </Stack>
            </Stack>
          )}

          <Divider />

          <Stack gap={0}>
            <Text c="dimmed">Amount</Text>
            <Title order={4}>{formattedAmount}</Title>
          </Stack>
        </Stack>
      </Card>

      {actionType === "send" && (
        <Alert title="" color="orange" variant="light" radius="lg">
          <Stack gap="xs">
            <Group wrap="nowrap" justify="space-between">
              <Title order={5} c="orange">
                Pending lien waiver
              </Title>
              <Time02Icon size={24} color="orange" />
            </Group>
            <Text size="sm">
              Funds will be held until the attached lien waiver is reviewed and
              accepted by the recipient.
            </Text>
          </Stack>
        </Alert>
      )}

      <Stack gap="lg">
        <Button size="xl" radius="xl" onClick={onConfirm}>
          {actionType === "send"
            ? `Send ${formattedAmount}`
            : `Request ${formattedAmount}`}
        </Button>
        <Stack gap="xs">
          <Text c="dimmed" size="sm" ta="center">
            Transactions typically take 1-3 business days to process.
          </Text>
          <Group justify="center">
            <Anchor ta="center" size="xs">
              Terms of Service
            </Anchor>
            <Anchor ta="center" size="xs">
              Privacy Policy
            </Anchor>
          </Group>
        </Stack>
      </Stack>
    </Stack>
  );
}
