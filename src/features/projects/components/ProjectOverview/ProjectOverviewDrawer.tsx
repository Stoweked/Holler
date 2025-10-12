// src/features/projects/components/ProjectOverview/ProjectOverviewDrawer.tsx
"use client";

import { Button, CheckIcon, Drawer, Space, Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AlertCircleIcon } from "hugeicons-react";
import { useState } from "react";
import { Project } from "../../types/project";
import ProjectOverviewDetailsCard from "./ProjectOverviewDetailsCard";
import ProjectOverviewContacts from "./ProjectOverviewContacts";
import ProjectOverviewStats from "./ProjectOverviewStats";
import { useProjects } from "../../contexts/ProjectsContext";
import { archiveProject } from "../../actions";
import { modals } from "@mantine/modals";

interface ProjectOverviewDrawerProps {
  project: Project | null;
  opened: boolean;
  onClose: () => void;
}

export default function ProjectOverviewDrawer({
  project,
  opened,
  onClose,
}: ProjectOverviewDrawerProps) {
  const [isArchiving, setIsArchiving] = useState(false);
  const { refetchProjects } = useProjects();

  if (!project) {
    return null;
  }

  const handleArchive = async () => {
    setIsArchiving(true);
    const result = await archiveProject(project.id);

    if (result?.error) {
      notifications.show({
        title: "Error",
        message: result.error,
        color: "red",
        icon: <AlertCircleIcon size={18} />,
      });
    } else {
      notifications.show({
        title: "Project archived",
        message: "Your project has been archived.",
        color: "lime",
        icon: <CheckIcon size={16} />,
      });
      await refetchProjects();
      onClose(); // Close the drawer on success
    }
    setIsArchiving(false);
  };

  //Archive confirmation modal
  const confirmArchive = () =>
    modals.openConfirmModal({
      title: "Archive project",
      centered: true,
      withCloseButton: true,
      children: (
        <Text size="sm">
          Are you sure you want to archive this project? All contacts and
          transactions will still be available in your account.
        </Text>
      ),
      labels: { confirm: "Confirm archive", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => handleArchive(),
    });

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Project overview"
      padding="md"
      size="md"
      position="left"
    >
      <Stack
        justify="space-between"
        style={{ minHeight: "calc(100vh - 60px)" }}
      >
        <Stack gap="lg">
          <ProjectOverviewDetailsCard project={project} />
          <ProjectOverviewStats project={project} />
          <ProjectOverviewContacts project={project} />
        </Stack>

        <Button
          color="red"
          size="lg"
          onClick={confirmArchive}
          loading={isArchiving}
          fullWidth
          mt="lg"
        >
          Archive project
        </Button>
      </Stack>
      <Space h={100} />
    </Drawer>
  );
}
