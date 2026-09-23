import { createClient } from "@/lib/supabase/client";
import type { AppServices } from "@/lib/services/contracts";
import type { Profile } from "@/features/account/types/account";
import type { Business } from "@/features/business/types/business";
import type { Project } from "@/features/projects/types/project";

interface ProjectRow extends Omit<Project, "profiles" | "businesses"> {
  profiles: { profiles: Profile }[];
  businesses: { businesses: Business }[];
}

// Create the SDK client only when an operation runs, never when the UI is imported.
export const browserServices: Pick<AppServices,
  "getProjects" | "getWaivers" | "saveWaiver" | "archiveWaiver" | "getBusinessProfile" | "updateBusinessProfile"
> = {
  async getProjects() {
    const { data, error } = await createClient().from("projects")
      .select("*, profiles:project_profiles(profiles(*)), businesses:project_businesses(businesses(*))")
      .eq("archived", false);
    if (error) throw new Error("Failed to load projects.");
    return (data as ProjectRow[]).map((project) => ({
      ...project,
      profiles: (project.profiles ?? []).map((item) => item.profiles),
      businesses: (project.businesses ?? []).map((item) => item.businesses),
    }));
  },
  async getWaivers() {
    const { data, error } = await createClient().from("lien_waivers")
      .select("*").eq("archived", false).order("created_at", { ascending: false });
    if (error) throw new Error("Failed to load waivers.");
    return data ?? [];
  },
  async saveWaiver(input, id) {
    const client = createClient();
    const { data: { user }, error: authError } = await client.auth.getUser();
    if (authError || !user) throw new Error("You must be logged in to save a waiver.");
    if (id) {
      const { error } = await client.from("lien_waivers")
        .update({ ...input, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) throw new Error("Failed to save the waiver.");
      return id;
    }
    const { data, error } = await client.from("lien_waivers")
      .insert([{ ...input, user_id: user.id }]).select("id").single();
    if (error) throw new Error("Failed to save the waiver.");
    return data.id;
  },
  async archiveWaiver(id) {
    const { error } = await createClient().from("lien_waivers").update({ archived: true }).eq("id", id);
    if (error) throw new Error("Failed to archive the waiver.");
  },
  async getBusinessProfile() {
    const client = createClient();
    const { data: { user }, error: authError } = await client.auth.getUser();
    if (authError || !user) throw new Error("You must be logged in to load a business profile.");
    const { data: role, error: roleError } = await client.from("business_admins")
      .select("*").eq("user_id", user.id).limit(1).maybeSingle();
    if (roleError) throw new Error("Failed to load business membership.");
    if (!role) return null;
    const { data: business, error } = await client.from("businesses").select("*").eq("id", role.business_id).single();
    if (error) throw new Error("Failed to load business profile.");
    return { business, role };
  },
  async updateBusinessProfile(id, input) {
    const { error } = await createClient().from("businesses").update(input).eq("id", id);
    if (error) throw new Error("Failed to update business profile.");
  },
};
