// stoweked/holler/Holler-main/src/components/primaryActions/send/SendDrawer.tsx
import { useState, useEffect } from "react";
import { ActionIcon, Drawer, Group, Text, Tooltip } from "@mantine/core";
import { ArrowLeft02Icon } from "hugeicons-react";
import { Contact, Recipient } from "@/components/contacts/types";
import ConfirmationStep from "../ConfirmationStep";
import SelectContactStep from "../SelectContactStep";
import EnterAmountStep from "../EnterAmountStep";

type SendStep = "selectContact" | "enterAmount" | "confirm";

interface SendDrawerProps {
  opened: boolean;
  close: () => void;
  contact?: Contact | null;
}

export default function SendDrawer({
  opened,
  close,
  contact,
}: SendDrawerProps) {
  const [step, setStep] = useState<SendStep>("selectContact");
  const [selectedContact, setSelectedContact] = useState<Recipient | null>(
    null
  );
  const [amount, setAmount] = useState<string | number>("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (contact && opened) {
      setSelectedContact(contact);
      setStep("enterAmount");
    } else {
      setStep("selectContact");
    }
  }, [contact, opened]);

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setStep("enterAmount");
  };

  const handleAmountContinue = () => {
    setStep("confirm");
  };

  const handleBack = () => {
    if (step === "enterAmount") {
      if (contact) {
        close();
      } else {
        setStep("selectContact");
      }
    } else if (step === "confirm") {
      setStep("enterAmount");
    }
  };

  const handleConfirmSend = () => {
    console.log(`Sending ${amount} to ${selectedContact?.name}`);
    handleClose();
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      if (!contact) {
        setStep("selectContact");
        setSelectedContact(null);
      }
      setAmount("");
      setNote("");
    }, 200);
  };

  const drawerTitle =
    step === "selectContact" ? (
      "Send payment"
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
        <Text>Review send</Text>
      </Group>
    ) : (
      <Group gap="xs">
        <Tooltip
          label={contact ? "Close" : "Back to contacts"}
          position="right"
        >
          <ActionIcon
            onClick={handleBack}
            variant="subtle"
            color="gray"
            aria-label="Go back"
          >
            <ArrowLeft02Icon size={24} />
          </ActionIcon>
        </Tooltip>
        <Text>Enter amount to send</Text>
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
          onConfirm={handleConfirmSend}
          actionType="send"
        />
      )}
    </Drawer>
  );
}
