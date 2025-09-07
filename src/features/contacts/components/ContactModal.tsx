import {
  Stack,
  Avatar,
  Title,
  Text,
  Button,
  Group,
  Modal,
} from "@mantine/core";
import { StarIcon } from "hugeicons-react";
import { Contact } from "../types/contact";
import { getInitials } from "@/lib/hooks/getInitials";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useWallet } from "@/contexts/WalletContext";
import { TransactionParty } from "@/features/transactions/types/transactionParty";

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
  const { favoriteContacts, toggleFavorite } = useFavorites();
  const { openActionDrawer } = useWallet();
  const isFavorite = favoriteContacts.has(contact.id);

  const handleToggleFavorite = () => {
    toggleFavorite(contact);
  };

  const handleSend = () => {
    const party: TransactionParty = { type: "contact", data: contact };
    openActionDrawer("send", party);
    close(); // Close the modal after opening the drawer
  };

  const handleRequest = () => {
    const party: TransactionParty = { type: "contact", data: contact };
    openActionDrawer("request", party);
    close(); // Close the modal after opening the drawer
  };

  return (
    <Stack gap="xl" pb="sm">
      <Stack align="center" gap="sm">
        <Avatar
          src={contact.avatar_url}
          variant="default"
          size={100}
          radius="50%"
        >
          <Title order={1}>{getInitials(contact.full_name)}</Title>
        </Avatar>
        <Button
          variant="default"
          size="compact-md"
          leftSection={
            <StarIcon
              size={16}
              style={{ fill: isFavorite ? "currentColor" : "none" }}
            />
          }
          onClick={handleToggleFavorite}
        >
          {isFavorite ? "Favorite" : "Add to favorites"}
        </Button>
        <Stack align="center" gap={4}>
          <Title order={2} ta="center">
            {contact.full_name}
          </Title>
          <Text c="dimmed" ta="center">
            {contact.email || contact.phone_number}
          </Text>
        </Stack>
      </Stack>
      {showButtons && (
        <Group justify="center">
          <Button
            radius="xl"
            size="lg"
            variant="outline"
            onClick={handleRequest}
          >
            Request payment
          </Button>
          <Button radius="xl" size="lg" onClick={handleSend}>
            Send payment
          </Button>
        </Group>
      )}
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
