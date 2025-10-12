// src/features/projects/components/ProjectOverviewDrawer.tsx
"use client";

import { Drawer, Stack } from "@mantine/core";
import { Project } from "../../types/project";
import ProjectDetailsCard from "./ProjectOverviewDetailsCard";
import ProjectOverviewContacts from "./ProjectOverviewContacts";
import ProjectOverviewStats from "./ProjectOverviewStats";

interface ProjectOverviewDrawerProps {
  project: Project | null;
  opened: boolean;
  onClose: () => void;
}

export default function ProjectOverviewDrawer({
  project,
  opened,
  onClose,
}: ProjectOverviewDrawerProps) {
  if (!project) {
    return null;
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Project overview"
      padding="md"
      size="md"
      position="left"
    >
      <Stack gap="lg">
        <ProjectDetailsCard project={project} />
        <ProjectOverviewStats project={project} />
        <ProjectOverviewContacts project={project} />
      </Stack>
    </Drawer>
  );
}
