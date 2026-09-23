import type { Profile } from "@/features/account/types/account";
import type { Business } from "@/features/business/types/business";
import type { BusinessRole } from "@/features/business/types/businessRole";
import type { Contact, ContactType } from "@/features/contacts/types/contact";
import type { Project } from "@/features/projects/types/project";
import type { Waiver } from "@/features/waivers/types/waiver";
import type { Transaction, TransactionStatusFilter, TransactionTypeFilter, DateFilter, SortOption } from "@/features/transactions/types/transaction";

export type MutationResult<T = undefined> =
  | { success: boolean; data?: T; error?: never }
  | { error: string; success?: never; data?: never };
export interface ProjectInput {
  name: string;
  address: string;
  start_date: string | null;
  end_date: string | null;
}
export type WaiverInput = Pick<Waiver, "title" | "content" | "type" | "payment_type">;
export type BusinessInput = { [K in keyof Omit<Business, "id">]?: string | null };
export interface FeedbackInput {
  formEmail: string;
  formRating: number;
  formMessage: string;
  formType: "feature" | "bug";
  canContact: boolean;
}
export interface TransactionFilters {
  status: TransactionStatusFilter;
  type: TransactionTypeFilter;
  contact: string;
  project: string;
  minAmount: number;
  maxAmount: number;
  search: string;
  dateFilter: DateFilter | [Date, Date];
  sortBy: SortOption;
}

/** UI-facing operations. Implementations own transport, persistence and authorization. */
export interface AppServices {
  getContacts(): Promise<Contact[]>;
  getSuggestedContacts(): Promise<Contact[]>;
  searchGlobalContacts(searchTerm: string): Promise<Contact[]>;
  addContact(id: string, type: ContactType): Promise<MutationResult>;
  removeContact(id: string, type: ContactType): Promise<MutationResult>;
  toggleFavorite(id: string, type: ContactType, currentStatus: boolean): Promise<MutationResult>;
  inviteContact(input: { name: string; email?: string; phone?: string }): Promise<MutationResult<unknown>>;
  updateContactProjects(id: string, type: ContactType, projectIds: string[]): Promise<MutationResult>;
  getProjects(): Promise<Project[]>;
  createProject(formData: FormData): Promise<MutationResult<Project>>;
  updateProject(input: ProjectInput, id: string): Promise<MutationResult<Project>>;
  archiveProject(id: string): Promise<MutationResult>;
  getWaivers(): Promise<Waiver[]>;
  saveWaiver(input: WaiverInput, id?: string): Promise<string>;
  archiveWaiver(id: string): Promise<void>;
  getBusinessProfile(): Promise<{ business: Business; role: BusinessRole } | null>;
  updateBusinessProfile(id: string, input: BusinessInput): Promise<void>;
  checkBusinessUsernameExists(username: string): Promise<boolean>;
  updateProfile(input: Partial<Omit<Profile, "id" | "auth_provider">>): Promise<Profile>;
  uploadAvatar(formData: FormData): Promise<{ publicUrl: string }>;
  submitFeedback(input: FeedbackInput): Promise<unknown>;
  getTransactions(filters: Partial<TransactionFilters>): Promise<Transaction[]>;
}
