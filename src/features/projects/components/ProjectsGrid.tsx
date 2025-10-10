// src/features/projects/components/ProjectsGrid.tsx
"use client";

import { SimpleGrid, Stack, Title, Text, Center } from "@mantine/core";
import { useProjects } from "@/features/projects/contexts/ProjectsContext";
import ProjectCard from "./ProjectCard";
import { House03Icon } from "hugeicons-react";

export default function ProjectsGrid() {
  const { projects, loading } = useProjects();

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
    <SimpleGrid cols={{ base: 1, xs: 2, lg: 3, xl: 4 }} p="md" spacing="md">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </SimpleGrid>
  );
}
