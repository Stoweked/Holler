import {
  Button,
  Stack,
  Text,
  NumberInput,
  ActionIcon,
  Tooltip,
  Textarea,
} from "@mantine/core";
import classes from "./deposit/EnterAmount.module.css";
import { useEffect, useRef } from "react";
import { Alert02Icon, CancelCircleIcon } from "hugeicons-react";
import { useDisclosure } from "@mantine/hooks";
import ProfileModal from "../profile/ProfileModal";
import ContactDetailsCard from "../contacts/ContactDetailsCard";
import BankDetailsCard from "../banks/BankDetailsCard";
import { notifications } from "@mantine/notifications";
import { Recipient } from "@/types/recipient";

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
}: PaymentAmountStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [
    openedProfileModal,
    { open: openProfileModal, close: closeProfileModal },
  ] = useDisclosure(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const recipientLabel =
    actionType === "send" ? "Sending to" : "Requesting from";
  const bankLabel = actionType === "send" ? "Pay from" : "Deposit into";

  // A hardcoded value for demonstration purposes
  const availableBalance = 40000;

  // 2. Create a handler to contain the notification logic
  const handleContinue = () => {
    // 3. Add logic to check for insufficient funds
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

    // If the check passes, call the original onContinue function
    onContinue?.();
  };

  return (
    <>
      <Stack justify="space-between" gap={30} pt="lg">
        <Stack align="center" gap="xs">
          <NumberInput
            ref={inputRef}
            value={amount}
            onChange={setAmount}
            classNames={{ input: classes.amountInput }}
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
                    variant="transparent"
                    c="gray"
                    aria-label="Clear amount"
                  >
                    <CancelCircleIcon size={24} />
                  </ActionIcon>
                </Tooltip>
              ) : null
            }
          />
          <Text c="dimmed" size="md" ta="center">
            {/* Display the balance dynamically */}
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

          <Textarea
            placeholder="Add a note or description (optional)"
            value={note}
            onChange={(event) => setNote(event.currentTarget.value)}
            radius="lg"
            size="md"
            autosize
            minRows={2}
          />
          <Button
            size="xl"
            radius="xl"
            disabled={!amount || Number(amount) === 0}
            // 4. Update the button's onClick handler
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
