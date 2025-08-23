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
import { useEffect, useRef } from "react";
import { Recipient } from "../contacts/types";
import { CancelCircleIcon } from "hugeicons-react";
import { useDisclosure } from "@mantine/hooks";
import ProfileModal from "../profile/ProfileModal";
import ContactDetailsCard from "../contacts/ContactDetailsCard";
import BankDetailsCard from "../banks/BankDetailsCard";

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
            Available balance: $40,000.00
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
            onClick={onContinue}
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
