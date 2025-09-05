import {
  Anchor,
  Avatar,
  Badge,
  Button,
  Divider,
  Drawer,
  Group,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  Transaction,
  TransactionStatus,
} from "@/features/transactions/types/transaction";
import { Download02Icon, PrinterIcon } from "hugeicons-react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ContactModal from "@/features/contacts/components/ContactModal";
import { mockContacts } from "@/mockData/mockContacts";
import { Contact } from "@/features/contacts/types/contact";

interface TransactionDetailsDrawerProps {
  opened: boolean;
  close: () => void;
  transaction: Transaction | null;
}

export default function TransactionDetailsDrawer({
  opened,
  close,
  transaction,
}: TransactionDetailsDrawerProps) {
  const [
    contactModalOpened,
    { open: openContactModal, close: closeContactModal },
  ] = useDisclosure(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  if (!transaction) {
    return null;
  }

  const { amount, date, status, type, sender, receiver, avatar, bankAccount } =
    transaction;

  const handleViewProfile = (contactName: string) => {
    const contactDetails = mockContacts.find(
      (contact) => contact.full_name === contactName
    );
    if (contactDetails) {
      setSelectedContact(contactDetails);
      openContactModal();
    }
  };

  const renderParty = (partyName: string) => {
    const isContact =
      partyName !== "You" &&
      !["Business Savings", "Stripe", "Client Payment"].includes(partyName) &&
      mockContacts.some((contact) => contact.full_name === partyName);

    if (isContact) {
      return (
        <Anchor onClick={() => handleViewProfile(partyName)}>
          <Title order={4} c="lime.6">
            {partyName}
          </Title>
        </Anchor>
      );
    }
    return <Title order={4}>{partyName}</Title>;
  };

  const isCredit = type === "Received" || type === "Deposited";
  const formattedAmount = `${isCredit ? "+" : "-"} $${amount.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}`;
  const amountColor = isCredit ? "lime" : "inherit";
  const statusColors: Record<TransactionStatus, string> = {
    Completed: "lime",
    Pending: "yellow",
    Failed: "red",
  };
  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Transaction details"
        position="right"
        padding="md"
        size="md"
      >
        <Stack gap="lg">
          <Group grow>
            <Button
              aria-label="Print"
              size="md"
              variant="default"
              leftSection={<PrinterIcon size={16} />}
            >
              Print
            </Button>
            <Button
              aria-label="Print"
              size="md"
              variant="default"
              leftSection={<Download02Icon size={16} />}
            >
              Download
            </Button>
          </Group>

          <Stack align="center">
            <Avatar color="lime" size={80} radius="50%">
              <Title order={2}>{avatar}</Title>
            </Avatar>
            <Badge
              color={statusColors[status]}
              variant="light"
              size="xl"
              radius="xl"
            >
              {status}
            </Badge>
            <Stack align="center" gap={4}>
              <Title order={1} c={amountColor}>
                {formattedAmount}
              </Title>
            </Stack>
          </Stack>

          <Divider />

          <Stack>
            <Stack gap={0}>
              <Text c="dimmed">Date</Text>
              <Title order={4}>{formattedDate}</Title>
            </Stack>

            <Stack gap={0}>
              <Text c="dimmed">From</Text>
              {renderParty(sender)}
            </Stack>

            <Stack gap={0}>
              <Text c="dimmed">To</Text>
              {renderParty(receiver)}
            </Stack>

            <Stack gap={0}>
              <Text c="dimmed">Account</Text>
              <Title order={4}>{bankAccount}</Title>
            </Stack>

            <Stack gap={0}>
              <Text c="dimmed">Type</Text>
              <Title order={4}>{type}</Title>
            </Stack>

            <Stack gap={0}>
              <Text c="dimmed">Transaction ID</Text>
              <Title order={4}>{transaction.id}</Title>
            </Stack>
          </Stack>
          <Space h={100} />
        </Stack>
      </Drawer>
      <ContactModal
        opened={contactModalOpened}
        close={closeContactModal}
        contact={selectedContact}
        showButtons={false}
      />
    </>
  );
}
