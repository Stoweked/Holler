// src/features/contacts/hooks/useFavorites.ts
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/contexts/ProfileContext";
import { notifications } from "@mantine/notifications";
import { CheckIcon } from "@mantine/core";
import { Contact } from "../types/contact";

const supabase = createClient();

export function useFavorites() {
  const [favoriteContacts, setFavoriteContacts] = useState<
    Map<string, "profile" | "business">
  >(new Map());
  const { user } = useProfile();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("favorite_contacts")
        .select("favorited_id, favorited_type")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching favorites:", error);
        return;
      }

      const favoriteMap = new Map(
        data.map((fav) => [fav.favorited_id, fav.favorited_type])
      );
      setFavoriteContacts(favoriteMap);
    };

    fetchFavorites();
  }, [user]);

  const toggleFavorite = useCallback(
    async (contact: Contact) => {
      if (!user) return;

      const isCurrentlyFavorite = favoriteContacts.has(contact.id);
      const newFavorites = new Map(favoriteContacts);

      if (isCurrentlyFavorite) {
        // Optimistically remove
        newFavorites.delete(contact.id);
        setFavoriteContacts(newFavorites);

        const { error } = await supabase
          .from("favorite_contacts")
          .delete()
          .match({ user_id: user.id, favorited_id: contact.id });

        if (error) {
          // Revert on error
          newFavorites.set(contact.id, contact.type);
          setFavoriteContacts(newFavorites);
          notifications.show({
            title: "Error",
            message: "Could not remove from favorites.",
            color: "red",
          });
        } else {
          notifications.show({
            title: "Success",
            message: `${contact.full_name} removed from favorites.`,
            color: "lime",
            icon: <CheckIcon size={16} />,
          });
        }
      } else {
        // Optimistically add
        newFavorites.set(contact.id, contact.type);
        setFavoriteContacts(newFavorites);

        const { error } = await supabase.from("favorite_contacts").insert([
          {
            user_id: user.id,
            favorited_id: contact.id,
            favorited_type: contact.type,
          },
        ]);

        if (error) {
          // Revert on error
          newFavorites.delete(contact.id);
          setFavoriteContacts(newFavorites);
          notifications.show({
            title: "Error",
            message: "Could not add to favorites.",
            color: "red",
          });
        } else {
          notifications.show({
            title: "Success",
            message: `${contact.full_name} added to favorites.`,
            color: "lime",
            icon: <CheckIcon size={16} />,
          });
        }
      }
    },
    [user, favoriteContacts]
  );

  return { favoriteContacts, setFavoriteContacts, toggleFavorite };
}
