import {
  Avatar,
  Badge,
  Button,
  Card,
  Drawer,
  Group,
  Space,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  Transaction,
  TransactionStatus,
} from "@/features/transactions/types/transaction";
import {
  ArrowRight02Icon,
  BankIcon,
  Download02Icon,
  PrinterIcon,
} from "hugeicons-react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ContactModal from "@/features/contacts/components/ContactModal";
import { Contact } from "@/features/contacts/types/contact";
import { getInitials } from "@/lib/hooks/getInitials";
import { useProfile } from "@/contexts/ProfileContext";
import ContactDetailsCard from "@/features/contacts/components/ContactDetailsCard";
import BankDetailsCard from "@/features/banks/components/BankDetailsCard";
import TransactionTimeline from "./TransactionTimeline";
import { TransactionParty } from "../types/transactionParty";

// Helper component to render the correct avatar for each party
const TransactionPartyAvatar = ({ party }: { party: TransactionParty }) => {
  const { profile } = useProfile();

  switch (party.type) {
    case "self":
      return (
        <Avatar
          src={profile?.avatar_url}
          variant="default"
          size={80}
          radius="50%"
        >
          {getInitials(profile?.full_name)}
        </Avatar>
      );
    case "contact":
      return (
        <Avatar
          src={party.data.avatar_url}
          variant="default"
          size={80}
          radius="50%"
        >
          {getInitials(party.data.full_name)}
        </Avatar>
      );
    case "bank":
      return (
        <ThemeIcon size={80} radius="50%" variant="default">
          <BankIcon size={40} />
        </ThemeIcon>
      );
    default:
      return <Avatar color="gray" size={80} radius="50%" variant="default" />;
  }
};

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
  const { profile } = useProfile();

  if (!transaction) {
    return null;
  }

  const { amount, date, status, type, from, to, bankAccount } = transaction;

  const handleViewProfile = (contact: Contact) => {
    setSelectedContact(contact);
    openContactModal();
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

  const renderPartyDetails = (
    party: TransactionParty,
    label: "From" | "To"
  ) => {
    switch (party.type) {
      case "contact":
        return (
          <ContactDetailsCard
            contact={party.data}
            label={label}
            onViewProfile={() => handleViewProfile(party.data)}
          />
        );
      case "bank":
        return <BankDetailsCard bank={party.data} label={label} />;
      case "self":
        if (profile) {
          const selfAsContact: Contact = {
            id: profile.id,
            full_name: profile.full_name || "You",
            email: profile.email,
            avatar_url: profile.avatar_url,
            type: "profile",
          };
          return <ContactDetailsCard contact={selfAsContact} label={label} />;
        }
        // Fallback while profile is loading
        return (
          <Stack gap={0}>
            <Text c="dimmed">{label}</Text>
            <Title order={4}>{party.name}</Title>
          </Stack>
        );
      case "external":
        return (
          <Stack gap={0}>
            <Text c="dimmed">{label}</Text>
            <Title order={4}>{party.name}</Title>
          </Stack>
        );
      default:
        return null;
    }
  };

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
              aria-label="Download"
              size="md"
              variant="default"
              leftSection={<Download02Icon size={16} />}
            >
              Download
            </Button>
          </Group>

          <Stack align="center" py="md">
            <Group align="center" justify="center" wrap="nowrap">
              <TransactionPartyAvatar party={from} />
              <ArrowRight02Icon size={32} color="var(--mantine-color-gray-6)" />
              <TransactionPartyAvatar party={to} />
            </Group>

            <Stack gap={0} ta="center">
              <Text c="dimmed" ta="center">
                {formattedDate}
              </Text>

              <Title order={1} c={amountColor} ta="center">
                {formattedAmount}
              </Title>
            </Stack>
            <Badge
              color={statusColors[status]}
              variant="dot"
              size="xl"
              radius="xl"
            >
              {status}
            </Badge>
          </Stack>

          <Stack>
            {renderPartyDetails(from, "From")}
            {renderPartyDetails(to, "To")}

            <Card withBorder radius="lg" p="lg">
              <Stack>
                <Stack gap={0}>
                  <Text c="dimmed">Account</Text>
                  <Title order={5}>{bankAccount}</Title>
                </Stack>

                <Stack gap={0}>
                  <Text c="dimmed">Type</Text>
                  <Title order={5}>{type}</Title>
                </Stack>

                <Stack gap={0}>
                  <Text c="dimmed">Transaction ID</Text>
                  <Title order={5}>{transaction.id}</Title>
                </Stack>
              </Stack>
            </Card>
          </Stack>

          <TransactionTimeline />

          <Space h={100} />
        </Stack>
      </Drawer>
      <ContactModal
        opened={contactModalOpened}
        close={closeContactModal}
        contact={selectedContact}
        showButtons={true}
      />
    </>
  );
}
