"use client";
import { useProjects } from "../contexts/ProjectsContext";
import { ProjectsGridView } from "./ProjectsGridView";

export default function ProjectsGrid() {
  const { projects, loading, openOverviewDrawer } = useProjects();
  return <ProjectsGridView projects={projects} loading={loading} onProjectClick={openOverviewDrawer} />;
}
