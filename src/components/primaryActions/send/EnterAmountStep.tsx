import {
  Avatar,
  Button,
  Group,
  Stack,
  Text,
  NumberInput,
  ActionIcon,
  Tooltip, // 1. Import ActionIcon
} from "@mantine/core";
import classes from "./EnterAmount.module.css";
import { useEffect, useRef } from "react";
import { Recipient } from "../../contacts/types";
import { CancelCircleIcon } from "hugeicons-react";

interface EnterAmountStepProps {
  contact: Recipient;
  amount: string | number;
  setAmount: (value: string | number) => void;
  onContinue?: () => void;
}

export default function EnterAmountStep({
  contact,
  amount,
  setAmount,
  onContinue,
}: EnterAmountStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Stack justify="space-between" gap={60} pt="lg">
      <Stack align="center" gap="md">
        <NumberInput
          ref={inputRef}
          value={amount}
          onChange={setAmount}
          classNames={{ input: classes.amountInput }}
          variant="unstyled"
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator
          prefix="$"
          hideControls
          type="tel"
          placeholder="$0.00"
          rightSection={
            amount ? (
              <Tooltip label="Clear amount" position="left">
                <ActionIcon
                  onClick={() => setAmount("")}
                  variant="transparent"
                  c="gray"
                  aria-label="Clear amount"
                >
                  <CancelCircleIcon size={24} />
                </ActionIcon>
              </Tooltip>
            ) : null
          }
        />
        <Group wrap="nowrap">
          <Text>To:</Text>
          <Group wrap="nowrap" gap={8}>
            <Avatar color="lime" radius="xl" size="md">
              {contact.avatar}
            </Avatar>
            <Text fw={500}>{contact.name}</Text>
          </Group>
        </Group>
        <Text c="dimmed" size="md">
          Available balance: $40,000.00
        </Text>
      </Stack>

      <Button
        size="xl"
        radius="xl"
        disabled={!amount || Number(amount) === 0}
        onClick={onContinue}
      >
        Continue to review
      </Button>
    </Stack>
  );
}
