// /src/features/wallet/components/actions/TransactionDrawerContent.tsx

import SelectBankStep from "@/features/banks/components/SelectBankStep";
import { useTransactionState } from "../../hooks/useTransactionState";
import SelectContactStep from "@/features/contacts/components/SelectContactStep";
import PaymentAmountStep from "./PaymentAmountStep";
import ConfirmationStep from "./ConfirmationStep";
import SuccessStep from "./SuccessStep";
import { Transition } from "@mantine/core";
import { useState, useEffect } from "react";

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
    selectedParty,
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
    handleStartOver,
    handleClose,
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

  const renderStep = (currentStep: typeof step) => {
    switch (currentStep) {
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
        if (selectedParty && selectedBank) {
          return (
            <PaymentAmountStep
              party={selectedParty}
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
        if (selectedParty && selectedBank) {
          return (
            <ConfirmationStep
              party={selectedParty}
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
      case "success":
        return (
          <SuccessStep
            transactionType={transactionType}
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
