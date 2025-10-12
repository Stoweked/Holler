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

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  const content = (
    <Stack gap="lg">
      <Group justify="space-between" wrap="nowrap">
        <Group wrap="nowrap" gap="xs">
          <ThemeIcon size={44} radius="xl" variant="default">
            <House03Icon size={28} />
          </ThemeIcon>
          <Stack gap={8} style={{ overflow: "hidden" }}>
            <Badge size="sm" variant="dot" color="lime">
              Active
            </Badge>
            <Title order={4} lineClamp={1} lh={1.2}>
              {project.name}
            </Title>
          </Stack>
        </Group>

        <Tooltip label={"View project"} position="left">
          <ActionIcon
            component="div"
            variant="subtle"
            size="xl"
            radius="xl"
            aria-label={"View project"}
          >
            <ArrowRight01Icon size={32} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Progress.Root size={20}>
        <Tooltip label="Received $3,534">
          <Progress.Section value={42} color="green">
            <Progress.Label>Received</Progress.Label>
          </Progress.Section>
        </Tooltip>

        <Tooltip label="Sent $2,834">
          <Progress.Section value={20} color="blue">
            <Progress.Label>Sent</Progress.Label>
          </Progress.Section>
        </Tooltip>

        <Tooltip label="Pending $1,234">
          <Progress.Section value={24} color="pink">
            <Progress.Label>Pending</Progress.Label>
          </Progress.Section>
        </Tooltip>
      </Progress.Root>
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
