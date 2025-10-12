// src/features/projects/components/ProjectsGrid.tsx
"use client";

import { Stack, Title, Text, Center, Group, ScrollArea } from "@mantine/core";
import { useProjects } from "@/features/projects/contexts/ProjectsContext";
import { House03Icon } from "hugeicons-react";
import ProjectCard from "./ProjectCard";
import classes from "./Projects.module.css";

export default function ProjectsGrid() {
  const { projects, loading, openOverviewDrawer } = useProjects();

  if (loading) {
    return null; // Or a skeleton loader
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
              onClick={openOverviewDrawer}
            />
          ))}
        </Group>
      </ScrollArea.Autosize>
    </Group>
  );
}
