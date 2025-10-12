// src/features/projects/components/ProjectsDrawer.tsx
"use client";

import { ActionIcon, Drawer, Group, Space, Text, Tooltip } from "@mantine/core";
import { ArrowLeft02Icon } from "hugeicons-react";
import ProjectInitialStep from "./ProjectInitialStep";
import ProjectEditorStep from "./ProjectEditorStep";
import { useProjectsDrawer } from "../hooks/useProjectsDrawer";
import { useProjects } from "../contexts/ProjectsContext";
import { Project } from "../types/project";

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
        <ProjectInitialStep
          onNew={handleCreateNew}
          onProjectClick={handleProjectClick}
          projects={projects}
        />
      )}
      {step === "editor" && (
        <ProjectEditorStep
          form={form}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
      <Space h={100} />
    </Drawer>
  );
}
