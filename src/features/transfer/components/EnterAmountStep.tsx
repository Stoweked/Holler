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
import { Alert02Icon, Cancel01Icon, CancelCircleIcon } from "hugeicons-react";
import { Recipient } from "@/features/contacts/types/recipient";
import BankDetailsCard from "@/features/banks/components/BankDetailsCard";
import AmountInput from "@/components/shared/AmountInput";

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
  const [fontSize, setFontSize] = useState("3.5rem");

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
        <AmountInput
          amount={amount}
          setAmount={setAmount}
          initialBalance={40000}
          flowType="debit"
        />

        <Stack>
          <BankDetailsCard
            bank={bank}
            label={"Transfer to"}
            onEdit={onEditBank}
          />

          <Textarea
            placeholder="Add a note or description"
            value={note}
            onChange={(event) => setNote(event.currentTarget.value)}
            radius="md"
            size="md"
            autosize
            minRows={3}
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
