import { Recipient } from "@/features/contacts/types/recipient";
import {
  Button,
  Group,
  Stack,
  Text,
  Title,
  Card,
  Divider,
  ThemeIcon,
  Image,
} from "@mantine/core";
import { BankIcon } from "hugeicons-react";

interface ConfirmationStepProps {
  bank: Recipient;
  amount: string | number;
  note?: string;
  onConfirm: () => void;
}

export default function ConfirmationStep({
  bank,
  amount,
  note,
  onConfirm,
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
            <Stack gap={0}>
              <Text c="dimmed">Transfer from</Text>
              <Title order={4}>Holler</Title>
              <Text c="dimmed">Your wallet</Text>
            </Stack>
            <ThemeIcon variant="default" radius="xl" size={44}>
              <Image
                aria-label="Holler logo"
                w={20}
                h="auto"
                src="/images/logomark.svg"
              />
            </ThemeIcon>
          </Group>

          <Divider />

          <Group gap="xs" wrap="nowrap" justify="space-between">
            <Stack gap={0}>
              <Text c="dimmed">Transfer to</Text>
              <Title order={4}>{bank.name}</Title>
              <Text c="dimmed">{bank.details}</Text>
            </Stack>
            <ThemeIcon variant="default" radius="xl" size={44}>
              <BankIcon size={24} />
            </ThemeIcon>
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
        </Stack>
      </Card>

      <Stack gap="lg">
        <Button size="xl" radius="xl" onClick={onConfirm}>
          {`Transfer ${formattedAmount}`}
        </Button>

        <Text c="dimmed" size="sm" ta="center">
          Transactions typically take 1-3 business days to process.
        </Text>
      </Stack>
    </Stack>
  );
}
