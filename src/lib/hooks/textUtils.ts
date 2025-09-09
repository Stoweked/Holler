// src/lib/utils/textUtils.ts
/**
 * Capitalizes the first letter of a string.
 * @param s - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalize = (s: string) => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

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
