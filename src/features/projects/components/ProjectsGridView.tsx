// src/features/projects/components/ProjectsGrid.tsx
"use client";

import { Stack, Title, Text, Center, Group, ScrollArea, Loader } from "@mantine/core";
import type { Project } from "../types/project";
import { House03Icon } from "hugeicons-react";
import ProjectCard from "./ProjectCard";
import classes from "./Projects.module.css";

export interface ProjectsGridViewProps {
  projects: Project[];
  loading?: boolean;
  onProjectClick: (project: Project) => void;
}

export function ProjectsGridView({ projects, loading = false, onProjectClick }: ProjectsGridViewProps) {

  if (loading) {
    return <Center mih={300}><Loader aria-label="Loading projects" /></Center>;
  }

  if (projects.length === 0) {
    return (
      <Center mih={300}>
        <Stack align="center" gap="lg">
          <House03Icon size={40} color="grey" />
          <Stack gap={0} align="center">
            <Title order={4} ta="center">
              No projects yet
            </Title>
            <Text c="dimmed" ta="center">
              Create a project to organize your transactions.
            </Text>
          </Stack>
        </Stack>
      </Center>
    );
  }

  return (
    <Group wrap="nowrap" className={classes.featuredHeader} grow>
      <ScrollArea.Autosize type="never">
        <Group p="md" gap="md" wrap="nowrap">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={onProjectClick}
            />
          ))}
        </Group>
      </ScrollArea.Autosize>
    </Group>
  );
}
