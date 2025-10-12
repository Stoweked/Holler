import { Transaction } from "@/features/transactions/types/transaction";
import { mockContacts } from "./mockContacts";
import { mockBanks } from "./mockBanks";
import { mockProjects } from "./mockProjects";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 15750.55,
    date: "2025-10-10T10:15:00Z",
    status: "Completed",
    type: "Sent",
    from: { type: "self", name: "You" },
    to: { type: "contact", data: mockContacts[0] }, // Layton
    bankAccount: "Chase Checking",
    projectId: mockProjects[0].id, // Correct: Use projectId
  },
  {
    id: "2",
    amount: 185200.0,
    date: "2025-10-09T15:30:00Z",
    status: "Completed",
    type: "Received",
    from: { type: "contact", data: mockContacts[7] }, // Ezra Lee
    to: { type: "self", name: "You" },
    bankAccount: "Business Savings",
    projectId: mockProjects[1].id, // Correct: Use projectId
  },
  {
    id: "3",
    amount: 22500.0,
    date: "2025-10-09T11:00:00Z",
    status: "Pending",
    type: "Sent",
    from: { type: "self", name: "You" },
    to: { type: "contact", data: mockContacts[2] }, // Autumn
    bankAccount: "Chase Checking",
    projectId: mockProjects[2].id, // Correct: Use projectId
  },
  {
    id: "4",
    amount: 98500.0,
    date: "2025-10-07T18:00:00Z",
    status: "Completed",
    type: "Deposited",
    from: { type: "bank", data: mockBanks[0] }, // Chase Bank
    to: { type: "self", name: "You" },
    bankAccount: "Business Savings",
  },
  {
    id: "5",
    amount: 7200.0,
    date: "2025-10-06T09:45:00Z",
    status: "Failed",
    type: "Sent",
    from: { type: "self", name: "You" },
    to: { type: "contact", data: mockContacts[4] }, // Bodhi
    bankAccount: "Chase Checking",
  },
  {
    id: "6",
    amount: 50000.0,
    date: "2025-10-05T14:20:00Z",
    status: "Completed",
    type: "Received",
    from: { type: "contact", data: mockContacts[5] }, // Juniper
    to: { type: "self", name: "You" },
    bankAccount: "Business Savings",
    projectId: mockProjects[0].id, // Correct: Use projectId
  },
  {
    id: "7",
    amount: 500.25,
    date: "2025-10-05T12:00:00Z",
    status: "Completed",
    type: "Sent",
    from: { type: "self", name: "You" },
    to: { type: "contact", data: mockContacts[6] }, // Kinsley
    bankAccount: "Chase Checking",
  },
  {
    id: "8",
    amount: 120000.0,
    date: "2025-10-02T16:00:00Z",
    status: "Pending",
    type: "Sent",
    from: { type: "contact", data: mockContacts[1] }, // River
    to: { type: "self", name: "You" },
    bankAccount: "Business Savings",
    projectId: mockProjects[1].id, // Correct: Use projectId
  },
  {
    id: "9",
    amount: 150000.0,
    date: "2025-09-30T10:00:00Z",
    status: "Completed",
    type: "Transferred",
    from: { type: "self", name: "You" },
    to: { type: "bank", data: mockBanks[1] }, // Bank of America
    bankAccount: "Chase Checking",
    projectId: mockProjects[2].id, // Correct: Use projectId
  },
  {
    id: "10",
    amount: 850.0,
    date: "2025-09-28T13:10:00Z",
    status: "Completed",
    type: "Received",
    from: { type: "contact", data: mockContacts[3] }, // Parker
    to: { type: "self", name: "You" },
    bankAccount: "Chase Checking",
  },
  {
    id: "11",
    amount: 45000.0,
    date: "2025-09-25T11:30:00Z",
    status: "Completed",
    type: "Sent",
    from: { type: "self", name: "You" },
    to: { type: "contact", data: mockContacts[8] }, // Sage
    bankAccount: "Chase Checking",
    projectId: mockProjects[0].id, // Correct: Use projectId
  },
  {
    id: "12",
    amount: 3000.0,
    date: "2025-09-22T09:00:00Z",
    status: "Pending",
    type: "Sent",
    from: { type: "contact", data: mockContacts[9] }, // Wren
    to: { type: "self", name: "You" },
    bankAccount: "Business Savings",
    projectId: mockProjects[1].id, // Correct: Use projectId
  },
];
