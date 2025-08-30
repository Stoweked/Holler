import {
  Button,
  Stack,
  Text,
  NumberInput,
  ActionIcon,
  Tooltip,
  Textarea,
} from "@mantine/core";
import classes from "./EnterAmount.module.css";
import { useEffect, useRef, useState } from "react";
import { Alert02Icon, Cancel01Icon } from "hugeicons-react";
import { useDisclosure } from "@mantine/hooks";
import ProfileModal from "../../profile/components/ProfileModal";
import { notifications } from "@mantine/notifications";
import { Recipient } from "@/features/contacts/types/recipient";
import ContactDetailsCard from "@/features/contacts/components/ContactDetailsCard";
import BankDetailsCard from "@/features/banks/components/BankDetailsCard";
import { Waiver } from "@/features/waivers/types/waiver";
import LienWaiverDetailsCard from "./LienWaiverDetailsCard";
import AmountInput from "@/components/shared/AmountInput";

interface PaymentAmountStepProps {
  contact: Recipient;
  bank: Recipient;
  amount: string | number;
  setAmount: (value: string | number) => void;
  note: string;
  setNote: (value: string) => void;
  onContinue?: () => void;
  onEditContact?: () => void;
  onEditBank?: () => void;
  actionType: "send" | "request";
  selectedWaiver: Waiver | null;
  setSelectedWaiver: (waiver: Waiver | null) => void;
  isSend: boolean;
}

export default function PaymentAmountStep({
  contact,
  bank,
  amount,
  setAmount,
  note,
  setNote,
  onContinue,
  onEditContact,
  onEditBank,
  actionType,
  selectedWaiver,
  setSelectedWaiver,
  isSend,
}: PaymentAmountStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [
    openedProfileModal,
    { open: openProfileModal, close: closeProfileModal },
  ] = useDisclosure(false);
  const [fontSize, setFontSize] = useState("3.5rem");
  const initialBalance = 40000;
  const numericAmount = Number(amount) || 0;
  const remainingBalance = initialBalance - numericAmount;

  const recipientLabel =
    actionType === "send" ? "Sending to" : "Requesting from";
  const bankLabel = actionType === "send" ? "Pay from" : "Deposit into";

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

  const handleContinue = () => {
    if (actionType === "send" && Number(amount) > remainingBalance) {
      notifications.show({
        title: "Insufficient funds",
        message: "The amount you entered exceeds your available balance.",
        color: "red",
        icon: <Alert02Icon size={18} />,
        autoClose: 5000,
      });
      return;
    }

    onContinue?.();
  };

  return (
    <>
      <Stack justify="space-between" gap={30} pt="lg">
        <AmountInput
          amount={amount}
          setAmount={setAmount}
          initialBalance={40000}
          flowType={isSend ? "debit" : "credit"}
        />

        <Stack>
          <ContactDetailsCard
            contact={contact}
            label={recipientLabel}
            onEdit={onEditContact}
            onViewProfile={openProfileModal}
          />
          <BankDetailsCard bank={bank} label={bankLabel} onEdit={onEditBank} />

          {isSend && (
            <LienWaiverDetailsCard
              selectedWaiver={selectedWaiver}
              setSelectedWaiver={setSelectedWaiver}
            />
          )}

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
            disabled={!amount || Number(amount) === 0}
            onClick={handleContinue}
          >
            Continue to review
          </Button>
          <Text c="dimmed" size="sm" ta="center">
            All transactions are secure, encrypted, and private.
          </Text>
        </Stack>
      </Stack>

      <ProfileModal
        opened={openedProfileModal}
        close={closeProfileModal}
        contact={contact}
        showButtons={false}
      />
    </>
  );
}
