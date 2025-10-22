"use client";

import {
  Stack,
  Avatar,
  Title,
  Text,
  Button,
  Group,
  Modal,
  Divider,
} from "@mantine/core";
import { AlertCircleIcon, StarIcon } from "hugeicons-react";
import { Contact, ContactType } from "../types/contact";
import { getInitials } from "@/lib/hooks/textUtils";
import { useWallet } from "@/features/wallet/contexts/WalletContext";
import { TransactionParty } from "@/features/transactions/types/transactionParty";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useContacts } from "../contexts/ContactsContext";
import { addContact } from "../actions/add-contact";
import { removeContact } from "../actions/remove-contact";
import { modals } from "@mantine/modals";

interface ContactModalProps {
  opened: boolean;
  close: () => void;
  contact: Contact | null;
  showButtons?: boolean;
}

interface ContactModalContentProps extends Omit<ContactModalProps, "contact"> {
  contact: Contact;
}

function ContactModalContent({
  contact,
  showButtons,
  close,
}: ContactModalContentProps) {
  const { openActionDrawer } = useWallet();
  const { contacts, toggleFavorite, refetchContacts } = useContacts();
  const [isRemoving, setIsRemoving] = useState(false); // State for loading indicator
  const currentContact = contacts.find((c) => c.id === contact.id) || contact;
  const isFavorite = currentContact.favorite;

  const name =
    contact.contactType === ContactType.Person
      ? contact.full_name
      : contact.business_name;

  const handleToggleFavorite = async () => {
    await addContact(contact.id, contact.contactType);
    toggleFavorite(contact);
  };

  const handleSend = () => {
    const party: TransactionParty = { type: "contact", data: contact };
    openActionDrawer("send", party);
    close();
  };

  const handleRequest = () => {
    const party: TransactionParty = { type: "contact", data: contact };
    openActionDrawer("request", party);
    close();
  };

  const handleRemoveContact = async () => {
    setIsRemoving(true);
    const result = await removeContact(contact.id, contact.contactType);
    setIsRemoving(false);

    if (result.success) {
      notifications.show({
        title: "Contact removed",
        message: `${name} has been removed from your contacts.`,
        color: "lime",
      });
      refetchContacts(); // Refresh the list
      close(); // Close the modal
    } else {
      notifications.show({
        title: "Error",
        message: result.error || "Failed to remove contact.",
        color: "red",
        icon: <AlertCircleIcon size={18} />,
      });
    }
  };

  const confirmRemove = () =>
    modals.openConfirmModal({
      title: `Remove ${name}?`,
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to remove this contact? You can add them back
          later by searching for them.
        </Text>
      ),
      labels: { confirm: "Remove contact", cancel: "Cancel" },
      confirmProps: { color: "red", loading: isRemoving },
      onConfirm: handleRemoveContact,
    });
  // --- End Remove Contact Logic ---

  return (
    <Stack gap="xl" pb="sm">
      <Stack align="center" gap="sm">
        <Avatar
          src={contact.avatar_url}
          variant="default"
          size={100}
          radius="50%"
        >
          <Title order={1}>{getInitials(name)}</Title>
        </Avatar>

        <Button
          variant="default"
          size="compact-md"
          leftSection={
            <StarIcon
              size={16}
              color={isFavorite ? "gold" : "gray"}
              style={{ fill: isFavorite ? "currentColor" : "none" }}
            />
          }
          onClick={handleToggleFavorite}
        >
          {isFavorite ? "Favorite" : "Add to favorites"}
        </Button>
        <Stack align="center" gap={4}>
          <Title order={2} ta="center">
            {name}
          </Title>
          {contact.username && (
            <Text c="dimmed" ta="center">
              @{contact.username}
            </Text>
          )}
        </Stack>
      </Stack>

      {showButtons && (
        <Group justify="center" grow wrap="nowrap">
          <Button
            radius="xl"
            size="lg"
            variant="outline"
            onClick={handleRequest}
          >
            Request
          </Button>
          <Button radius="xl" size="lg" onClick={handleSend}>
            Send
          </Button>
        </Group>
      )}

      <Divider />

      {/* Remove contact */}
      <Button
        variant="light"
        color="red"
        size="lg"
        onClick={confirmRemove}
        loading={isRemoving}
      >
        Remove from contacts
      </Button>
    </Stack>
  );
}

export default function ContactModal({
  opened,
  close,
  contact,
  showButtons = true,
}: ContactModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Profile"
      padding="lg"
      size="md"
      centered
    >
      {contact && (
        <ContactModalContent
          contact={contact}
          opened={opened}
          close={close}
          showButtons={showButtons}
        />
      )}
    </Modal>
  );
}
