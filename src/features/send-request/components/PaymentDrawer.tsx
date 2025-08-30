import {
  ActionIcon,
  CheckIcon,
  Drawer,
  Group,
  Space,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ArrowLeft02Icon } from "hugeicons-react";
import ConfirmationStep from "./ConfirmationStep";
import SelectContactStep from "./SelectContactStep";
import PaymentAmountStep from "./PaymentAmountStep";
import { notifications } from "@mantine/notifications";
import { Recipient } from "@/features/contacts/types/recipient";
import SelectBankStep from "@/features/deposit/components/SelectBankStep";
import ConnectBankDrawer from "@/features/banks/components/ConnectBankDrawer";
import { usePaymentState, PaymentStep } from "../hooks/usePaymentState";

interface PaymentDrawerProps {
  opened: boolean;
  close: () => void;
  actionType: "send" | "request";
  initialContact?: Recipient | null;
}

const PaymentDrawerTitle = ({
  step,
  isSend,
  initialContact,
  handleBack,
}: {
  step: PaymentStep;
  isSend: boolean;
  initialContact: Recipient | null;
  handleBack: () => void;
}) => {
  const mainTitle = isSend ? "Send payment" : "Request payment";
  const reviewTitle = isSend ? "Review send" : "Review request";
  const amountTitle = isSend ? "Enter amount to send" : "Request amount";
  const bankTitle = isSend
    ? "Select payment account"
    : "Select deposit account";

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
};

export default function PaymentDrawer({
  opened,
  close,
  actionType,
  initialContact = null,
}: PaymentDrawerProps) {
  const {
    step,
    selectedContact,
    selectedBank,
    selectedWaiver,
    amount,
    note,
    setAmount,
    setNote,
    setSelectedWaiver,
    handleSelectContact,
    handleAmountContinue,
    handleEditBank,
    handleSelectBank,
    handleBack,
    handleClose,
  } = usePaymentState(opened, initialContact, close);

  const [
    openedConnectBankDrawer,
    { open: openConnectBankDrawer, close: closeConnectBankDrawer },
  ] = useDisclosure(false);

  const isSend = actionType === "send";

  const handleConfirm = () => {
    const logMessage = isSend
      ? `Sending ${amount} from ${selectedBank.name} to ${selectedContact?.name}`
      : `Requesting ${amount} from ${selectedContact?.name} into ${selectedBank.name}`;
    console.log(logMessage);
    handleClose();

    const successMessage = isSend
      ? "Your payment has been sent."
      : "Your payment has been requested.";

    notifications.show({
      title: "Success",
      message: successMessage,
      color: "lime",
      icon: <CheckIcon size={16} />,
      autoClose: 6000,
    });
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={handleClose}
        title={
          <PaymentDrawerTitle
            step={step}
            isSend={isSend}
            initialContact={initialContact}
            handleBack={handleBack}
          />
        }
        padding="md"
        size="md"
      >
        {step === "selectContact" && (
          <SelectContactStep onSelectContact={handleSelectContact} />
        )}
        {step === "selectBank" && (
          <SelectBankStep
            onSelectBank={handleSelectBank}
            onConnectNew={openConnectBankDrawer}
          />
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
            selectedWaiver={selectedWaiver}
            setSelectedWaiver={setSelectedWaiver}
            isSend={isSend}
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
            waiver={selectedWaiver}
          />
        )}
        <Space h={100} />
      </Drawer>
      <ConnectBankDrawer
        opened={openedConnectBankDrawer}
        close={closeConnectBankDrawer}
      />
    </>
  );
}
