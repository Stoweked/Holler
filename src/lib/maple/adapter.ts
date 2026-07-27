import type {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/features/transactions/types/transaction";
import type { TransactionParty } from "@/features/transactions/types/transactionParty";
import type { Transfer } from "./client";

const STATUS_MAP: Record<string, TransactionStatus> = {
  completed: "Completed",
  pending: "Pending",
  failed: "Failed",
};

function toStatus(raw: string): TransactionStatus {
  return STATUS_MAP[raw.toLowerCase()] ?? "Unknown";
}

// maple documents `type` as inbound/outbound only; "Transferred" is a neutral
// fallback for a direction we cannot determine, never a guess at one.
function toType(raw: string): TransactionType {
  if (raw.toLowerCase() === "inbound") return "Received";
  if (raw.toLowerCase() === "outbound") return "Sent";
  return "Transferred";
}

function parties(
  type: TransactionType,
  otherPartyName: string
): Pick<Transaction, "from" | "to"> {
  const self: TransactionParty = { type: "self", name: "You" };
  const other: TransactionParty = { type: "external", name: otherPartyName };

  return type === "Received"
    ? { from: other, to: self }
    : { from: self, to: other };
}

export function toTransaction(transfer: Transfer): Transaction {
  const type = toType(transfer.type);

  return {
    id: transfer.id,
    amount: transfer.amount,
    date: transfer.createdAt,
    status: toStatus(transfer.status),
    type,
    ...parties(type, transfer.otherPartyName),
  };
}

export function toTransactions(transfers: Transfer[]): Transaction[] {
  return transfers.map(toTransaction);
}
