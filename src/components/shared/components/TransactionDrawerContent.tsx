// /src/features/transactions/components/TransactionDrawerContent.tsx

import SelectBankStep from "@/features/banks/components/SelectBankStep";
import { useTransactionState } from "../hooks/useTransactionState";
import SelectContactStep from "@/features/contacts/components/SelectContactStep";
import PaymentAmountStep from "./PaymentAmountStep";
import ConfirmationStep from "./ConfirmationStep";

interface TransactionDrawerContentProps {
  state: ReturnType<typeof useTransactionState>;
  onConfirm: () => void;
  onConnectNew: () => void;
}

export default function TransactionDrawerContent({
  state,
  onConfirm,
  onConnectNew,
}: TransactionDrawerContentProps) {
  const {
    step,
    selectedContact,
    selectedBank,
    amount,
    note,
    selectedWaiver,
    handleSelectContact,
    handleAmountContinue,
    handleBack,
    handleEditBank,
    setAmount,
    setNote,
    setSelectedWaiver,
    handleSelectBank,
    transactionType,
  } = state;

  switch (step) {
    case "selectContact":
      return <SelectContactStep onSelectContact={handleSelectContact} />;
    case "selectBank":
      return (
        <SelectBankStep
          onSelectBank={handleSelectBank}
          onConnectNew={onConnectNew}
        />
      );
    case "enterAmount":
      if (selectedContact && selectedBank) {
        return (
          <PaymentAmountStep
            contact={selectedContact}
            bank={selectedBank}
            amount={amount}
            setAmount={setAmount}
            note={note}
            setNote={setNote}
            onContinue={handleAmountContinue}
            onEditContact={handleBack}
            onEditBank={handleEditBank}
            actionType={transactionType}
            selectedWaiver={selectedWaiver}
            setSelectedWaiver={setSelectedWaiver}
            isSend={transactionType === "send"}
          />
        );
      }
      return null;
    case "confirm":
      if (selectedContact && selectedBank) {
        return (
          <ConfirmationStep
            contact={selectedContact}
            bank={selectedBank}
            amount={amount}
            note={note}
            onConfirm={onConfirm}
            actionType={transactionType}
            waiver={selectedWaiver}
          />
        );
      }
      return null;
    default:
      return null;
  }
}
