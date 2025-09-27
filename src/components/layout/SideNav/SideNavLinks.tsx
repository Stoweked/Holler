// src/components/layout/SideNav/SideNavLinks.tsx
import { Group, NavLink } from "@mantine/core";
import {
  ArrowRight01Icon,
  BankIcon,
  ClipboardIcon,
  House03Icon,
  Settings01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";
import classes from "./SideNav.module.css";
import { useDisclosure } from "@mantine/hooks";
import LienWaiversDrawer from "@/features/waivers/components/LienWaiversDrawer";
import { useState, useEffect } from "react";
import ConnectedBanksDrawer from "@/features/banks/components/ConnectedBanksDrawer";
import ContactsDrawer from "@/features/contacts/components/ContactsDrawer";
import ContactModal from "@/features/contacts/components/ContactModal";
import { Contact } from "@/features/contacts/types/contact";
import SettingsDrawer from "@/features/settings/components/SettingsDrawer";
import { useProjects } from "@/features/projects/contexts/ProjectsContext";

interface SideNavLinksProps {
  closeMobileNav: () => void;
}

export default function SideNavLinks({ closeMobileNav }: SideNavLinksProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [initialSettingsTab, setInitialSettingsTab] = useState("account");
  const { openDrawer: openProjectsDrawer } = useProjects();

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
    openedSettingsDrawer,
    { open: openSettingsDrawer, close: closeSettingsDrawer },
  ] = useDisclosure(false);

  const [
    openedProfileDrawer,
    { open: openProfileDrawer, close: closeProfileDrawer },
  ] = useDisclosure(false);

  useEffect(() => {
    const handleOpenContacts = () => openContactsDrawer();
    const handleOpenBanks = () => openConnectedBanksDrawer();

    const handleOpenSettings = (event: Event) => {
      const customEvent = event as CustomEvent;
      const tab = customEvent.detail?.tab || "account";
      setInitialSettingsTab(tab);
      openSettingsDrawer();
    };

    window.addEventListener("open-contacts", handleOpenContacts);
    window.addEventListener("open-banks", handleOpenBanks);
    window.addEventListener("open-settings", handleOpenSettings);

    return () => {
      window.removeEventListener("open-contacts", handleOpenContacts);
      window.removeEventListener("open-banks", handleOpenBanks);
      window.removeEventListener("open-settings", handleOpenSettings);
    };
  }, [openContactsDrawer, openConnectedBanksDrawer, openSettingsDrawer]);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    openProfileDrawer();
    closeMobileNav();
    closeContactsDrawer();
  };

  const handleContactsClick = () => {
    closeMobileNav();
    openContactsDrawer();
  };

  const handleProjectsClick = () => {
    closeMobileNav();
    openProjectsDrawer();
  };

  const handleBankAccountsClick = () => {
    closeMobileNav();
    openConnectedBanksDrawer();
  };

  const handleLienWaiversClick = () => {
    closeMobileNav();
    openLienWaiversDrawer();
  };

  const handleSettingsClick = () => {
    closeMobileNav();
    setInitialSettingsTab("account");
    openSettingsDrawer();
  };

  return (
    <div>
      <NavLink
        label="Contacts"
        aria-label="Contacts"
        leftSection={<UserMultiple02Icon size={24} color="gray" />}
        rightSection={
          <ArrowRight01Icon size={32} color="var(--mantine-color-lime-4)" />
        }
        className={classes.navLink}
        classNames={{ label: classes.label }}
        onClick={handleContactsClick}
      />

      <NavLink
        label="Projects"
        aria-label="Projects"
        leftSection={<House03Icon size={24} color="gray" />}
        rightSection={
          <ArrowRight01Icon size={32} color="var(--mantine-color-lime-4)" />
        }
        className={classes.navLink}
        classNames={{ label: classes.label }}
        onClick={handleProjectsClick}
      />

      <NavLink
        label="Lien waivers"
        aria-label="Lie waivers"
        leftSection={<ClipboardIcon size={24} color="gray" />}
        rightSection={
          <ArrowRight01Icon size={32} color="var(--mantine-color-lime-4)" />
        }
        className={classes.navLink}
        classNames={{ label: classes.label }}
        onClick={handleLienWaiversClick}
      />

      <NavLink
        label={
          <Group wrap="nowrap" gap="xs">
            Bank accounts
            {/* <Badge variant="default" size="lg">
              3
            </Badge> */}
          </Group>
        }
        aria-label="Bank accounts"
        leftSection={<BankIcon size={24} color="gray" />}
        rightSection={
          <ArrowRight01Icon size={32} color="var(--mantine-color-lime-4)" />
        }
        className={classes.navLink}
        classNames={{ label: classes.label }}
        onClick={handleBankAccountsClick}
      />

      <NavLink
        label="Settings"
        aria-label="Settings"
        leftSection={<Settings01Icon size={24} color="gray" />}
        rightSection={
          <ArrowRight01Icon size={32} color="var(--mantine-color-lime-4)" />
        }
        className={classes.navLink}
        classNames={{ label: classes.label }}
        onClick={handleSettingsClick}
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
      <SettingsDrawer
        opened={openedSettingsDrawer}
        close={closeSettingsDrawer}
        initialTab={initialSettingsTab}
      />

      <ContactModal
        opened={openedProfileDrawer}
        close={closeProfileDrawer}
        contact={selectedContact}
      />
    </div>
  );
}
