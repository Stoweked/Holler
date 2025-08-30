import {
  Stack,
  Text,
  NumberInput,
  ActionIcon,
  Tooltip,
  Alert,
} from "@mantine/core";
import classes from "./Actions.module.css";
import { useEffect, useRef, useState } from "react";
import { Alert02Icon, Cancel01Icon } from "hugeicons-react";

interface AmountInputProps {
  amount: string | number;
  setAmount: (value: string | number) => void;
  initialBalance: number;
  flowType: "debit" | "credit";
}

export default function AmountInput({
  amount,
  setAmount,
  initialBalance,
  flowType,
}: AmountInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fontSize, setFontSize] = useState("3.5rem");
  const [error, setError] = useState<string | null>(null);
  const numericAmount = Number(amount) || 0;
  const newBalance =
    flowType === "debit"
      ? initialBalance - numericAmount
      : initialBalance + numericAmount;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const valueString = String(amount);
    const length = valueString.replace(/[^0-9]/g, "").length;
    if (length > 9) {
      setFontSize("2rem");
    } else if (length > 6) {
      setFontSize("2.5rem");
    } else {
      setFontSize("3.5rem");
    }
  }, [amount]);

  const handleAmountChange = (value: string | number) => {
    setAmount(value);
    const numericValue = Number(value);
    if (flowType === "debit" && numericValue > initialBalance) {
      const difference = numericValue - initialBalance;
      setError(
        `Exceeds balance by $${difference.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      );
    } else {
      setError(null);
    }
  };

  const balanceText =
    flowType === "debit"
      ? numericAmount > 0
        ? `Remaining balance: $${newBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : `Available balance: $${initialBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
      : `New balance will be: $${newBalance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

  return (
    <Stack align="center" gap="xs">
      <NumberInput
        w="100%"
        ref={inputRef}
        value={amount}
        onChange={handleAmountChange}
        styles={{ input: { fontSize } }}
        classNames={{ input: classes.amountInput }}
        variant="unstyled"
        decimalScale={2}
        fixedDecimalScale
        thousandSeparator
        prefix="$"
        hideControls
        inputMode="decimal"
        enterKeyHint="done"
        type="text"
        placeholder="$0.00"
        rightSection={
          amount ? (
            <Tooltip label="Clear amount" position="left">
              <ActionIcon
                onClick={() => {
                  setAmount("");
                  setError(null);
                }}
                variant="default"
                c="gray"
                aria-label="Clear amount"
              >
                <Cancel01Icon size={20} />
              </ActionIcon>
            </Tooltip>
          ) : null
        }
      />
      {error && flowType === "debit" ? (
        <Alert
          variant="light"
          color="red"
          radius="md"
          py="xs"
          px="md"
          title={error}
          icon={<Alert02Icon />}
        />
      ) : (
        <Text c="dimmed" size="md" ta="center">
          {balanceText}
        </Text>
      )}
    </Stack>
  );
}
