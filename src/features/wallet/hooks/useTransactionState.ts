import { useState, useEffect, useCallback } from "react";
import { Waiver } from "@/features/waivers/types/waiver";
import { mockBanks } from "@/mockData/mockBanks";
import { TransactionActionType, TransactionStep } from "../types/wallet";
import { Contact } from "@/features/contacts/types/contact";
import { Bank } from "@/features/banks/types/bank";
import { TransactionParty } from "@/features/transactions/types/transactionParty";

export function useTransactionState(
  opened: boolean,
  transactionType: TransactionActionType,
  close: () => void,
  initialContact: Contact | null
) {
  const getInitialStep = useCallback((): TransactionStep => {
    if (initialContact) {
      return "enterAmount";
    }
    if (transactionType === "deposit" || transactionType === "transfer") {
      return "selectBank";
    }
    return "selectContact";
  }, [transactionType, initialContact]);

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
      setTimeout(() => {
        setStep(getInitialStep());
        setSelectedParty(null);
        setSelectedBank(mockBanks[0]);
        setAmount("");
        setNote("");
        setSelectedWaiver(null);
      }, 200); // Delay to allow for closing animation
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
      // For send/request, "back" always means choosing the contact again.
      // For deposit/transfer, it means choosing the bank again.
      if (transactionType === "send" || transactionType === "request") {
        setStep("selectContact");
      } else {
        // deposit or transfer
        setStep("selectBank");
      }
    } else {
      // From selectContact or selectBank step, close the drawer
      close();
    }
  };

  const handleClose = () => {
    close();
  };

  const handleStartOver = () => {
    // Reset to the appropriate initial step, considering if there was an initialContact
    const initialStep = getInitialStep();
    setStep(initialStep);

    // If there wasn't an initial contact, clear the selected party.
    // If there was, keep it, because "start over" should just reset the amount/note.
    if (!initialContact) {
      setSelectedParty(null);
    }

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
