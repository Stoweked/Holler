import { Stack, Title, Text, Modal, Button, Avatar } from "@mantine/core";
import { BankIcon } from "hugeicons-react";
import { Bank } from "../types/bank";
import Image from "next/image";

interface BankProfileModalProps {
  opened: boolean;
  close: () => void;
  bank: Bank | null;
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
      title="Connected account"
      padding="lg"
      size="md"
      centered
    >
      <Stack gap="xl">
        <Stack align="center" gap="sm">
          {bank.avatar_url ? (
            <Image
              src={bank.avatar_url}
              alt={`${bank.name} logo`}
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <Avatar size={100} radius="50%" variant="default">
              <BankIcon size={48} />
            </Avatar>
          )}
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
          size="lg"
          aria-label="Disconnect bank account"
        >
          Disconnect bank account
        </Button>
      </Stack>
    </Modal>
  );
}
