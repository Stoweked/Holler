// src/components/layout/SideNav/SideNavLinks.tsx

import { Badge, Group, NavLink } from "@mantine/core";
import {
  ArrowRight01Icon,
  BankIcon,
  ClipboardIcon,
  Message01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";
import classes from "./SideNav.module.css";
import { useDisclosure } from "@mantine/hooks";
import LienWaiversDrawer from "@/features/waivers/components/LienWaiversDrawer";
import { useState, useEffect } from "react";
import ProfileModal from "@/features/profile/components/ProfileModal";
import { Contact } from "@/features/contacts/types/recipient";
import ConnectedBanksDrawer from "@/features/banks/components/ConnectedBanksDrawer";
import ContactsDrawer from "@/features/contacts/components/ContactsDrawer";
import TransactionDrawer from "@/features/wallet/components/actions/TransactionDrawer";
import { TransactionActionType } from "@/features/wallet/types/wallet";

interface SideNavLinksProps {
  closeMobileNav: () => void;
}

export default function SideNavLinks({ closeMobileNav }: SideNavLinksProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  // Use the correct type for state
  const [transactionType, setTransactionType] =
    useState<TransactionActionType>("send");

  const [
    openedContactsDrawer,
    { open: openContactsDrawer, close: closeContactsDrawer },
  ] = useDisclosure(false);

  const [
    openedConnectedBanksDrawer,
    { open: openConnectedBanksDrawer, close: closeConnectedBanksDrawer },
  ] = useDisclosure(false);

  const [
    openedLienWaiversDrawer,
    { open: openLienWaiversDrawer, close: closeLienWaiversDrawer },
  ] = useDisclosure(false);

  const [
    openedProfileDrawer,
    { open: openProfileDrawer, close: closeProfileDrawer },
  ] = useDisclosure(false);

  const [
    openedTransactionDrawer,
    { open: openTransactionDrawer, close: closeTransactionDrawer },
  ] = useDisclosure(false);

  useEffect(() => {
    const handleOpenContacts = () => openContactsDrawer();
    const handleOpenBanks = () => openConnectedBanksDrawer();

    window.addEventListener("open-contacts", handleOpenContacts);
    window.addEventListener("open-banks", handleOpenBanks);

    return () => {
      window.removeEventListener("open-contacts", handleOpenContacts);
      window.removeEventListener("open-banks", handleOpenBanks);
    };
  }, [openContactsDrawer, openConnectedBanksDrawer]);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    openProfileDrawer();
    closeMobileNav();
  };

  // Use the correct type in the handler function
  const handleTransactionStart = (
    contact: Contact,
    type: TransactionActionType
  ) => {
    setSelectedContact(contact);
    setTransactionType(type);
    closeProfileDrawer();
    openTransactionDrawer();
    closeContactsDrawer();
  };

  const handleContactsClick = () => {
    closeMobileNav();
    openContactsDrawer();
  };

  const handleBankAccountsClick = () => {
    closeMobileNav();
    openConnectedBanksDrawer();
  };

  const handleLienWaiversClick = () => {
    closeMobileNav();
    openLienWaiversDrawer();
  };

  return (
    <div>
      <NavLink
        label="Contacts"
        leftSection={<UserMultiple02Icon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
        classNames={{ label: classes.label }}
        onClick={handleContactsClick}
      />

      <NavLink
        label={
          <>
            <Group wrap="nowrap" gap="xs">
              Bank accounts
              <Badge variant="default" size="sm">
                3
              </Badge>
            </Group>
          </>
        }
        leftSection={<BankIcon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
        classNames={{ label: classes.label }}
        onClick={handleBankAccountsClick}
      />

      <NavLink
        label="Lien waivers"
        leftSection={<ClipboardIcon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
        classNames={{ label: classes.label }}
        onClick={handleLienWaiversClick}
      />

      <NavLink
        label="Get support"
        leftSection={<Message01Icon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
        classNames={{ label: classes.label }}
      />

      <ContactsDrawer
        opened={openedContactsDrawer}
        close={closeContactsDrawer}
        onContactClick={handleContactClick}
      />
      <ConnectedBanksDrawer
        opened={openedConnectedBanksDrawer}
        close={closeConnectedBanksDrawer}
      />
      <LienWaiversDrawer
        opened={openedLienWaiversDrawer}
        close={closeLienWaiversDrawer}
      />
      <ProfileModal
        opened={openedProfileDrawer}
        close={closeProfileDrawer}
        contact={selectedContact}
        onSendClick={(contact) => handleTransactionStart(contact, "send")}
        onRequestClick={(contact) => handleTransactionStart(contact, "request")}
      />
      <TransactionDrawer
        opened={openedTransactionDrawer}
        close={closeTransactionDrawer}
        initialContact={selectedContact}
        transactionType={transactionType}
      />
    </div>
  );
}
