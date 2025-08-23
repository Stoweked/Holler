import { useState } from "react";
import { ActionIcon, Drawer, Group, Text, Tooltip } from "@mantine/core";
import { ArrowLeft02Icon } from "hugeicons-react";
import { Recipient } from "@/components/contacts/types";
import EnterAmountStep from "./EnterAmountStep";
import ConfirmationStep from "./ConfirmationStep";
import SelectBankStep from "./SelectBankStep";

type DepositStep = "selectBank" | "enterAmount" | "confirm";

interface DepositDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function DepositDrawer({ opened, close }: DepositDrawerProps) {
  const [step, setStep] = useState<DepositStep>("selectBank");
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

  const handleConfirmDeposit = () => {
    console.log(`Depositing ${amount} to ${selectedBank?.name}`);
    handleClose();
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
      "Deposit to bank"
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
        <Text>Review deposit</Text>
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
        <Text>Enter amount to deposit</Text>
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
          contact={selectedBank}
          amount={amount}
          setAmount={setAmount}
          note={note}
          setNote={setNote}
          onContinue={handleAmountContinue}
          recipientType="bank"
          onEdit={handleBack}
        />
      )}
      {step === "confirm" && selectedBank && (
        <ConfirmationStep
          bank={selectedBank}
          amount={amount}
          note={note}
          onConfirm={handleConfirmDeposit}
        />
      )}
    </Drawer>
  );
}
