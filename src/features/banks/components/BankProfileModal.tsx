import { Stack, Title, Text, Modal, ThemeIcon, Button } from "@mantine/core";
import { BankIcon } from "hugeicons-react";
import { Recipient } from "@/features/contacts/types/recipient";

interface BankProfileModalProps {
  opened: boolean;
  close: () => void;
  bank: Recipient | null;
}

export default function BankProfileModal({
  opened,
  close,
  bank,
}: BankProfileModalProps) {
  if (!bank) {
    return null;
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Bank Details"
      padding="lg"
      size="md"
      centered
    >
      <Stack gap="xl">
        <Stack align="center" gap="sm">
          <ThemeIcon size={100} radius="50%" variant="default">
            <BankIcon size={48} />
          </ThemeIcon>
          <Stack align="center" gap={4}>
            <Title order={2} ta="center">
              {bank.name}
            </Title>
            <Text c="dimmed" ta="center">
              {bank.details}
            </Text>
          </Stack>
        </Stack>
        <Button
          variant="outline"
          color="red"
          aria-label="Disconnect bank account"
        >
          Disconnect bank account
        </Button>
      </Stack>
    </Modal>
  );
}
