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
import { mockProjects } from "@/mockData/mockProjects";

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  refetchProjects: () => void;
  drawerOpened: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const supabase = createClient();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    // TODO: Replace with actual Supabase call
    setProjects(mockProjects);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const value = useMemo(
    () => ({
      projects,
      loading,
      refetchProjects: fetchProjects,
      drawerOpened,
      openDrawer,
      closeDrawer,
    }),
    [projects, loading, fetchProjects, drawerOpened, openDrawer, closeDrawer]
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
