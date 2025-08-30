// /src/features/transactions/hooks/useTransactionState.ts

import { useState, useEffect, useCallback } from "react";
import { Recipient } from "@/features/contacts/types/recipient";
import { Waiver } from "@/features/waivers/types/waiver";
import { mockBanks } from "@/mockData/mockBanks";
import { TransactionActionType, TransactionStep } from "../types/wallet";

const hollerWalletContact: Recipient = {
  name: "Holler Wallet",
  avatar: "H",
  details: "Your balance",
};

export function useTransactionState(
  opened: boolean,
  transactionType: TransactionActionType,
  close: () => void,
  initialContact: Recipient | null
) {
  // Memoize getInitialStep with useCallback
  const getInitialStep = useCallback(() => {
    return transactionType === "deposit" || transactionType === "transfer"
      ? "selectBank"
      : "selectContact";
  }, [transactionType]);

  const [step, setStep] = useState<TransactionStep>(getInitialStep());
  const [selectedContact, setSelectedContact] = useState<Recipient | null>(
    null
  );
  const [selectedBank, setSelectedBank] = useState<Recipient>(mockBanks[0]);
  const [selectedWaiver, setSelectedWaiver] = useState<Waiver | null>(null);
  const [amount, setAmount] = useState<string | number>("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (opened) {
      if (initialContact) {
        setSelectedContact(initialContact);
        setStep("enterAmount");
      } else {
        setStep(getInitialStep());
      }
    } else {
      // Reset state on close
      setStep(getInitialStep());
      setSelectedContact(null);
    }
  }, [opened, initialContact, transactionType, getInitialStep]);

  const handleSelectContact = (contact: Recipient) => {
    setSelectedContact(contact);
    setStep("enterAmount");
  };

  const handleAmountContinue = () => setStep("confirm");
  const handleEditBank = () => setStep("selectBank");

  const handleSelectBank = (bank: Recipient) => {
    setSelectedBank(bank);
    if (transactionType === "transfer") {
      setSelectedContact(bank);
    } else if (transactionType === "deposit") {
      setSelectedContact(hollerWalletContact);
    }
    setStep("enterAmount");
  };

  const handleBack = () => {
    if (step === "selectBank" || step === "confirm") {
      setStep("enterAmount");
    } else if (step === "enterAmount") {
      if (initialContact) {
        close();
      } else {
        setStep(getInitialStep());
      }
    }
  };

  const resetState = () => {
    setStep(getInitialStep());
    setSelectedContact(null);
    setSelectedBank(mockBanks[0]);
    setAmount("");
    setNote("");
    setSelectedWaiver(null);
  };

  const handleStartOver = () => {
    resetState();
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      if (!initialContact) {
        setStep(getInitialStep());
        setSelectedContact(null);
      }
      setSelectedBank(mockBanks[0]);
      setAmount("");
      setNote("");
      setSelectedWaiver(null);
    }, 200);
  };

  return {
    step,
    setStep,
    selectedContact,
    selectedBank,
    selectedWaiver,
    amount,
    note,
    setAmount,
    setNote,
    setSelectedWaiver,
    handleSelectContact,
    handleAmountContinue,
    handleEditBank,
    handleSelectBank,
    handleBack,
    handleClose,
    transactionType,
    handleStartOver,
  };
}
