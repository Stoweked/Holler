import { useState, useEffect, useCallback } from "react";
import { Waiver } from "@/features/waivers/types/waiver";
import { mockBanks } from "@/mockData/mockBanks";
import {
  TransactionActionType,
  TransactionStep,
  TransactionParty,
} from "../types/wallet";
import { Contact } from "@/features/contacts/types/contact";
import { Bank } from "@/features/banks/types/bank";

export function useTransactionState(
  opened: boolean,
  transactionType: TransactionActionType,
  close: () => void,
  initialContact: Contact | null
) {
  const getInitialStep = useCallback((): TransactionStep => {
    if (transactionType === "deposit" || transactionType === "transfer") {
      return "selectBank";
    }
    return "selectContact";
  }, [transactionType]);

  const [step, setStep] = useState<TransactionStep>(getInitialStep());
  const [selectedParty, setSelectedParty] = useState<TransactionParty | null>(
    null
  );
  const [selectedBank, setSelectedBank] = useState<Bank>(mockBanks[0]);
  const [selectedWaiver, setSelectedWaiver] = useState<Waiver | null>(null);
  const [amount, setAmount] = useState<string | number>("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (opened) {
      if (initialContact) {
        setSelectedParty({ type: "contact", data: initialContact });
        setStep("enterAmount");
      } else {
        setStep(getInitialStep());
      }
    } else {
      // Reset state when drawer is closed
      setStep(getInitialStep());
      setSelectedParty(null);
      setSelectedBank(mockBanks[0]);
      setAmount("");
      setNote("");
      setSelectedWaiver(null);
    }
  }, [opened, initialContact, transactionType, getInitialStep]);

  const handleSelectContact = (contact: Contact) => {
    setSelectedParty({ type: "contact", data: contact });
    setStep("enterAmount");
  };

  const handleSelectBank = (bank: Bank) => {
    setSelectedBank(bank);
    if (transactionType === "transfer" || transactionType === "deposit") {
      setSelectedParty({ type: "bank", data: bank });
    }
    setStep("enterAmount");
  };

  const handleAmountContinue = () => setStep("confirm");
  const handleEditBank = () => setStep("selectBank");

  const handleBack = () => {
    if (step === "confirm") {
      setStep("enterAmount");
    } else if (step === "enterAmount") {
      if (initialContact) {
        close();
      } else {
        setStep(getInitialStep());
      }
    } else {
      close();
    }
  };

  const handleClose = () => {
    close();
  };

  const handleStartOver = () => {
    setStep(getInitialStep());
    setSelectedParty(null);
    setSelectedBank(mockBanks[0]);
    setAmount("");
    setNote("");
    setSelectedWaiver(null);
  };

  return {
    step,
    setStep,
    selectedParty,
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
