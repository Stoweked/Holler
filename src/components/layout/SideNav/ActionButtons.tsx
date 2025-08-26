import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import {
  ArrowDown02Icon,
  ArrowUp02Icon,
  BankIcon,
  PlusSignIcon,
} from "hugeicons-react";

interface ActionButtonsProps {
  onDepositClick?: () => void;
  onRequestClick?: () => void;
  onSendClick?: () => void;
  onTransferClick?: () => void;
}

export default function ActionButtons({
  onDepositClick,
  onRequestClick,
  onSendClick,
  onTransferClick,
}: ActionButtonsProps) {
  return (
    <>
      <Group wrap="nowrap" gap="xl" grow w="100%" maw={300}>
        {/* Deposit button */}
        <Stack gap={4} align="center">
          <ActionIcon
            variant="default"
            size={56}
            radius="xl"
            aria-label="Deposit funds"
            onClick={onDepositClick}
          >
            <PlusSignIcon size={32} />
          </ActionIcon>
          <Text size="xs" fw={500}>
            Deposit
          </Text>
        </Stack>

        {/* Send button */}
        <Stack gap={4} align="center">
          <ActionIcon
            variant="default"
            size={56}
            radius="xl"
            aria-label="Send funds"
            onClick={onSendClick}
          >
            <ArrowUp02Icon size={32} />
          </ActionIcon>
          <Text size="xs" fw={500}>
            Send
          </Text>
        </Stack>

        {/* Request button */}
        <Stack gap={4} align="center">
          <ActionIcon
            variant="default"
            size={56}
            radius="xl"
            aria-label="Request funds"
            onClick={onRequestClick}
          >
            <ArrowDown02Icon size={32} />
          </ActionIcon>
          <Text size="xs" fw={500}>
            Request
          </Text>
        </Stack>

        {/* Transfer button */}
        <Stack gap={4} align="center">
          <ActionIcon
            variant="default"
            size={56}
            radius="xl"
            aria-label="Transfer funds"
            onClick={onTransferClick}
          >
            <BankIcon size={32} />
          </ActionIcon>
          <Text size="xs" fw={500}>
            Transfer
          </Text>
        </Stack>
      </Group>
    </>
  );
}
