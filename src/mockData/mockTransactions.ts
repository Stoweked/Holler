import { Transaction } from "@/features/transactions/types/transaction";
import { mockContacts } from "./mockContacts";
import { mockBanks } from "./mockBanks";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 15750.55,
    date: "2025-08-24T10:15:00Z",
    status: "Completed",
    type: "Sent",
    from: { type: "self", name: "You" },
    to: { type: "contact", data: mockContacts[0] }, // Layton
    bankAccount: "Chase Checking",
  },
  {
    id: "2",
    amount: 185200.0,
    date: "2025-08-23T15:30:00Z",
    status: "Completed",
    type: "Received",
    from: { type: "contact", data: mockContacts[1] }, // J2 Homes
    to: { type: "self", name: "You" },
    bankAccount: "Business Savings",
  },
  {
    id: "4",
    amount: 98500.0,
    date: "2025-08-21T18:00:00Z",
    status: "Completed",
    type: "Deposited",
    from: { type: "bank", data: mockBanks[0] }, // Chase Bank
    to: { type: "self", name: "You" },
    bankAccount: "Business Savings",
  },
  {
    id: "9",
    amount: 150000.0,
    date: "2025-08-16T10:00:00Z",
    status: "Completed",
    type: "Transferred",
    from: { type: "self", name: "You" },
    to: { type: "bank", data: mockBanks[1] }, // Bank of America
    bankAccount: "Chase Checking",
  },
  // Add more mock transactions here following the new structure
];
