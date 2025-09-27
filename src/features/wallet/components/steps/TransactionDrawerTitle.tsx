import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { ArrowLeft02Icon } from "hugeicons-react";
import { TransactionActionType, TransactionStep } from "../../types/wallet";
import { TransactionParty } from "@/features/transactions/types/transactionParty";

interface TransactionDrawerTitleProps {
  step: TransactionStep;
  transactionType: TransactionActionType | null;
  preselectedParty?: TransactionParty | null;
  handleBack: () => void;
}

export default function TransactionDrawerTitle({
  step,
  transactionType,
  preselectedParty,
  handleBack,
}: TransactionDrawerTitleProps) {
  const getTitle = () => {
    switch (transactionType) {
      case "deposit":
        return {
          main: "Add money to Holler",
          review: "Review deposit",
          amount: "Deposit amount",
          bank: "Select deposit account",
        };
      case "send":
        return {
          main: "Send payment",
          review: "Review send",
          amount: "Amount to send",
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
          amount: "Tansfer amount",
          bank: "Transfer to your bank",
        };
      default:
        return { main: "Transaction", review: "", amount: "", bank: "" };
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
      : preselectedParty
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
