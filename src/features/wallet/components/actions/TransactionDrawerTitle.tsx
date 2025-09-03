// /src/features/transactions/components/TransactionDrawerTitle.tsx

import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { ArrowLeft02Icon } from "hugeicons-react";
import { TransactionActionType, TransactionStep } from "../../types/wallet";
import { Contact } from "@/features/contacts/types/contact";

interface TransactionDrawerTitleProps {
  step: TransactionStep;
  transactionType: TransactionActionType;
  initialContact: Contact | null;
  handleBack: () => void;
}

export default function TransactionDrawerTitle({
  step,
  transactionType,
  initialContact,
  handleBack,
}: TransactionDrawerTitleProps) {
  const getTitle = () => {
    switch (transactionType) {
      case "deposit":
        return {
          main: "Add money to Holler",
          review: "Review deposit",
          amount: "Enter amount",
          bank: "Select deposit account",
        };
      case "send":
        return {
          main: "Send payment",
          review: "Review send",
          amount: "Enter amount to send",
          bank: "Select payment account",
        };
      case "request":
        return {
          main: "Request payment",
          review: "Review request",
          amount: "Request amount",
          bank: "Select deposit account",
        };
      case "transfer":
        return {
          main: "Transfer to your bank",
          review: "Review transfer",
          amount: "Enter amount",
          bank: "Transfer to your bank",
        };
      default:
        return { main: "", review: "", amount: "", bank: "" };
    }
  };

  const {
    main: mainTitle,
    review: reviewTitle,
    amount: amountTitle,
    bank: bankTitle,
  } = getTitle();

  if (step === "selectContact") return <>{mainTitle}</>;
  if (step === "selectBank") return <>{bankTitle}</>;

  const backLabel =
    step === "confirm"
      ? "Back to payment"
      : initialContact
      ? "Close"
      : "Back to contacts";

  const title = step === "confirm" ? reviewTitle : amountTitle;

  return (
    <Group gap="xs">
      <Tooltip label={backLabel} position="right">
        <ActionIcon
          onClick={handleBack}
          variant={step === "confirm" ? "transparent" : "subtle"}
          c="gray"
          aria-label="Go back"
        >
          <ArrowLeft02Icon size={24} />
        </ActionIcon>
      </Tooltip>
      <Text>{title}</Text>
    </Group>
  );
}
