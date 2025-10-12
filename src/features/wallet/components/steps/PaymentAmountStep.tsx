// src/features/wallet/components/actions/PaymentAmountStep.tsx
import { Button, Stack, Text, Textarea } from "@mantine/core";
import { useEffect, useRef } from "react";
import { Alert02Icon } from "hugeicons-react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import BankDetailsCard from "@/features/banks/components/BankDetailsCard";
import { Waiver } from "@/features/waivers/types/waiver";
import LienWaiverDetailsCard from "@/features/waivers/components/LienWaiverDetailsCard";
import ProfileModal from "@/features/contacts/components/ContactModal";
import AmountInput from "./AmountInput";
import { useWallet } from "@/features/wallet/contexts/WalletContext";
import { TransactionActionType } from "../../types/wallet";
import { Bank } from "@/features/banks/types/bank";
import { TransactionParty } from "@/features/transactions/types/transactionParty";
import { useWaivers } from "@/features/waivers/contexts/WaiversContext";
import { Contacts } from "@/features/contacts";

interface PaymentAmountStepProps {
  party: TransactionParty | null;
  bank: Bank;
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
}

export default function PaymentAmountStep({
  party,
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
}: PaymentAmountStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const isSend = actionType === "send";
  const showWaiverInput = actionType === "send" || "request";

  const [
    openedProfileModal,
    { open: openProfileModal, close: closeProfileModal },
  ] = useDisclosure(false);
  const { balance } = useWallet();
  const { newlyCreatedWaiver, setNewlyCreatedWaiver, waivers } = useWaivers();

  useEffect(() => {
    if (newlyCreatedWaiver && waivers.length === 1) {
      setSelectedWaiver(newlyCreatedWaiver);
      setNewlyCreatedWaiver(null); // Clear it after using it
    }
  }, [newlyCreatedWaiver, waivers, setSelectedWaiver, setNewlyCreatedWaiver]);

  useEffect(() => {
    inputRef.current?.focus();
    topRef.current?.scrollIntoView({ behavior: "smooth" });
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
    if (!party) return null;

    if (party.type === "contact") {
      return (
        <>
          <Contacts.DetailsCard
            contact={party.data}
            label={actionType === "send" ? "Send to" : "Request from"}
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

    if (party.type === "bank") {
      return (
        <BankDetailsCard
          bank={party.data}
          label={actionType === "deposit" ? "Deposit from" : "Transfer to"}
          onEdit={onEditBank}
        />
      );
    }

    return null;
  };

  return (
    <>
      <Stack ref={topRef} justify="space-between" gap={30} pt="lg">
        <AmountInput
          ref={inputRef}
          amount={amount}
          setAmount={setAmount}
          initialBalance={balance}
          flowType={isSend || actionType === "transfer" ? "debit" : "credit"}
        />

        <Stack>
          {renderRecipientDetails()}

          {showWaiverInput && (
            <LienWaiverDetailsCard
              selectedWaiver={selectedWaiver}
              setSelectedWaiver={setSelectedWaiver}
            />
          )}

          <Textarea
            placeholder="Add a note or description"
            value={note}
            onChange={(event) => setNote(event.currentTarget.value)}
            radius="lg"
            size="lg"
            autosize
            minRows={1}
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

      {party?.type === "contact" && (
        <ProfileModal
          opened={openedProfileModal}
          close={closeProfileModal}
          contact={party.data}
          showButtons={false}
        />
      )}
    </>
  );
}
