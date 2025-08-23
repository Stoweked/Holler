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
import { ArrowLeft02Icon } from "hugeicons-react";
import EnterAmountStep from "../send/EnterAmountStep";
import { Recipient } from "../../contacts/types";

interface DepositDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function DepositDrawer({ opened, close }: DepositDrawerProps) {
  const [step, setStep] = useState("selectBank");
  const [selectedBank, setSelectedBank] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState<string | number>("");
  const [note, setNote] = useState("");

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
      setNote("");
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
            color="gray"
            radius="xl"
            aria-label="Back"
          >
            <ArrowLeft02Icon size={24} />
          </ActionIcon>
        </Tooltip>
        <Text>Deposit amount</Text>
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
          note={note}
          setNote={setNote}
        />
      )}
    </Drawer>
  );
}
