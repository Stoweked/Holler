import {
  Avatar,
  Button,
  Group,
  Stack,
  Text,
  NumberInput,
  ActionIcon,
  Tooltip,
  Textarea, // 1. Import ActionIcon
} from "@mantine/core";
import classes from "./EnterAmount.module.css";
import { useEffect, useRef } from "react";
import { Recipient } from "../../contacts/types";
import { CancelCircleIcon } from "hugeicons-react";

interface EnterAmountStepProps {
  contact: Recipient;
  amount: string | number;
  setAmount: (value: string | number) => void;
  note: string;
  setNote: (value: string) => void;
  onContinue?: () => void;
}

export default function EnterAmountStep({
  contact,
  amount,
  setAmount,
  note,
  setNote,
  onContinue,
}: EnterAmountStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Stack justify="space-between" gap={60} pt="lg">
      <Stack align="center" gap="md">
        <Text c="dimmed" size="md">
          Available balance: $40,000.00
        </Text>
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
      </Stack>

      <Stack>
        <Textarea
          placeholder="Add a note or description (optional)"
          value={note}
          onChange={(event) => setNote(event.currentTarget.value)}
          radius="lg"
          size="md"
          autosize
          minRows={3}
        />

        <Button
          size="xl"
          radius="xl"
          disabled={!amount || Number(amount) === 0}
          onClick={onContinue}
        >
          Continue to review
        </Button>

        <Text c="dimmed" size="sm" ta="center">
          All transactions are secure, encrypted, and private.
        </Text>
      </Stack>
    </Stack>
  );
}
