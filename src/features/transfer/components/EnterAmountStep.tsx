import {
  Button,
  Stack,
  Text,
  NumberInput,
  ActionIcon,
  Tooltip,
  Textarea,
  Alert,
} from "@mantine/core";
import classes from "./EnterAmount.module.css";
import { useEffect, useRef, useState } from "react";
import { Alert02Icon, CancelCircleIcon } from "hugeicons-react";
import { Recipient } from "@/features/contacts/types/recipient";
import BankDetailsCard from "@/features/banks/components/BankDetailsCard";

interface EnterAmountStepProps {
  bank: Recipient;
  amount: string | number;
  setAmount: (value: string | number) => void;
  note: string;
  setNote: (value: string) => void;
  onContinue?: () => void;
  onEditBank?: () => void;
}

export default function EnterAmountStep({
  bank,
  amount,
  setAmount,
  note,
  setNote,
  onContinue,
  onEditBank,
}: EnterAmountStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // A hardcoded value for demonstration purposes
  const availableBalance = 40000;

  const handleAmountChange = (value: string | number) => {
    setAmount(value);
    if (Number(value) > availableBalance) {
      setError("Amount exceeds available balance");
    } else {
      setError(null);
    }
  };

  const handleContinue = () => {
    if (!error) {
      onContinue?.();
    }
  };

  return (
    <>
      <Stack justify="space-between" gap={30} pt="lg">
        <Stack align="center" gap="xs">
          <NumberInput
            ref={inputRef}
            value={amount}
            onChange={handleAmountChange}
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
          {error ? (
            <Alert
              variant="light"
              color="red"
              radius="lg"
              title={error}
              icon={<Alert02Icon />}
            />
          ) : (
            <Text c="dimmed" size="md" ta="center">
              Available balance: $
              {availableBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          )}
        </Stack>

        <Stack>
          <BankDetailsCard
            bank={bank}
            label={"Transfer to"}
            onEdit={onEditBank}
          />

          <Textarea
            placeholder="Add a note or description (optional)"
            value={note}
            onChange={(event) => setNote(event.currentTarget.value)}
            radius="lg"
            size="md"
            autosize
            minRows={2}
          />
          <Button
            size="xl"
            radius="xl"
            disabled={!amount || Number(amount) === 0 || !!error}
            onClick={handleContinue}
          >
            Continue to review
          </Button>
          <Text c="dimmed" size="sm" ta="center">
            All transactions are secure, encrypted, and private.
          </Text>
        </Stack>
      </Stack>
    </>
  );
}
