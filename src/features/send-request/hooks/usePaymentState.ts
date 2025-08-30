import { useState, useEffect } from "react";
import { Recipient } from "@/features/contacts/types/recipient";
import { Waiver } from "@/features/waivers/types/waiver";
import { mockBanks } from "@/mockData/mockBanks";

export type PaymentStep =
  | "selectContact"
  | "enterAmount"
  | "confirm"
  | "selectBank";

export function usePaymentState(
  opened: boolean,
  initialContact: Recipient | null,
  close: () => void
) {
  const [step, setStep] = useState<PaymentStep>("selectContact");
  const [selectedContact, setSelectedContact] = useState<Recipient | null>(
    null
  );
  const [selectedBank, setSelectedBank] = useState<Recipient>(mockBanks[0]);
  const [selectedWaiver, setSelectedWaiver] = useState<Waiver | null>(null);
  const [amount, setAmount] = useState<string | number>("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (opened && initialContact) {
      setSelectedContact(initialContact);
      setStep("enterAmount");
    } else if (!opened) {
      setStep("selectContact");
      setSelectedContact(null);
    }
  }, [opened, initialContact]);

  const handleSelectContact = (contact: Recipient) => {
    setSelectedContact(contact);
    setStep("enterAmount");
  };

  const handleAmountContinue = () => setStep("confirm");
  const handleEditBank = () => setStep("selectBank");

  const handleSelectBank = (bank: Recipient) => {
    setSelectedBank(bank);
    setStep("enterAmount");
  };

  const handleBack = () => {
    if (step === "selectBank" || step === "confirm") {
      setStep("enterAmount");
    } else if (step === "enterAmount") {
      initialContact ? close() : setStep("selectContact");
    }
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      if (!initialContact) {
        setStep("selectContact");
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
  };
}
