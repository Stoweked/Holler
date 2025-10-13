// src/features/projects/components/ProjectOverview/ProjectDetailsForm.tsx
"use client";

import { Button, Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { Project } from "../../types/project";
import { updateProject } from "../../actions";
import { useProjects } from "../../contexts/ProjectsContext";
import ProjectFormInputs from "../ProjectFormInputs";
import dayjs from "dayjs";

interface ProjectDetailsFormProps {
  project: Project;
  onCancel: () => void;
  onSaveSuccess: () => void;
}

export default function ProjectDetailsForm({
  project,
  onCancel,
  onSaveSuccess,
}: ProjectDetailsFormProps) {
  const [loading, setLoading] = useState(false);
  const { refetchProjects } = useProjects();
  const form = useForm({
    initialValues: {
      name: project.name,
      address: project.address,
      start_date: project.start_date
        ? dayjs(project.start_date).toDate()
        : null,
      end_date: project.end_date ? dayjs(project.end_date).toDate() : null,
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);

    const projectData = {
      name: values.name,
      address: values.address,
      start_date: values.start_date
        ? dayjs(values.start_date).toISOString()
        : null,
      end_date: values.end_date ? dayjs(values.end_date).toISOString() : null,
    };

    const result = await updateProject(projectData, project.id);

    if (result?.error) {
      notifications.show({
        title: "Error",
        message: result.error,
        color: "red",
      });
    } else {
      notifications.show({
        title: "Project saved",
        message: "Your project has been saved successfully.",
        color: "lime",
      });
      await refetchProjects();
      onSaveSuccess();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Title order={5}>Edit project</Title>
        <ProjectFormInputs form={form} />
        <Stack w="100%">
          <Button type="submit" size="lg" loading={loading}>
            Save
          </Button>
          <Button variant="default" size="lg" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
