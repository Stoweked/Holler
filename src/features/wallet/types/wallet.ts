export type TransactionStep =
  | "selectContact"
  | "enterAmount"
  | "confirm"
  | "selectBank"
  | "success";

export type TransactionActionType = "deposit" | "send" | "request" | "transfer";
