// src/features/wallet/types/wallet.ts

export type TransactionStep =
  | "selectContact"
  | "inviteContact"
  | "enterAmount"
  | "confirm"
  | "selectBank"
  | "success";

export type TransactionActionType = "deposit" | "send" | "request" | "transfer";
