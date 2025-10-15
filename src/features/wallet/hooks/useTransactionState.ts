// src/features/wallet/hooks/useTransactionState.ts
import { useState, useEffect, useCallback } from "react";
import { Waiver } from "@/features/waivers/types/waiver";
import { mockBanks } from "@/mockData/mockBanks";
import { TransactionActionType, TransactionStep } from "../types/wallet";
import { Bank } from "@/features/banks/types/bank";
import { TransactionParty } from "@/features/transactions/types/transactionParty";
import { createTemporaryContact } from "@/features/contacts/utils/createContact";

export function useTransactionState(
  opened: boolean,
  actionType: TransactionActionType,
  close: () => void,
  preselectedParty: TransactionParty | null
) {
  const getInitialStep = useCallback((): TransactionStep => {
    if (preselectedParty) {
      if (actionType === "send" || actionType === "request") {
        return "enterAmount";
      }
    }
    if (actionType === "deposit" || actionType === "transfer") {
      return "selectBank";
    }
    return "selectContact";
  }, [actionType, preselectedParty]);

  const [step, setStep] = useState<TransactionStep>(getInitialStep());
  const [party, setParty] = useState<TransactionParty | null>(preselectedParty);
  const [bank, setBank] = useState<Bank>(mockBanks[0]);
  const [selectedWaiver, setSelectedWaiver] = useState<Waiver | null>(null);
  const [amount, setAmount] = useState<string | number>("");
  const [note, setNote] = useState("");
  const [transactionId, setTransactionId] = useState<string | undefined>(
    undefined
  );
  const [cameFromInvite, setCameFromInvite] = useState(false);

  useEffect(() => {
    if (opened) {
      setParty(preselectedParty);
      setStep(getInitialStep());
    } else {
      setTimeout(() => {
        setStep("selectContact");
        setParty(null);
        setBank(mockBanks[0]);
        setAmount("");
        setNote("");
        setSelectedWaiver(null);
        setCameFromInvite(false);
      }, 300);
    }
  }, [opened, preselectedParty, getInitialStep]);

  const handleSelectParty = (selected: TransactionParty) => {
    setParty(selected);
    setCameFromInvite(false);
    setStep("enterAmount");
  };

  const handleInviteNew = () => {
    setStep("inviteContact");
  };

  const handleInvite = (
    method: "email" | "phone",
    value: string,
    fullName: string
  ) => {
    // Here you would typically have logic to check if a user with this email/phone already exists.
    // For now, we'll just create a temporary contact object.
    const newContact = createTemporaryContact(method, value, fullName);
    setParty({ type: "contact", data: newContact });
    setCameFromInvite(true);
    setStep("enterAmount");
  };

  const handleSelectBank = (selected: Bank) => {
    setBank(selected);
    if (actionType === "transfer" || actionType === "deposit") {
      setParty({ type: "bank", data: selected });
    }
    setStep("enterAmount");
  };

  const handleAmountContinue = () => setStep("confirm");
  const handleEditBank = () => setStep("selectBank");
  const handleEditContact = () => {
    if (cameFromInvite) {
      setStep("inviteContact");
    } else {
      setStep("selectContact");
    }
  };

  const handleBack = () => {
    if (step === "confirm") {
      setStep("enterAmount");
    } else if (step === "enterAmount") {
      if (preselectedParty) {
        close();
        return;
      }
      if (cameFromInvite) {
        setStep("inviteContact");
      } else if (actionType === "send" || actionType === "request") {
        setStep("selectContact");
      } else {
        setStep("selectBank");
      }
    } else if (step === "inviteContact") {
      setStep("selectContact");
    } else {
      close();
    }
  };

  const handleClose = () => close();

  const handleStartOver = () => {
    setStep(getInitialStep());
    if (!preselectedParty) {
      setParty(null);
    }
    setBank(mockBanks[0]);
    setAmount("");
    setNote("");
    setSelectedWaiver(null);
    setCameFromInvite(false);
  };

  return {
    step,
    setStep,
    party,
    setParty: handleSelectParty,
    bank,
    setBank: handleSelectBank,
    selectedWaiver,
    amount,
    note,
    setAmount,
    setNote,
    setSelectedWaiver,
    handleAmountContinue,
    handleEditBank,
    handleEditContact,
    handleBack,
    handleClose,
    handleStartOver,
    actionType,
    transactionId,
    setTransactionId,
    handleInviteNew,
    handleInvite,
  };
}
