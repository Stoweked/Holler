import { useState, useEffect, useCallback } from "react";
import { Waiver } from "@/features/waivers/types/waiver";
import { mockBanks } from "@/mockData/mockBanks";
import { TransactionActionType, TransactionStep } from "../types/wallet";
import {
  Contact,
  TransactionRecipient,
} from "@/features/contacts/types/contact";

const hollerWalletContact: Contact = {
  id: "holler-wallet",
  full_name: "Holler Wallet",
  email: "Your balance",
};

export function useTransactionState(
  opened: boolean,
  transactionType: TransactionActionType,
  close: () => void,
  initialContact: Contact | null
) {
  const getInitialStep = useCallback(() => {
    return transactionType === "deposit" || transactionType === "transfer"
      ? "selectBank"
      : "selectContact";
  }, [transactionType]);

  const [step, setStep] = useState<TransactionStep>(getInitialStep());
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedBank, setSelectedBank] = useState<TransactionRecipient>(
    mockBanks[0]
  );
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
      setStep(getInitialStep());
      setSelectedContact(null);
    }
  }, [opened, initialContact, transactionType, getInitialStep]);

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setStep("enterAmount");
  };

  const handleAmountContinue = () => setStep("confirm");
  const handleEditBank = () => setStep("selectBank");

  const handleSelectBank = (bank: TransactionRecipient) => {
    setSelectedBank(bank);
    if (transactionType === "transfer") {
      // In a real app, you might create a proper contact object for the bank
      setSelectedContact({
        id: bank.name,
        full_name: bank.name,
        email: bank.details,
      });
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
