// src/features/wallet/hooks/useTransactionConfirmation.tsx
import { notifications } from "@mantine/notifications";
import { Waiver } from "@/features/waivers/types/waiver";
import { TransactionActionType, TransactionStep } from "../types/wallet";
import { Bank } from "@/features/banks/types/bank";
import { TransactionParty } from "@/features/transactions/types/transactionParty";

export interface ConfirmationParams {
  transactionType: TransactionActionType;
  party: TransactionParty | null;
  bank: Bank;
  amount: string | number;
  note: string;
  selectedWaiver: Waiver | null;
  handleClose: () => void;
  setStep: (step: TransactionStep) => void;
  setTransactionId: (id: string) => void;
}

export function useTransactionConfirmation() {
  const handleConfirm = async ({
    transactionType,
    amount,
    note,
    bank,
    party,
    selectedWaiver,
    handleClose,
    setStep,
    setTransactionId,
  }: ConfirmationParams) => {
    const transactionData = {
      amount,
      note,
      fromBank: bank,
      toParty: party,
      waiver: selectedWaiver,
    };

    let endpoint = "";
    let payload = {};

    switch (transactionType) {
      case "deposit":
        endpoint = "/api/deposit";
        payload = { ...transactionData };
        break;
      case "send":
        endpoint = "/api/send";
        payload = { ...transactionData };
        break;
      case "request":
        endpoint = "/api/request";
        payload = { ...transactionData };
        break;
      case "transfer":
        endpoint = "/api/transfer";
        payload = { ...transactionData };
        break;
    }

    try {
      console.log(`Simulating API call to ${endpoint} with payload:`, payload);

      const mockTransactionId = "1";
      setTransactionId(mockTransactionId);
      setStep("success");
    } catch (error) {
      console.error("Transaction failed:", error);
      notifications.show({
        title: "Error",
        message: "Your transaction failed. Please try again.",
        color: "red",
      });
      // Only close the drawer on error
      handleClose();
    }
  };

  return { handleConfirm };
}
