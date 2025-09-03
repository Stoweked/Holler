// src/lib/utils.ts

/**
 * Generates initials from a full name.
 * @param name - The full name string.
 * @returns A string containing the initials.
 */
export const getInitials = (name: string | undefined) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length > 1) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};
