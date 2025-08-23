import { useState } from "react";
import {
  ActionIcon,
  Drawer,
  Group,
  Skeleton,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { ArrowLeft01Icon } from "hugeicons-react";
import EnterAmountStep from "../send/EnterAmountStep";
import { Recipient } from "../contacts/types";

interface DepositDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function DepositDrawer({ opened, close }: DepositDrawerProps) {
  const [step, setStep] = useState("selectBank");
  const [selectedBank, setSelectedBank] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState<string | number>("");

  const handleSelectBank = (bank: Recipient) => {
    setSelectedBank(bank);
    setStep("enterAmount");
  };

  const handleBack = () => {
    setStep("selectBank");
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setStep("selectBank");
      setSelectedBank(null);
      setAmount("");
    }, 200);
  };

  // Custom title based on the design
  const drawerTitle =
    step === "selectBank" ? (
      "Deposit to bank"
    ) : (
      <Group justify="space-between" w="100%">
        <Tooltip label="Back to banks" position="right">
          <ActionIcon
            onClick={handleBack}
            variant="subtle"
            c="gray"
            radius="xl"
            aria-label="Back"
          >
            <ArrowLeft01Icon size={20} />
          </ActionIcon>
        </Tooltip>
        <Text size="sm" fw={500}>
          Deposit amount
        </Text>
      </Group>
    );

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title={drawerTitle}
      padding="lg"
      size="md"
    >
      {step === "selectBank" && (
        <>
          {[...Array(5)].map((_, i) => (
            <UnstyledButton
              key={i}
              style={{ width: "100%" }}
              onClick={() =>
                handleSelectBank({
                  name: "Mock Bank",
                  avatar: "",
                  details: "**** 1234",
                })
              }
            >
              <Skeleton key={i} height={80} radius="lg" mb="md" />
            </UnstyledButton>
          ))}
        </>
      )}
      {step === "enterAmount" && selectedBank && (
        <EnterAmountStep
          contact={selectedBank}
          amount={amount}
          setAmount={setAmount}
        />
      )}
    </Drawer>
  );
}
