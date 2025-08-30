// /src/features/send-request/components/PaymentAmountStep.tsx

import { Button, Stack, Text, Textarea } from "@mantine/core";
import { useEffect, useRef } from "react";
import { Alert02Icon } from "hugeicons-react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Recipient } from "@/features/contacts/types/recipient";
import ContactDetailsCard from "@/features/contacts/components/ContactDetailsCard";
import BankDetailsCard from "@/features/banks/components/BankDetailsCard";
import { Waiver } from "@/features/waivers/types/waiver";
import LienWaiverDetailsCard from "@/features/waivers/components/LienWaiverDetailsCard";
import ProfileModal from "@/features/profile/components/ProfileModal";
import { TransactionActionType } from "../../hooks/useTransactionState";
import AmountInput from "./AmountInput";
import { useWallet } from "@/contexts/WalletContext";

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
  actionType: TransactionActionType;
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
  const { balance } = useWallet();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleContinue = () => {
    if (actionType === "send" && Number(amount) > balance) {
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

  const renderRecipientDetails = () => {
    if (actionType === "transfer") {
      return (
        <BankDetailsCard
          bank={bank}
          label={"Transfer to"}
          onEdit={onEditBank}
        />
      );
    }
    if (actionType !== "deposit") {
      return (
        <>
          <ContactDetailsCard
            contact={contact}
            label={actionType === "send" ? "Sending to" : "Requesting from"}
            onEdit={onEditContact}
            onViewProfile={openProfileModal}
          />
          <BankDetailsCard
            bank={bank}
            label={actionType === "send" ? "Pay from" : "Deposit into"}
            onEdit={onEditBank}
          />
        </>
      );
    }
    return (
      <BankDetailsCard bank={bank} label={"Deposit from"} onEdit={onEditBank} />
    );
  };

  return (
    <>
      <Stack justify="space-between" gap={30} pt="lg">
        <AmountInput
          amount={amount}
          setAmount={setAmount}
          initialBalance={balance}
          flowType={isSend || actionType === "transfer" ? "debit" : "credit"}
        />

        <Stack>
          {renderRecipientDetails()}

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
