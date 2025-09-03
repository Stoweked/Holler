//src/features/wallet/types/wallet.ts

import { Bank } from "@/features/banks/types/bank";
import { Contact } from "@/features/contacts/types/contact";

export type TransactionStep =
  | "selectContact"
  | "enterAmount"
  | "confirm"
  | "selectBank"
  | "success";

export type TransactionActionType = "deposit" | "send" | "request" | "transfer";

export type TransactionParty =
  | { type: "contact"; data: Contact }
  | { type: "bank"; data: Bank };
