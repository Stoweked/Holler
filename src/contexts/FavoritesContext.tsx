// src/contexts/FavoritesContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "./ProfileContext";
import { notifications } from "@mantine/notifications";
import { CheckIcon } from "@mantine/core";
import { Contact } from "@/features/contacts/types/contact";

interface FavoritesContextType {
  favoriteContacts: Set<string>;
  toggleFavorite: (contact: Contact) => void;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const supabase = createClient();

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteContacts, setFavoriteContacts] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const { user } = useProfile();

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("favorite_contacts")
      .select("favorited_id")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching favorites:", error);
      setLoading(false);
      return;
    }

    const favoriteSet = new Set(data.map((fav) => fav.favorited_id));
    setFavoriteContacts(favoriteSet);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = useCallback(
    async (contact: Contact) => {
      if (!user || !contact.type) return;

      const isCurrentlyFavorite = favoriteContacts.has(contact.id);
      const newFavorites = new Set(favoriteContacts);

      if (isCurrentlyFavorite) {
        newFavorites.delete(contact.id);
        setFavoriteContacts(newFavorites);

        const { error } = await supabase
          .from("favorite_contacts")
          .delete()
          .match({
            user_id: user.id,
            favorited_id: contact.id,
            favorited_type: contact.type,
          });

        if (error) {
          newFavorites.add(contact.id);
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
          // This call ensures all components are synced
          fetchFavorites();
        }
      } else {
        newFavorites.add(contact.id);
        setFavoriteContacts(newFavorites);

        const { error } = await supabase.from("favorite_contacts").insert([
          {
            user_id: user.id,
            favorited_id: contact.id,
            favorited_type: contact.type,
          },
        ]);

        if (error) {
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
          // This call ensures all components are synced
          fetchFavorites();
        }
      }
    },
    [user, favoriteContacts, fetchFavorites]
  );

  return (
    <FavoritesContext.Provider
      value={{ favoriteContacts, toggleFavorite, loading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
