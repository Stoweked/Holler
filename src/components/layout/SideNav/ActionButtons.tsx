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
      <Group wrap="nowrap" gap="xl">
        {/* Deposit button */}
        <Stack gap={4} align="center">
          <ActionIcon
            variant="default"
            size={48}
            radius="xl"
            aria-label="Deposit funds"
            onClick={onDepositClick}
          >
            <PlusSignIcon size={24} />
          </ActionIcon>
          <Text size="xs" fw="bold">
            Deposit
          </Text>
        </Stack>

        {/* Request button */}
        <Stack gap={4} align="center">
          <ActionIcon
            variant="default"
            size={48}
            radius="xl"
            aria-label="Request funds"
            onClick={onRequestClick}
          >
            <ArrowDown02Icon size={24} />
          </ActionIcon>
          <Text size="xs" fw="bold">
            Request
          </Text>
        </Stack>

        {/* Send button */}
        <Stack gap={4} align="center">
          <ActionIcon
            variant="default"
            size={48}
            radius="xl"
            aria-label="Send funds"
            onClick={onSendClick}
          >
            <ArrowUp02Icon size={24} />
          </ActionIcon>
          <Text size="xs" fw="bold">
            Send
          </Text>
        </Stack>

        {/* Transfer button */}
        <Stack gap={4} align="center">
          <ActionIcon
            variant="default"
            size={48}
            radius="xl"
            aria-label="Transfer funds"
            onClick={onTransferClick}
          >
            <BankIcon size={24} />
          </ActionIcon>
          <Text size="xs" fw="bold">
            Transfer
          </Text>
        </Stack>
      </Group>
    </>
  );
}
