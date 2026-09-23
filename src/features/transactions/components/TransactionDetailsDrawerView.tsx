import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Drawer,
  Group,
  HoverCard,
  Space,
  Stack,
  Text,
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
  InformationCircleIcon,
  PrinterIcon,
} from "hugeicons-react";
import type { ReactNode } from "react";
import { Contact, ContactType } from "@/features/contacts/types/contact";
import { getInitials } from "@/lib/hooks/textUtils";
import type { Profile } from "@/features/account/types/account";
import ContactDetailsCard from "@/features/contacts/components/ContactDetailsCard";
import BankDetailsCard from "@/features/banks/components/BankDetailsCard";
import { TransactionParty } from "../types/transactionParty";
import { createContactFromProfile } from "@/features/contacts/utils/createContact";

// Helper component to render the correct avatar for each party
const TransactionPartyAvatar = ({ party, profile }: { party: TransactionParty; profile?: Profile | null }) => {

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
      const name =
        party.data.contactType === ContactType.Person
          ? party.data.full_name
          : party.data.business_name;
      return (
        <Avatar
          src={party.data.avatar_url}
          variant="default"
          size={80}
          radius="50%"
        >
          {getInitials(name)}
        </Avatar>
      );
    case "bank":
      return (
        <Avatar src={party.data.avatar_url} size={80} radius="50%">
          <BankIcon size={40} />
        </Avatar>
      );
    default:
      return <Avatar color="gray" size={80} radius="50%" variant="default" />;
  }
};

export interface TransactionDetailsDrawerViewProps {
  profile?: Profile | null;
  onContactClick?: (contact: Contact) => void;
  onPrint?: () => void;
  onDownload?: () => void;
  onReportIssue?: () => void;
  fee?: number;
  timeline?: ReactNode;
  opened: boolean;
  close: () => void;
  transaction: Transaction | null;
}

export function TransactionDetailsDrawerView({
  profile, onContactClick, onPrint, onDownload, onReportIssue, fee, timeline,
  opened,
  close,
  transaction,
}: TransactionDetailsDrawerViewProps) {
  if (!transaction) {
    return null;
  }

  const { amount, date, status, type, from, to, bankAccount } = transaction;

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
            onViewProfile={onContactClick ? () => onContactClick(party.data) : undefined}
          />
        );
      case "bank":
        return <BankDetailsCard bank={party.data} label={label} />;
      case "self":
        if (profile) {
          const selfAsContact = createContactFromProfile(profile);
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
              onClick={onPrint}
              disabled={!onPrint}
              size="md"
              variant="default"
              leftSection={<PrinterIcon size={16} />}
            >
              Print
            </Button>
            <Button
              aria-label="Download"
              onClick={onDownload}
              disabled={!onDownload}
              size="md"
              variant="default"
              leftSection={<Download02Icon size={16} />}
            >
              Download
            </Button>
          </Group>

          <Stack align="center" py="md">
            <Group align="center" justify="center" wrap="nowrap">
              <TransactionPartyAvatar party={from} profile={profile} />
              <ArrowRight02Icon size={32} color="var(--mantine-color-gray-6)" />
              <TransactionPartyAvatar party={to} profile={profile} />
            </Group>

            <Stack gap="xs" ta="center" align="center">
              <Text size="lg" c="dimmed" ta="center" fw="bold">
                {formattedDate}
              </Text>

              <Badge
                color={statusColors[status]}
                variant="dot"
                size="lg"
                radius="xl"
              >
                {status}
              </Badge>

              <Title order={1} c={amountColor} ta="center">
                {formattedAmount}
              </Title>
            </Stack>
          </Stack>

          <Stack>
            {renderPartyDetails(from, "From")}
            {renderPartyDetails(to, "To")}

            <Card withBorder radius="lg" p="lg">
              <Stack>
                <Title order={5}>Details</Title>

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

                <Stack gap={0}>
                  <Group wrap="nowrap" gap={4}>
                    <Text c="dimmed">Transaction fee</Text>
                    <HoverCard width={310} shadow="md" position="bottom">
                      <HoverCard.Target>
                        <ActionIcon
                          aria-label="Info"
                          size="sm"
                          radius="xl"
                          variant="subtle"
                          color="gray"
                          c="dimmed"
                        >
                          <InformationCircleIcon size={16} />
                        </ActionIcon>
                      </HoverCard.Target>
                      <HoverCard.Dropdown>
                        <Text size="sm">
                          A small fee is applied to each transaction to cover
                          processing costs and help us operate the Holler
                          platform.
                        </Text>
                      </HoverCard.Dropdown>
                    </HoverCard>
                  </Group>
                  <Title order={4}>{fee == null ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(fee)}</Title>
                </Stack>
              </Stack>
            </Card>
          </Stack>

          {timeline}

          {onReportIssue && <Button fullWidth variant="subtle" onClick={onReportIssue} size="lg">
            Submit an issue
          </Button>}

          <Space h={100} />
        </Stack>
      </Drawer>

    </>
  );
}
