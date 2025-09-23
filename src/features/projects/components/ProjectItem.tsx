// src/features/projects/components/ProjectItem.tsx
import {
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { ArrowRight01Icon, House03Icon } from "hugeicons-react";
import classes from "./Projects.module.css";
import { Project } from "../types/project";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

dayjs.extend(relativeTime);

interface ProjectItemProps {
  project: Project;
  onEdit: (project: Project) => void;
}

function ProjectItem({ project, onEdit }: ProjectItemProps) {
  return (
    <UnstyledButton
      key={project.id}
      className={classes.item}
      onClick={() => onEdit(project)}
    >
      <Group justify="space-between" wrap="nowrap">
        <Group>
          <ThemeIcon variant="default" radius="xl" size="xl">
            <House03Icon size={20} />
          </ThemeIcon>
          <Stack gap={4} style={{ overflow: "hidden" }}>
            <Title order={5} lineClamp={2} lh={1.2}>
              {project.name}
            </Title>
            <Text size="sm" c="dimmed" w="100%">
              {project.address}
            </Text>
          </Stack>
        </Group>
        <ArrowRight01Icon size={32} color="gray" />
      </Group>
    </UnstyledButton>
  );
}

export default React.memo(ProjectItem);
