// src/features/projects/components/ProjectDetailsForm.tsx
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
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("address", values.address);
    if (values.start_date) {
      formData.append("start_date", values.start_date.toISOString());
    }
    if (values.end_date) {
      formData.append("end_date", values.end_date.toISOString());
    }

    const result = await updateProject(formData, project.id);

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
        <Group justify="flex-end" grow>
          <Button variant="default" size="lg" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" size="lg" loading={loading}>
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
