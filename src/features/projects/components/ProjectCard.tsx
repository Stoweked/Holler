// src/features/projects/components/ProjectCard.tsx
import { Group, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { Project } from "@/features/projects/types/project";
import Link from "next/link";
import classes from "./Projects.module.css";
import { ArrowRight01Icon } from "hugeicons-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <UnstyledButton
      component={Link}
      href={`/dashboard?project=${encodeURIComponent(project.name)}`}
      className={classes.item}
    >
      <Stack justify="space-between" h="100%">
        <Stack gap={4}>
          <Title order={5} lineClamp={2} lh={1.2}>
            {project.name}
          </Title>
          <Text size="sm" c="dimmed">
            {project.address}
          </Text>
        </Stack>
        <Group justify="flex-end" mt="md">
          <ArrowRight01Icon size={24} color="var(--mantine-color-lime-5)" />
        </Group>
      </Stack>
    </UnstyledButton>
  );
}
