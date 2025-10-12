// src/features/projects/components/ProjectsDrawer.tsx
"use client";

import {
  ActionIcon,
  Drawer,
  Group,
  Space,
  Text,
  Tooltip,
  Button,
  Stack,
} from "@mantine/core";
import { ArrowLeft02Icon } from "hugeicons-react";
import { useProjectsDrawer } from "../hooks/useProjectsDrawer";
import { useProjects } from "../contexts/ProjectsContext";
import { Project } from "../types/project";
import ProjectsList from "./ProjectsList";
import ProjectFormInputs from "./ProjectFormInputs";

interface ProjectsDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function ProjectsDrawer({ opened, close }: ProjectsDrawerProps) {
  const { openOverviewDrawer, isSelectionMode, onProjectSelect } =
    useProjects();
  const {
    step,
    form,
    handleCreateNew,
    handleBack,
    handleClose,
    handleSave,
    projects,
    isSaving,
  } = useProjectsDrawer(close);

  const handleProjectClick = (project: Project) => {
    if (isSelectionMode && onProjectSelect) {
      onProjectSelect(project);
      close();
    } else {
      openOverviewDrawer(project);
      close();
    }
  };

  const drawerTitle =
    step === "initial" ? (
      "Projects"
    ) : (
      <Group gap="xs">
        <Tooltip label="Back" position="right">
          <ActionIcon
            onClick={handleBack}
            variant="subtle"
            color="gray"
            aria-label="Go back"
          >
            <ArrowLeft02Icon size={24} />
          </ActionIcon>
        </Tooltip>
        <Text>New project</Text>
      </Group>
    );

  return (
    <Drawer
      zIndex={300}
      opened={opened}
      onClose={handleClose}
      title={drawerTitle}
      padding="lg"
      size="md"
    >
      {step === "initial" && (
        <ProjectsList
          onNew={handleCreateNew}
          onProjectClick={handleProjectClick}
          projects={projects}
        />
      )}
      {step === "editor" && (
        <Stack gap="lg">
          <ProjectFormInputs form={form} />
          <Group justify="flex-end">
            <Button
              aria-label="Save project"
              size="lg"
              fullWidth
              onClick={handleSave}
              loading={isSaving}
            >
              Save project
            </Button>
          </Group>
        </Stack>
      )}
      <Space h={100} />
    </Drawer>
  );
}
