// /src/features/send-request/components/ConfirmationStep.tsx

import { Contact, Recipient } from "@/features/contacts/types/recipient";
import { Waiver } from "@/features/waivers/types/waiver";
import {
  Avatar,
  Button,
  Group,
  Stack,
  Text,
  Title,
  Anchor,
  Card,
  Divider,
  Alert,
  ThemeIcon,
  Modal,
  UnstyledButton,
  Tooltip,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BankIcon, File01Icon } from "hugeicons-react";
import classes from "./Actions.module.css";
import { useWallet } from "@/contexts/WalletContext";
import { TransactionActionType } from "../../types/wallet";

interface ConfirmationStepProps {
  contact: Contact;
  bank: Recipient;
  amount: string | number;
  note?: string;
  onConfirm: () => void;
  actionType?: TransactionActionType;
  waiver: Waiver | null;
}

export default function ConfirmationStep({
  contact,
  bank,
  amount,
  note,
  onConfirm,
  actionType = "send",
  waiver,
}: ConfirmationStepProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const { balance } = useWallet();
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;
  const formattedAmount = (numericAmount || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const getActionLabels = () => {
    switch (actionType) {
      case "send":
        return { to: "Send to", from: "Pay from", button: "Send" };
      case "request":
        return { to: "Request from", from: "Deposit into", button: "Request" };
      case "deposit":
        return { to: "Deposit to", from: "Withdraw from", button: "Deposit" };
      case "transfer":
        return {
          to: "Transfer to",
          from: "Transfer from",
          button: "Transfer",
        };
      default:
        return { to: "", from: "", button: "" };
    }
  };

  const { to, from, button } = getActionLabels();

  const isTransfer = actionType === "transfer";
  const isDeposit = actionType === "deposit";

  const toParty = isTransfer ? bank : contact;
  const fromParty = isTransfer
    ? {
        name: "Holler wallet",
        details: balance.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
      }
    : bank;

  return (
    <>
      <Stack justify="space-between" gap="lg">
        <Card withBorder p="lg" radius="lg" w="100%">
          <Stack>
            {/* "To" Section */}
            <Group gap="xs" wrap="nowrap" justify="space-between">
              <Stack gap={0} miw={1} style={{ flex: 1 }}>
                <Text c="dimmed">{to}</Text>
                <Title order={4} lineClamp={3} lh={1.2}>
                  {toParty.name}
                </Title>
                <Text
                  size="xs"
                  c="dimmed"
                  lineClamp={1}
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {toParty.details}
                </Text>
              </Stack>
              {isDeposit ? (
                <ThemeIcon variant="default" radius="xl" size={44}>
                  <Image
                    aria-label="Holler logo"
                    w={20}
                    h="auto"
                    src="/images/logomark.svg"
                  />
                </ThemeIcon>
              ) : isTransfer ? (
                <ThemeIcon variant="default" radius="xl" size={44}>
                  <BankIcon size={24} />
                </ThemeIcon>
              ) : (
                <Avatar
                  src={null}
                  alt={contact.name}
                  variant="light"
                  color="lime"
                  size={44}
                >
                  {contact.avatar}
                </Avatar>
              )}
            </Group>

            <Divider />

            {/* "From" Section */}
            <Group gap="xs" wrap="nowrap" justify="space-between">
              <Stack gap={0} miw={1} style={{ flex: 1 }}>
                <Text c="dimmed">{from}</Text>
                <Title order={4} lineClamp={3} lh={1.2}>
                  {fromParty.name}
                </Title>
                <Text
                  size="xs"
                  c="dimmed"
                  lineClamp={1}
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {fromParty.details}
                </Text>
              </Stack>
              {isTransfer ? (
                <ThemeIcon variant="default" radius="xl" size={44}>
                  <Image
                    aria-label="Holler logo"
                    w={20}
                    h="auto"
                    src="/images/logomark.svg"
                  />
                </ThemeIcon>
              ) : (
                <ThemeIcon variant="default" radius="xl" size={44}>
                  <BankIcon size={24} />
                </ThemeIcon>
              )}
            </Group>

            {note && (
              <>
                <Divider />
                <Stack gap={0}>
                  <Text c="dimmed">Notes</Text>
                  <Text size="lg">{note}</Text>
                </Stack>
              </>
            )}

            <Divider />

            <Stack gap={0}>
              <Text c="dimmed">Amount</Text>
              <Title order={4}>{formattedAmount}</Title>
            </Stack>

            {actionType === "send" && waiver && (
              <Alert title="" color="orange" variant="light" radius="lg">
                <Stack>
                  <Stack gap={8}>
                    <Title order={5} c="orange" lh={1.2}>
                      Pending lien waiver
                    </Title>
                    <Text size="sm">
                      Funds will be held until the attached lien waiver is
                      reviewed and accepted by the recipient.
                    </Text>
                  </Stack>
                  <Tooltip label="View lien waiver">
                    <UnstyledButton
                      aria-label="View lien waiver"
                      className={classes.waiverButton}
                      onClick={open}
                    >
                      <Group wrap="nowrap" gap={8}>
                        <File01Icon size={18} style={{ flexShrink: 0 }} />
                        <Title order={6} lh={1.2}>
                          {waiver.title}
                        </Title>
                      </Group>
                    </UnstyledButton>
                  </Tooltip>
                </Stack>
              </Alert>
            )}
          </Stack>
        </Card>

        <Stack gap="lg">
          <Button size="xl" radius="xl" onClick={onConfirm}>
            {`${button} ${formattedAmount}`}
          </Button>
          <Stack gap="xs">
            <Text c="dimmed" size="sm" ta="center">
              Transactions typically take 1-3 business days to process.
            </Text>
            <Group justify="center">
              <Anchor ta="center" size="xs">
                Terms of Service
              </Anchor>
              <Anchor ta="center" size="xs">
                Privacy Policy
              </Anchor>
            </Group>
          </Stack>
        </Stack>
      </Stack>

      {waiver && (
        <Modal
          opened={opened}
          onClose={close}
          title="Attached lien waiver"
          centered
        >
          <div dangerouslySetInnerHTML={{ __html: waiver.content }} />
        </Modal>
      )}
    </>
  );
}
