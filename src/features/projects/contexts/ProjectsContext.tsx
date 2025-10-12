// src/features/projects/contexts/ProjectsContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { Project } from "@/features/projects/types/project";
import { useDisclosure } from "@mantine/hooks";
import { Profile } from "@/features/account/types/account";
import { Business } from "@/features/business/types/business";

// Define an interface for the raw data structure from Supabase
interface RawProjectData extends Omit<Project, "profiles" | "businesses"> {
  profiles: { profiles: Profile }[];
  businesses: { businesses: Business }[];
}

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  refetchProjects: () => Promise<void>;
  // For the drawer that lists all projects
  listDrawerOpened: boolean;
  openListDrawer: () => void;
  closeListDrawer: () => void;
  // For the new project overview drawer
  overviewDrawerOpened: boolean;
  openOverviewDrawer: (project: Project) => void;
  closeOverviewDrawer: () => void;
  selectedProject: Project | null;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [listDrawerOpened, { open: openListDrawer, close: closeListDrawer }] =
    useDisclosure(false);
  const [overviewDrawerOpened, { open: openOverview, close: closeOverview }] =
    useDisclosure(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const supabase = createClient();

  const closeOverviewDrawer = useCallback(() => {
    setSelectedProject(null);
    closeOverview();
  }, [closeOverview]); // `setSelectedProject` is stable and can be omitted, but adding it satisfies the linter

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select(
        `
        *,
        profiles:project_profiles(profiles(*)),
        businesses:project_businesses(businesses(*))
      `
      )
      .eq("archived", false);

    if (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } else if (data) {
      const formattedData = data.map((p: RawProjectData) => ({
        ...p,
        profiles: p.profiles.map(
          (item: { profiles: Profile }) => item.profiles
        ),
        businesses: p.businesses.map(
          (item: { businesses: Business }) => item.businesses
        ),
      }));
      setProjects(formattedData);

      // Use a functional update to get the latest `selectedProject` state
      // without needing it in the dependency array.
      setSelectedProject((currentSelectedProject) => {
        if (!currentSelectedProject) {
          return null; // Nothing was selected, so do nothing.
        }

        const updatedSelectedProject = formattedData.find(
          (p) => p.id === currentSelectedProject.id
        );

        if (updatedSelectedProject) {
          return updatedSelectedProject; // Return the updated project data
        }

        // The project no longer exists in the list (e.g., archived), so close the drawer.
        closeOverviewDrawer();
        return null;
      });
    }
    setLoading(false);
  }, [supabase, closeOverviewDrawer]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openOverviewDrawer = useCallback(
    (project: Project) => {
      setSelectedProject(project);
      openOverview();
    },
    [openOverview]
  );

  const value = useMemo(
    () => ({
      projects,
      loading,
      refetchProjects: fetchProjects,
      listDrawerOpened,
      openListDrawer,
      closeListDrawer,
      overviewDrawerOpened,
      openOverviewDrawer,
      closeOverviewDrawer,
      selectedProject,
    }),
    [
      projects,
      loading,
      fetchProjects,
      listDrawerOpened,
      openListDrawer,
      closeListDrawer,
      overviewDrawerOpened,
      openOverviewDrawer,
      closeOverviewDrawer,
      selectedProject,
    ]
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}
