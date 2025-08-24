// stoweked/holler/Holler-main/src/components/layout/SideNav/SideNavLinks.tsx
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
import ContactsDrawer from "@/components/contacts/ContactsDrawer";
import ConnectedBanksDrawer from "@/components/banks/ConnectedBanksDrawer";
import LienWaiversDrawer from "@/components/waivers/LienWaiversDrawer";
import { useState } from "react";
import ProfileModal from "@/components/profile/ProfileModal";
import { Contact } from "@/components/contacts/types";
import PaymentDrawer from "@/components/primaryActions/PaymentDrawer";

export default function SideNavLinks() {
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

  const [openedSendDrawer, { open: openSendDrawer, close: closeSendDrawer }] =
    useDisclosure(false);

  const [
    openedRequestDrawer,
    { open: openRequestDrawer, close: closeRequestDrawer },
  ] = useDisclosure(false);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    openProfileDrawer();
  };

  const handleSendClick = (contact: Contact) => {
    setSelectedContact(contact);
    closeProfileDrawer();
    openSendDrawer();
    closeContactsDrawer();
  };

  const handleRequestClick = (contact: Contact) => {
    setSelectedContact(contact);
    closeProfileDrawer();
    openRequestDrawer();
    closeContactsDrawer();
  };

  return (
    <div>
      <NavLink
        label="Contacts"
        leftSection={<UserMultiple02Icon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
        classNames={{ label: classes.label }}
        onClick={openContactsDrawer}
      />

      <NavLink
        label={
          <>
            <Group wrap="nowrap" gap="xs">
              Connected bank accounts
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
        onClick={openConnectedBanksDrawer}
      />

      <NavLink
        label="Lien waiver"
        leftSection={<ClipboardIcon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
        classNames={{ label: classes.label }}
        onClick={openLienWaiversDrawer}
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
        onSendClick={handleSendClick}
        onRequestClick={handleRequestClick}
      />
      <PaymentDrawer
        opened={openedRequestDrawer}
        close={closeRequestDrawer}
        initialContact={selectedContact}
        actionType="request"
      />
      <PaymentDrawer
        opened={openedSendDrawer}
        close={closeSendDrawer}
        initialContact={selectedContact}
        actionType="send"
      />
    </div>
  );
}
