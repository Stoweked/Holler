import { createContext, useContext, useCallback, ReactNode } from "react";
import { notifications } from "@mantine/notifications";
import { CheckIcon } from "@mantine/core";
import { Contact, ContactType } from "@/features/contacts/types/contact";
import { toggleFavorite as toggleFavoriteAction } from "@/features/contacts/actions/toggle-favorite";
import { useContacts } from "@/features/contacts/hooks/useContacts"; // 1. Import useContacts

interface FavoritesContextType {
  toggleFavorite: (contact: Contact) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // 2. Get the refetch function from your contacts hook
  const { refetchContacts } = useContacts();

  const toggleFavorite = useCallback(
    async (contact: Contact) => {
      const name =
        contact.contactType === ContactType.Person
          ? contact.full_name
          : contact.business_name;

      const result = await toggleFavoriteAction(
        contact.id,
        contact.contactType,
        contact.favorite
      );

      if (result.error) {
        notifications.show({
          title: "Error",
          message: `Could not update ${name}.`,
          color: "red",
        });
      } else {
        notifications.show({
          title: "Success",
          message: contact.favorite
            ? `${name} removed from favorites.`
            : `${name} added to favorites.`,
          color: "lime",
          icon: <CheckIcon size={16} />,
        });

        // 3. THIS IS THE FIX:
        // After a successful update, tell the contacts hook to refetch its data.
        refetchContacts();
      }
    },
    [refetchContacts] // 4. Add refetchContacts to the dependency array
  );

  return (
    <FavoritesContext.Provider value={{ toggleFavorite }}>
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
