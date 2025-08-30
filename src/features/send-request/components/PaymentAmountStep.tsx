import {
  Button,
  Stack,
  Text,
  NumberInput,
  ActionIcon,
  Tooltip,
  Textarea,
} from "@mantine/core";
import classes from "./EnterAmount.module.css";
import { useEffect, useRef, useState } from "react";
import { Alert02Icon, Cancel01Icon } from "hugeicons-react";
import { useDisclosure } from "@mantine/hooks";
import ProfileModal from "../../profile/components/ProfileModal";
import { notifications } from "@mantine/notifications";
import { Recipient } from "@/features/contacts/types/recipient";
import ContactDetailsCard from "@/features/contacts/components/ContactDetailsCard";
import BankDetailsCard from "@/features/banks/components/BankDetailsCard";
import { Waiver } from "@/features/waivers/types/waiver";
import LienWaiverDetailsCard from "./LienWaiverDetailsCard";

interface PaymentAmountStepProps {
  contact: Recipient;
  bank: Recipient;
  amount: string | number;
  setAmount: (value: string | number) => void;
  note: string;
  setNote: (value: string) => void;
  onContinue?: () => void;
  onEditContact?: () => void;
  onEditBank?: () => void;
  actionType: "send" | "request";
  selectedWaiver: Waiver | null;
  setSelectedWaiver: (waiver: Waiver | null) => void;
  isSend: boolean;
}

export default function PaymentAmountStep({
  contact,
  bank,
  amount,
  setAmount,
  note,
  setNote,
  onContinue,
  onEditContact,
  onEditBank,
  actionType,
  selectedWaiver,
  setSelectedWaiver,
  isSend,
}: PaymentAmountStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [
    openedProfileModal,
    { open: openProfileModal, close: closeProfileModal },
  ] = useDisclosure(false);
  const [fontSize, setFontSize] = useState("3.5rem");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const valueString = String(amount);
    const length = valueString.replace(/[^0-9]/g, "").length;
    if (length > 9) {
      setFontSize("2rem");
    } else if (length > 6) {
      setFontSize("2.5rem");
    } else {
      setFontSize("3.5rem");
    }
  }, [amount]);

  const recipientLabel =
    actionType === "send" ? "Sending to" : "Requesting from";
  const bankLabel = actionType === "send" ? "Pay from" : "Deposit into";

  const availableBalance = 40000;

  const handleContinue = () => {
    if (actionType === "send" && Number(amount) > availableBalance) {
      notifications.show({
        title: "Insufficient funds",
        message: "The amount you entered exceeds your available balance.",
        color: "red",
        icon: <Alert02Icon size={18} />,
        autoClose: 5000,
      });
      return;
    }

    onContinue?.();
  };

  return (
    <>
      <Stack justify="space-between" gap={30} pt="lg">
        <Stack align="center" gap="xs">
          <NumberInput
            w="100%"
            ref={inputRef}
            value={amount}
            onChange={setAmount}
            classNames={{ input: classes.amountInput }}
            styles={{ input: { fontSize } }}
            variant="unstyled"
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator
            prefix="$"
            hideControls
            type="tel"
            placeholder="$0.00"
            rightSection={
              amount ? (
                <Tooltip label="Clear amount" position="left">
                  <ActionIcon
                    onClick={() => setAmount("")}
                    variant="default"
                    c="gray"
                    aria-label="Clear amount"
                  >
                    <Cancel01Icon size={20} />
                  </ActionIcon>
                </Tooltip>
              ) : null
            }
          />
          <Text c="dimmed" size="md" ta="center">
            Available balance: $
            {availableBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </Stack>

        <Stack>
          <ContactDetailsCard
            contact={contact}
            label={recipientLabel}
            onEdit={onEditContact}
            onViewProfile={openProfileModal}
          />
          <BankDetailsCard bank={bank} label={bankLabel} onEdit={onEditBank} />

          {isSend && (
            <LienWaiverDetailsCard
              selectedWaiver={selectedWaiver}
              setSelectedWaiver={setSelectedWaiver}
            />
          )}

          <Textarea
            placeholder="Add a note or description"
            value={note}
            onChange={(event) => setNote(event.currentTarget.value)}
            radius="md"
            size="md"
            autosize
            minRows={3}
          />
          <Button
            size="xl"
            radius="xl"
            disabled={!amount || Number(amount) === 0}
            onClick={handleContinue}
          >
            Continue to review
          </Button>
          <Text c="dimmed" size="sm" ta="center">
            All transactions are secure, encrypted, and private.
          </Text>
        </Stack>
      </Stack>

      <ProfileModal
        opened={openedProfileModal}
        close={closeProfileModal}
        contact={contact}
        showButtons={false}
      />
    </>
  );
}
