import { useState } from "react";
import { ActionIcon, Drawer, Group, Text, Tooltip } from "@mantine/core";
import { ArrowLeft02Icon } from "hugeicons-react";
import { Contact, Recipient } from "@/components/contacts/types";
import SelectContactStep from "../SelectContactStep";
import EnterAmountStep from "../EnterAmountStep";
import ConfirmationStep from "../ConfirmationStep";

// 1. Define a type for the steps for type-safety and autocompletion
type RequestStep = "selectContact" | "enterAmount" | "confirm";

interface RequestDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function RequestDrawer({ opened, close }: RequestDrawerProps) {
  // 2. Use the RequestStep type for state
  const [step, setStep] = useState<RequestStep>("selectContact");
  const [selectedContact, setSelectedContact] = useState<Recipient | null>(
    null
  );
  const [amount, setAmount] = useState<string | number>("");
  const [note, setNote] = useState("");

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setStep("enterAmount");
  };

  const handleAmountContinue = () => {
    setStep("confirm"); // Go to the final step
  };

  const handleBack = () => {
    if (step === "enterAmount") {
      setStep("selectContact");
    } else if (step === "confirm") {
      setStep("enterAmount");
    }
  };

  const handleConfirmRequest = () => {
    console.log(`Requesting ${amount} from ${selectedContact?.name}`);
    handleClose();
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setStep("selectContact");
      setSelectedContact(null);
      setAmount("");
      setNote("");
    }, 200);
  };

  const drawerTitle =
    step === "selectContact" ? (
      "Request payment"
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
        <Text>Review request</Text>
      </Group>
    ) : (
      <Group gap="xs">
        <Tooltip label="Back to contacts" position="right">
          <ActionIcon
            onClick={handleBack}
            variant="transparent"
            color="gray"
            aria-label="Go back"
          >
            <ArrowLeft02Icon size={24} />
          </ActionIcon>
        </Tooltip>
        <Text>Request amount</Text>
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
      {step === "selectContact" && (
        <SelectContactStep onSelectContact={handleSelectContact} />
      )}
      {step === "enterAmount" && selectedContact && (
        <EnterAmountStep
          contact={selectedContact}
          amount={amount}
          setAmount={setAmount}
          note={note}
          setNote={setNote}
          onContinue={handleAmountContinue}
          onEdit={handleBack}
        />
      )}
      {step === "confirm" && selectedContact && (
        <ConfirmationStep
          contact={selectedContact}
          amount={amount}
          note={note}
          onConfirm={handleConfirmRequest}
          actionType="request"
        />
      )}
    </Drawer>
  );
}
