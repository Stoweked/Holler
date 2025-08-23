import { useState, useEffect } from "react";
import { ActionIcon, Drawer, Group, Text, Tooltip } from "@mantine/core";
import { ArrowLeft02Icon } from "hugeicons-react";
import { Contact, Recipient } from "@/components/contacts/types";
import ConfirmationStep from "./ConfirmationStep";
import SelectContactStep from "./SelectContactStep";
import { mockBanks } from "@/components/mockData/mockBanks";
import SelectBankStep from "./deposit/SelectBankStep";
import PaymentAmountStep from "./PaymentAmountStep";

type PaymentStep = "selectContact" | "enterAmount" | "confirm" | "selectBank";

interface PaymentDrawerProps {
  opened: boolean;
  close: () => void;
  contact?: Contact | null;
  actionType: "send" | "request";
}

export default function PaymentDrawer({
  opened,
  close,
  contact,
  actionType,
}: PaymentDrawerProps) {
  const [step, setStep] = useState<PaymentStep>("selectContact");
  const [selectedContact, setSelectedContact] = useState<Recipient | null>(
    null
  );
  const [selectedBank, setSelectedBank] = useState<Recipient>(mockBanks[0]);
  const [amount, setAmount] = useState<string | number>("");
  const [note, setNote] = useState("");

  const isSend = actionType === "send";

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

  const handleAmountContinue = () => setStep("confirm");
  const handleEditBank = () => setStep("selectBank");
  const handleSelectBank = (bank: Recipient) => {
    setSelectedBank(bank);
    setStep("enterAmount");
  };

  const handleBack = () => {
    if (step === "selectBank" || step === "confirm") {
      setStep("enterAmount");
    } else if (step === "enterAmount") {
      contact ? close() : setStep("selectContact");
    }
  };

  const handleConfirm = () => {
    const logMessage = isSend
      ? `Sending ${amount} from ${selectedBank.name} to ${selectedContact?.name}`
      : `Requesting ${amount} from ${selectedContact?.name} into ${selectedBank.name}`;
    console.log(logMessage);
    handleClose();
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      if (!contact) {
        setStep("selectContact");
        setSelectedContact(null);
      }
      setSelectedBank(mockBanks[0]);
      setAmount("");
      setNote("");
    }, 200);
  };

  // Dynamic titles based on actionType
  const mainTitle = isSend ? "Send payment" : "Request payment";
  const reviewTitle = isSend ? "Review send" : "Review request";
  const amountTitle = isSend ? "Enter amount to send" : "Request amount";
  const bankTitle = isSend
    ? "Select payment account"
    : "Select deposit account";

  const drawerTitle =
    step === "selectContact" ? (
      mainTitle
    ) : step === "selectBank" ? (
      bankTitle
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
        <Text>{reviewTitle}</Text>
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
        <Text>{amountTitle}</Text>
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
      {step === "selectBank" && (
        <SelectBankStep onSelectBank={handleSelectBank} />
      )}
      {step === "enterAmount" && selectedContact && (
        <PaymentAmountStep
          contact={selectedContact}
          bank={selectedBank}
          amount={amount}
          setAmount={setAmount}
          note={note}
          setNote={setNote}
          onContinue={handleAmountContinue}
          onEditContact={handleBack}
          onEditBank={handleEditBank}
          actionType={actionType}
        />
      )}
      {step === "confirm" && selectedContact && (
        <ConfirmationStep
          contact={selectedContact}
          bank={selectedBank}
          amount={amount}
          note={note}
          onConfirm={handleConfirm}
          actionType={actionType}
        />
      )}
    </Drawer>
  );
}
