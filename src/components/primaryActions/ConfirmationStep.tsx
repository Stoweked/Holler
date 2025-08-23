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
} from "@mantine/core";
import { Contact } from "@/components/contacts/types";
import { Time02Icon } from "hugeicons-react";

interface ConfirmationStepProps {
  contact: Contact;
  amount: string | number;
  note?: string;
  onConfirm: () => void;
  actionType?: "send" | "request";
}

export default function ConfirmationStep({
  contact,
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
      <Card withBorder p="lg" radius="lg" w="100%" shadow="sm">
        <Stack>
          <Group gap="xs" wrap="nowrap" justify="space-between">
            <Stack gap={0}>
              <Text c="dimmed">Recipient</Text>
              <Title order={4}>{contact.name}</Title>
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

          {note && (
            <Stack>
              <Stack gap={0}>
                <Text c="dimmed">Notes</Text>
                <Text size="lg">{note}</Text>
              </Stack>

              <Divider />
            </Stack>
          )}

          <Stack gap={0}>
            <Text c="dimmed">Amount</Text>
            <Title order={4}>{formattedAmount}</Title>
          </Stack>

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
                  Funds will be held until the attached lien waiver is reviewed
                  and accepted by the recipient.
                </Text>
              </Stack>
            </Alert>
          )}
        </Stack>
      </Card>

      <Stack gap="lg">
        <Button size="xl" radius="xl" onClick={onConfirm}>
          {actionType === "send" ? "Send payment" : "Request payment"}
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
