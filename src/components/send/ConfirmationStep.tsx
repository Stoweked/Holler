import {
  Avatar,
  Button,
  Group,
  Stack,
  Text,
  Title,
  Paper,
} from "@mantine/core";
import { Contact } from "@/components/contacts/types";

interface ConfirmationStepProps {
  contact: Contact;
  amount: string | number;
  onConfirm: () => void;
}

export default function ConfirmationStep({
  contact,
  amount,
  onConfirm,
}: ConfirmationStepProps) {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;
  const formattedAmount = (numericAmount || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Stack justify="space-between" h="100%">
      <Stack align="center" gap="xl" mt="xl">
        <Title order={2}>Review and send</Title>
        <Paper withBorder p="lg" radius="md" w="100%">
          <Stack>
            <Group justify="space-between">
              <Text c="dimmed">To:</Text>
              <Group gap="xs">
                <Avatar src={null} alt={contact.name} color="lime" size="sm">
                  {contact.avatar}
                </Avatar>
                <Text fw={500}>{contact.name}</Text>
              </Group>
            </Group>
            <Group justify="space-between">
              <Text c="dimmed">Amount:</Text>
              <Text fw={700} size="lg">
                {formattedAmount}
              </Text>
            </Group>
          </Stack>
        </Paper>
      </Stack>
      <Button size="xl" radius="xl" onClick={onConfirm}>
        Send Payment
      </Button>
    </Stack>
  );
}
