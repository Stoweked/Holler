import { useState } from "react";
import {
  ActionIcon,
  CheckIcon,
  Drawer,
  Group,
  Space,
  Text,
  Tooltip,
} from "@mantine/core";
import { ArrowLeft02Icon } from "hugeicons-react";
import EnterAmountStep from "./EnterAmountStep";
import ConfirmationStep from "./ConfirmationStep";
import SelectBankStep from "./SelectBankStep";
import { Recipient } from "@/features/contacts/types/recipient";
import { notifications } from "@mantine/notifications";

type TransferStep = "selectBank" | "enterAmount" | "confirm";

interface TransferDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function TransferDrawer({ opened, close }: TransferDrawerProps) {
  const [step, setStep] = useState<TransferStep>("selectBank");
  const [selectedBank, setSelectedBank] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState<string | number>("");
  const [note, setNote] = useState("");

  const handleSelectBank = (bank: Recipient) => {
    setSelectedBank(bank);
    setStep("enterAmount");
  };

  const handleAmountContinue = () => {
    setStep("confirm");
  };

  const handleBack = () => {
    if (step === "enterAmount") {
      setStep("selectBank");
    } else if (step === "confirm") {
      setStep("enterAmount");
    }
  };

  const handleConfirmTransfer = () => {
    console.log(`Transferring ${amount} to ${selectedBank?.name}`);
    handleClose();
    notifications.show({
      title: "Success",
      message: "Your transfer has been initiated.",
      color: "lime",
      icon: <CheckIcon size={16} />,
      autoClose: 6000,
    });
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setStep("selectBank");
      setSelectedBank(null);
      setAmount("");
      setNote("");
    }, 200);
  };

  const drawerTitle =
    step === "selectBank" ? (
      "Transfer to your bank"
    ) : step === "confirm" ? (
      <Group gap="xs">
        <Tooltip label="Back to amount" position="right">
          <ActionIcon
            onClick={handleBack}
            variant="transparent"
            c="gray"
            aria-label="Go back"
          >
            <ArrowLeft02Icon size={24} />
          </ActionIcon>
        </Tooltip>
        <Text>Review transfer</Text>
      </Group>
    ) : (
      <Group gap="xs">
        <Tooltip label="Back to banks" position="right">
          <ActionIcon
            onClick={handleBack}
            variant="subtle"
            color="gray"
            aria-label="Go back"
          >
            <ArrowLeft02Icon size={24} />
          </ActionIcon>
        </Tooltip>
        <Text>Enter amount</Text>
      </Group>
    );

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title={drawerTitle}
      padding="md"
      size="md"
    >
      {step === "selectBank" && (
        <SelectBankStep onSelectBank={handleSelectBank} />
      )}
      {step === "enterAmount" && selectedBank && (
        <EnterAmountStep
          bank={selectedBank}
          amount={amount}
          setAmount={setAmount}
          note={note}
          setNote={setNote}
          onContinue={handleAmountContinue}
          onEditBank={handleBack}
        />
      )}
      {step === "confirm" && selectedBank && (
        <ConfirmationStep
          bank={selectedBank}
          amount={amount}
          note={note}
          onConfirm={handleConfirmTransfer}
        />
      )}
      <Space h={100} />
    </Drawer>
  );
}
