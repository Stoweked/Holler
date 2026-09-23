import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useProfile } from "@/features/account/contexts/ProfileContext";
import ContactModal from "@/features/contacts/components/ContactModal";
import type { Contact } from "@/features/contacts/types/contact";
import type { Transaction } from "../types/transaction";
import { TransactionDetailsDrawerView } from "./TransactionDetailsDrawerView";
import TransactionTimeline from "./TransactionTimeline";

export default function TransactionDetailsDrawer({ opened, close, transaction }: {
  opened: boolean;
  close: () => void;
  transaction: Transaction | null;
}) {
  const { profile } = useProfile();
  const [contactOpened, { open, close: closeContact }] = useDisclosure(false);
  const [contact, setContact] = useState<Contact | null>(null);
  return <>
    <TransactionDetailsDrawerView
      opened={opened} close={close} transaction={transaction} profile={profile}
      onContactClick={(selected) => { setContact(selected); open(); }}
      fee={2.14} timeline={<TransactionTimeline />} onReportIssue={close}
    />
    <ContactModal opened={contactOpened} close={closeContact} contact={contact} showButtons />
  </>;
}
