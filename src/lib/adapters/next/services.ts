import type { AppServices } from "@/lib/services/contracts";
import { browserServices } from "../supabase/browser-services";
import { getTransactions } from "../fixtures/get-transactions";
import { updateProfile } from "../supabase/actions/account/update-profile";
import { uploadAvatar } from "../supabase/actions/account/upload-avatar";
import { checkBusinessUsernameExists } from "../supabase/actions/business/check-business-username";
import { addContact } from "../supabase/actions/contacts/add-contact";
import { getContacts } from "../supabase/actions/contacts/get-contacts";
import { getSuggestedContacts } from "../supabase/actions/contacts/get-suggested-contacts";
import { inviteContact } from "../supabase/actions/contacts/invite-contact";
import { removeContact } from "../supabase/actions/contacts/remove-contact";
import { searchGlobalContacts } from "../supabase/actions/contacts/search-global-contacts";
import { toggleFavorite } from "../supabase/actions/contacts/toggle-favorite";
import { updateContactProjects } from "../supabase/actions/contacts/update-contact-projects";
import { submitFeedback } from "../supabase/actions/feedback/submit-feedback";
import { archiveProject } from "../supabase/actions/projects/archive-project";
import { createProject } from "../supabase/actions/projects/create-project";
import { updateProject } from "../supabase/actions/projects/update-project";

/** Transitional composition: Next server actions plus Supabase browser operations. */
export const services: AppServices = {
  ...browserServices,
  getTransactions,
  updateProfile,
  uploadAvatar,
  checkBusinessUsernameExists,
  addContact,
  getContacts,
  getSuggestedContacts,
  inviteContact,
  removeContact,
  searchGlobalContacts,
  toggleFavorite,
  updateContactProjects,
  submitFeedback,
  archiveProject,
  createProject,
  updateProject
};
