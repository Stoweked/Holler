import { Transaction } from "@/features/transactions/types/transaction";
import { mockBanks } from "./mockBanks";
import { mockProjects } from "./mockProjects";
import { Contact, ContactType } from "@/features/contacts"; // Import the Contact type

// Create a local, self-contained array of contacts just for these mock transactions.
const localMockContacts: Contact[] = [
  {
    id: "contact-1",
    contactType: ContactType.Person,
    full_name: "Layton Funches",
    email: "layton@example.com",
    favorite: true,
    projects: [mockProjects[0]],
  },
  {
    id: "contact-2",
    contactType: ContactType.Person,
    full_name: "River Sterling",
    email: "river@example.com",
    favorite: false,
    projects: [mockProjects[1]],
  },
  {
    id: "contact-3",
    contactType: ContactType.Person,
    full_name: "Autumn Falls",
    email: "autumn@example.com",
    favorite: false,
    projects: [mockProjects[2]],
  },
  {
    id: "contact-4",
    contactType: ContactType.Person,
    full_name: "Parker Rhoades",
    email: "parker@example.com",
    favorite: false,
  },
  {
    id: "contact-5",
    contactType: ContactType.Business,
    business_name: "Bodhi Construction",
    email: "bodhi@construction.com",
    favorite: false,
  },
  {
    id: "contact-6",
    contactType: ContactType.Person,
    full_name: "Juniper Sage",
    email: "juniper@example.com",
    favorite: false,
    projects: [mockProjects[0]],
  },
  {
    id: "contact-7",
    contactType: ContactType.Person,
    full_name: "Kinsley Arbor",
    email: "kinsley@example.com",
    favorite: false,
  },
  {
    id: "contact-8",
    contactType: ContactType.Person,
    full_name: "Ezra Lee",
    email: "ezra@example.com",
    favorite: false,
    projects: [mockProjects[1]],
  },
  {
    id: "contact-9",
    contactType: ContactType.Business,
    business_name: "Sage Builders",
    email: "sage@builders.com",
    favorite: false,
    projects: [mockProjects[0]],
  },
  {
    id: "contact-10",
    contactType: ContactType.Person,
    full_name: "Wren Meadow",
    email: "wren@example.com",
    favorite: false,
    projects: [mockProjects[1]],
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 15750.55,
    date: "2025-10-10T10:15:00Z",
    status: "Completed",
    type: "Sent",
    from: { type: "self", name: "You" },
    to: { type: "contact", data: localMockContacts[0] }, // Use local mock
    bankAccount: "Chase Checking",
    projectId: mockProjects[0].id,
  },
  {
    id: "2",
    amount: 185200.0,
    date: "2025-10-09T15:30:00Z",
    status: "Completed",
    type: "Received",
    from: { type: "contact", data: localMockContacts[7] }, // Use local mock
    to: { type: "self", name: "You" },
    bankAccount: "Business Savings",
    projectId: mockProjects[1].id,
  },
  {
    id: "3",
    amount: 22500.0,
    date: "2025-10-09T11:00:00Z",
    status: "Pending",
    type: "Sent",
    from: { type: "self", name: "You" },
    to: { type: "contact", data: localMockContacts[2] }, // Use local mock
    bankAccount: "Chase Checking",
    projectId: mockProjects[2].id,
  },
  {
    id: "4",
    amount: 98500.0,
    date: "2025-10-07T18:00:00Z",
    status: "Completed",
    type: "Deposited",
    from: { type: "bank", data: mockBanks[0] },
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
    to: { type: "contact", data: localMockContacts[4] }, // Use local mock
    bankAccount: "Chase Checking",
  },
  {
    id: "6",
    amount: 50000.0,
    date: "2025-10-05T14:20:00Z",
    status: "Completed",
    type: "Received",
    from: { type: "contact", data: localMockContacts[5] }, // Use local mock
    to: { type: "self", name: "You" },
    bankAccount: "Business Savings",
    projectId: mockProjects[0].id,
  },
  {
    id: "7",
    amount: 500.25,
    date: "2025-10-05T12:00:00Z",
    status: "Completed",
    type: "Sent",
    from: { type: "self", name: "You" },
    to: { type: "contact", data: localMockContacts[6] }, // Use local mock
    bankAccount: "Chase Checking",
  },
  {
    id: "8",
    amount: 120000.0,
    date: "2025-10-02T16:00:00Z",
    status: "Pending",
    type: "Sent",
    from: { type: "contact", data: localMockContacts[1] }, // Use local mock
    to: { type: "self", name: "You" },
    bankAccount: "Business Savings",
    projectId: mockProjects[1].id,
  },
  {
    id: "9",
    amount: 150000.0,
    date: "2025-09-30T10:00:00Z",
    status: "Completed",
    type: "Transferred",
    from: { type: "self", name: "You" },
    to: { type: "bank", data: mockBanks[1] },
    bankAccount: "Chase Checking",
    projectId: mockProjects[2].id,
  },
  {
    id: "10",
    amount: 850.0,
    date: "2025-09-28T13:10:00Z",
    status: "Completed",
    type: "Received",
    from: { type: "contact", data: localMockContacts[3] }, // Use local mock
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
    to: { type: "contact", data: localMockContacts[8] }, // Use local mock
    bankAccount: "Chase Checking",
    projectId: mockProjects[0].id,
  },
  {
    id: "12",
    amount: 3000.0,
    date: "2025-09-22T09:00:00Z",
    status: "Pending",
    type: "Sent",
    from: { type: "contact", data: localMockContacts[9] }, // Use local mock
    to: { type: "self", name: "You" },
    bankAccount: "Business Savings",
    projectId: mockProjects[1].id,
  },
];
