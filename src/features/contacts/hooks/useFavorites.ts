// src/features/contacts/hooks/useFavorites.ts
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/contexts/ProfileContext";

// Create the Supabase client once at the module level, not inside the hook
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
  }, [user]); // Supabase client is stable now and can be removed from dependencies

  return { favoriteContacts, setFavoriteContacts };
}
