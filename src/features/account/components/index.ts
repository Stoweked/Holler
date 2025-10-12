// src/features/account/components/index.ts
import Account from "./Account";
import AccountDropdown from "./AccountDropdown";
import ColorModeCard from "./ColorModeCard";
import DeleteAccountCard from "./DeleteAccountCard";
import ResetPasswordCard from "./ResetPasswordCard";
import { ProfileUI } from "./profile";

export const AccountUI = {
  Page: Account,
  Dropdown: AccountDropdown,
  ColorModeCard: ColorModeCard,
  DeleteAccountCard: DeleteAccountCard,
  ResetPasswordCard: ResetPasswordCard,
  Profile: ProfileUI,
};
