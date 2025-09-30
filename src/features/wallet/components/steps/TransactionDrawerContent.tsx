// src/features/wallet/components/actions/TransactionDrawerContent.tsx
import SelectBankStep from "@/features/banks/components/SelectBankStep";
import { useTransactionState } from "../../hooks/useTransactionState";
import SelectContactStep from "@/features/contacts/components/SelectContactStep";
import PaymentAmountStep from "./PaymentAmountStep";
import ConfirmationStep from "./ConfirmationStep";
import SuccessStep from "./SuccessStep";
import { Transition } from "@mantine/core";
import { useState, useEffect } from "react";
import { Contact } from "@/features/contacts/types/contact";
import InviteContactStep from "@/features/contacts/components/InviteContactStep";

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
    party,
    bank,
    amount,
    note,
    selectedWaiver,
    setParty,
    handleAmountContinue,
    handleEditBank,
    handleEditContact,
    setAmount,
    setNote,
    setSelectedWaiver,
    setBank,
    actionType,
    handleStartOver,
    handleClose,
    transactionId,
    handleInviteNew,
    handleInvite,
  } = state;

  const [activeStep, setActiveStep] = useState(step);
  const [isMounted, setIsMounted] = useState(true);
  const transitionDuration = 200;

  useEffect(() => {
    if (step !== activeStep) {
      setIsMounted(false);
      const timer = setTimeout(() => {
        setActiveStep(step);
        setIsMounted(true);
      }, transitionDuration);
      return () => clearTimeout(timer);
    }
  }, [step, activeStep]);

  // Wrapper function to satisfy the expected type for onSelectContact
  const handleSelectContact = (contact: Contact) => {
    setParty({ type: "contact", data: contact });
  };

  const renderStep = (currentStep: typeof step) => {
    if (!actionType) return null;

    switch (currentStep) {
      case "selectContact":
        return (
          <SelectContactStep
            onSelectContact={handleSelectContact}
            onInviteNew={handleInviteNew}
          />
        );
      case "inviteContact":
        return <InviteContactStep onInvite={handleInvite} />;
      case "selectBank":
        return (
          <SelectBankStep onSelectBank={setBank} onConnectNew={onConnectNew} />
        );
      case "enterAmount":
        if (party && bank) {
          return (
            <PaymentAmountStep
              party={party}
              bank={bank}
              amount={amount}
              setAmount={setAmount}
              note={note}
              setNote={setNote}
              onContinue={handleAmountContinue}
              onEditContact={handleEditContact}
              onEditBank={handleEditBank}
              actionType={actionType}
              selectedWaiver={selectedWaiver}
              setSelectedWaiver={setSelectedWaiver}
            />
          );
        }
        return null;
      case "confirm":
        if (party && bank) {
          return (
            <ConfirmationStep
              party={party}
              bank={bank}
              amount={amount}
              note={note}
              onConfirm={onConfirm}
              actionType={actionType}
              waiver={selectedWaiver}
            />
          );
        }
        return null;
      case "success":
        return (
          <SuccessStep
            transactionType={actionType}
            transactionId={transactionId}
            onDone={handleClose}
            onStartOver={handleStartOver}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Transition
      mounted={isMounted}
      transition="fade"
      duration={transitionDuration}
      timingFunction="ease"
    >
      {(styles) => <div style={styles}>{renderStep(activeStep)}</div>}
    </Transition>
  );
}
