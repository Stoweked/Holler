// src/features/projects/components/ProjectsDrawer.tsx
"use client";

import { ActionIcon, Drawer, Group, Space, Text, Tooltip } from "@mantine/core";
import { ArrowLeft02Icon } from "hugeicons-react";
import ProjectInitialStep from "./ProjectInitialStep";
import ProjectEditorStep from "./ProjectEditorStep";
import { useProject } from "../hooks/useProject";

interface ProjectsDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function ProjectsDrawer({ opened, close }: ProjectsDrawerProps) {
  const {
    step,
    editorMode,
    form,
    handleCreateNew,
    handleEditProject,
    handleBack,
    handleClose,
    handleSave,
    handleArchive,
    projects,
    isSaving,
    isArchiving,
  } = useProject(close);

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
        <Text>{editorMode === "new" ? "New project" : "Edit project"}</Text>
      </Group>
    );

  return (
    <Drawer
      zIndex={300}
      opened={opened}
      onClose={handleClose}
      title={drawerTitle}
      padding="lg"
      size="lg"
    >
      {step === "initial" && (
        <ProjectInitialStep
          onNew={handleCreateNew}
          onEditProject={handleEditProject}
          projects={projects}
        />
      )}
      {step === "editor" && (
        <ProjectEditorStep
          form={form}
          onSave={handleSave}
          isSaving={isSaving}
          onArchive={handleArchive}
          isArchiving={isArchiving}
          editorMode={editorMode}
        />
      )}
      <Space h={100} />
    </Drawer>
  );
}
