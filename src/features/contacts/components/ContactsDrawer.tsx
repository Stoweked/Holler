import { Drawer, Space } from "@mantine/core";
import ContactsList from "./ContactList";
import { Contact } from "../types/contact";
import InviteContactStep from "./InviteContactStep";
import { useState } from "react";

interface ContactsDrawerProps {
  opened: boolean;
  close: () => void;
  onContactClick?: (contact: Contact) => void;
}

export default function ContactsDrawer({
  opened,
  close,
  onContactClick,
}: ContactsDrawerProps) {
  const [step, setStep] = useState("list"); // 'list' or 'invite'

  const handleContactClick = (contact: Contact) => {
    if (onContactClick) {
      onContactClick(contact);
    }
    close();
  };

  const handleInviteNew = () => {
    setStep("invite");
  };

  const handleInvite = (method: string, value: string, fullName: string) => {
    console.log("Inviting new contact:", { method, value, fullName });
    // Here you would add the logic to actually create/invite the contact
    // For now, just close the drawer.
    setStep("list");
    close();
  };

  const handleBack = () => {
    setStep("list");
  };

  return (
    <Drawer
      opened={opened}
      onClose={() => {
        close();
        setStep("list");
      }}
      title={step === "list" ? "Holler contacts" : "Invite a new contact"}
      padding="lg"
      size="md"
    >
      {step === "list" && (
        <ContactsList
          onContactClick={handleContactClick}
          onInviteNew={handleInviteNew}
        />
      )}
      {step === "invite" && (
        <InviteContactStep onInvite={handleInvite} flowContext="contacts" />
      )}
      <Space h={100} />
    </Drawer>
  );
}
