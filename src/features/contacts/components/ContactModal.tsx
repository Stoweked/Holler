// src/features/contacts/components/ContactModal.tsx
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
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/contexts/ProfileContext";
import { notifications } from "@mantine/notifications";
import { useFavorites } from "../hooks/useFavorites";

interface ContactModalProps {
  opened: boolean;
  close: () => void;
  contact: Contact | null;
  showButtons?: boolean;
  onSendClick?: (contact: Contact) => void;
  onRequestClick?: (contact: Contact) => void;
}

interface ContactModalContentProps extends Omit<ContactModalProps, "contact"> {
  contact: Contact;
}

function ContactModalContent({
  contact,
  showButtons,
  onSendClick,
  onRequestClick,
}: ContactModalContentProps) {
  const supabase = createClient();
  const { user } = useProfile();
  const { favoriteContacts, setFavoriteContacts } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(
    favoriteContacts.has(contact.id)
  );

  useEffect(() => {
    setIsFavorite(favoriteContacts.has(contact.id));
  }, [contact, favoriteContacts]);

  const handleToggleFavorite = async () => {
    if (!user) return;

    // Prevent users from favoriting themselves
    if (contact.type === "profile" && contact.id === user.id) {
      notifications.show({
        title: "Cannot favorite yourself",
        message: "You cannot add your own profile to favorites.",
        color: "yellow",
      });
      return;
    }

    // Prevent users from favoriting a business they are a part of
    if (contact.type === "business") {
      const { data } = await supabase
        .from("business_admins")
        .select("business_id")
        .eq("user_id", user.id)
        .eq("business_id", contact.id)
        .single();

      if (data) {
        notifications.show({
          title: "Cannot favorite your business",
          message: "You cannot add your own business to favorites.",
          color: "yellow",
        });
        return;
      }
    }

    const currentlyFavorite = isFavorite;
    setIsFavorite(!currentlyFavorite); // Optimistic update

    if (currentlyFavorite) {
      // Remove from favorites
      const { error } = await supabase
        .from("favorite_contacts")
        .delete()
        .match({
          user_id: user.id,
          favorited_id: contact.id,
          favorited_type: contact.type,
        });

      if (error) {
        setIsFavorite(true); // Revert on error
        notifications.show({
          title: "Error",
          message: "Could not remove from favorites",
          color: "red",
        });
      } else {
        const newFavorites = new Map(favoriteContacts);
        newFavorites.delete(contact.id);
        setFavoriteContacts(newFavorites);
      }
    } else {
      // Add to favorites
      const { error } = await supabase.from("favorite_contacts").insert([
        {
          user_id: user.id,
          favorited_id: contact.id,
          favorited_type: contact.type,
        },
      ]);

      if (error) {
        setIsFavorite(false); // Revert on error
        notifications.show({
          title: "Error",
          message: "Could not add to favorites",
          color: "red",
        });
      } else {
        const newFavorites = new Map(favoriteContacts);
        newFavorites.set(contact.id, contact.type);
        setFavoriteContacts(newFavorites);
      }
    }
  };

  const handleSend = () => {
    if (onSendClick && contact) {
      onSendClick(contact);
    }
  };

  const handleRequest = () => {
    if (onRequestClick && contact) {
      onRequestClick(contact);
    }
  };

  return (
    <Stack gap="xl">
      <Stack align="center" gap="sm">
        <Avatar src={contact.avatar_url} color="lime" size={100} radius="50%">
          <Title order={1}>{getInitials(contact.full_name)}</Title>
        </Avatar>
        <Button
          variant={isFavorite ? "filled" : "default"}
          size="compact-md"
          leftSection={<StarIcon size={16} />}
          onClick={handleToggleFavorite}
        >
          Favorite
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
  onSendClick,
  onRequestClick,
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
          onSendClick={onSendClick}
          onRequestClick={onRequestClick}
        />
      )}
    </Modal>
  );
}
