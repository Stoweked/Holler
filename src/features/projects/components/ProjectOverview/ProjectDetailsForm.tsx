// src/features/projects/components/ProjectDetailsForm.tsx
"use client";

import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { Project } from "../../types/project";
import { updateProject } from "../../actions";
import { useProjects } from "../../contexts/ProjectsContext";

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
        <TextInput
          required
          label="Project name"
          size="lg"
          radius="lg"
          placeholder="Enter project name"
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Address"
          size="lg"
          radius="lg"
          placeholder="Enter project address"
          {...form.getInputProps("address")}
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
