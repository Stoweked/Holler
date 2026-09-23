import type { AppServices } from "@/lib/services/contracts";
import type { Contact } from "@/features/contacts/types/contact";
import type { Project } from "@/features/projects/types/project";
import type { Waiver } from "@/features/waivers/types/waiver";
import { mockProjects } from "@/mockData/mockProjects";
import { getTransactions } from "./get-transactions";

export interface PreviewData {
  contacts?: Contact[];
  projects?: Project[];
  waivers?: Waiver[];
}

/** Read-only design fixtures. Never use this adapter as a production fallback. */
export function createPreviewServices(seed: PreviewData = {}): AppServices {
  const contacts = structuredClone(seed.contacts ?? []);
  const projects = structuredClone(seed.projects ?? mockProjects);
  const waivers = structuredClone(seed.waivers ?? []);
  const message = "Saving is unavailable in this read-only design preview.";
  const unavailableResult = async () => ({ error: message });
  const unavailable = async (): Promise<never> => { throw new Error(message); };
  return {
    getContacts: async () => structuredClone(contacts),
    getSuggestedContacts: async () => [],
    searchGlobalContacts: async (term) => {
      if (term.trim().length < 2) return [];
      const query = term.trim().toLowerCase();
      return structuredClone(contacts.filter((contact) =>
        [contact.email, contact.username, "full_name" in contact ? contact.full_name : undefined,
          "business_name" in contact ? contact.business_name : undefined]
          .some((value) => value?.toLowerCase().includes(query))));
    },
    addContact: unavailableResult,
    removeContact: unavailableResult,
    toggleFavorite: unavailableResult,
    inviteContact: unavailableResult,
    updateContactProjects: unavailableResult,
    getProjects: async () => structuredClone(projects),
    createProject: unavailableResult,
    updateProject: unavailableResult,
    archiveProject: unavailableResult,
    getWaivers: async () => structuredClone(waivers.filter((waiver) => !waiver.archived)),
    saveWaiver: unavailable,
    archiveWaiver: unavailable,
    getBusinessProfile: async () => null,
    updateBusinessProfile: unavailable,
    checkBusinessUsernameExists: unavailable,
    updateProfile: unavailable,
    uploadAvatar: unavailable,
    submitFeedback: unavailable,
    getTransactions,
  };
}
