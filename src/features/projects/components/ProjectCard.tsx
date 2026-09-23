// src/features/projects/components/ProjectCard.tsx
import {
  ActionIcon,
  Badge,
  Group,
  Progress,
  Stack,
  ThemeIcon,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { ArrowRight01Icon, House03Icon } from "hugeicons-react";
import classes from "./Projects.module.css";
import { Project } from "../types/project";
import React from "react";

export interface ProjectProgressSegment {
  label: string;
  value: number;
  color: string;
  description?: string;
}

export interface ProjectCardProps {
  progress?: ProjectProgressSegment[];
  project: Project;
  onClick?: (project: Project) => void;
  isSelectionMode?: boolean;
}

function ProjectCard({
  project,
  onClick,
  isSelectionMode = false,
  progress = [],
}: ProjectCardProps) {
  const tooltipLabel = isSelectionMode ? "Select project" : "View project";

  const content = (
    <Stack gap="lg">
      <Group justify="space-between" wrap="nowrap">
        <Group wrap="nowrap" gap="xs">
          <ThemeIcon size={44} radius="xl" variant="default">
            <House03Icon size={28} />
          </ThemeIcon>
          <Stack gap={8} style={{ overflow: "hidden" }}>
            {project.status && <Badge size="sm" variant="dot" color={project.status === "completed" ? "gray" : project.status === "on hold" ? "yellow" : "lime"}>
              {project.status}
            </Badge>}
            <Title order={4} lineClamp={1} lh={1.2}>
              {project.name}
            </Title>
          </Stack>
        </Group>

        <Tooltip label={tooltipLabel} position="left">
          <ActionIcon
            component="div"
            variant="subtle"
            size="xl"
            radius="xl"
            aria-label={tooltipLabel}
          >
            <ArrowRight01Icon size={32} />
          </ActionIcon>
        </Tooltip>
      </Group>

      {progress.length > 0 && <Progress.Root size={20} radius={99}>
        {progress.map((segment) => (
          <Tooltip key={segment.label} label={segment.description ?? segment.label}>
            <Progress.Section value={segment.value} color={segment.color}>
              <Progress.Label>{segment.label}</Progress.Label>
            </Progress.Section>
          </Tooltip>
        ))}
      </Progress.Root>}
    </Stack>
  );

  return (
    <UnstyledButton
      key={project.id}
      className={classes.item}
      onClick={() => onClick?.(project)}
    >
      {content}
    </UnstyledButton>
  );
}

export default React.memo(ProjectCard);
