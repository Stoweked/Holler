import { useState } from "react";
import {
  ActionIcon,
  Drawer,
  Group,
  Skeleton,
  Text,
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
      "Where to deposit?"
    ) : (
      <Group justify="space-between" w="100%">
        <ActionIcon onClick={handleBack} variant="subtle" c="gray">
          <ArrowLeft01Icon size={20} />
        </ActionIcon>
        <Text size="sm" fw={500}>
          Step 1 of 4
        </Text>
      </Group>
    );

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title={drawerTitle}
      padding="lg"
      size="lg"
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
