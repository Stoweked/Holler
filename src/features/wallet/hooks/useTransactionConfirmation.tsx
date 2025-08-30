// /src/features/transactions/hooks/useTransactionConfirmation.ts

import { notifications } from "@mantine/notifications";
import { CheckIcon } from "@mantine/core";
import { TransactionActionType, TransactionStep } from "./useTransactionState";
import { Recipient } from "@/features/contacts/types/recipient";
import { Waiver } from "@/features/waivers/types/waiver";

interface ConfirmationParams {
  transactionType: TransactionActionType;
  amount: string | number;
  note: string;
  selectedBank: Recipient | null;
  selectedContact: Recipient | null;
  selectedWaiver: Waiver | null;
  handleClose: () => void;
  setStep: (step: TransactionStep) => void;
}

export function useTransactionConfirmation() {
  const handleConfirm = async ({
    transactionType,
    amount,
    note,
    selectedBank,
    selectedContact,
    selectedWaiver,
    handleClose,
    setStep,
  }: ConfirmationParams) => {
    const transactionData = {
      amount,
      note,
      fromBank: selectedBank,
      toContact: selectedContact,
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

      // const successMessage =
      //   transactionType === "deposit"
      //     ? "Your deposit has been started."
      //     : transactionType === "send"
      //     ? "Your payment has been sent."
      //     : "Your payment has been requested.";

      // notifications.show({
      //   title: "Success",
      //   message: successMessage,
      //   color: "lime",
      //   icon: <CheckIcon size={16} />,
      //   autoClose: 6000,
      // });
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
