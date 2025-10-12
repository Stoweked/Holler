// src/features/projects/hooks/useProjectsDrawer.tsx
import { useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { CheckIcon } from "@mantine/core";
import { AlertCircleIcon } from "hugeicons-react";
import { useProjects } from "@/features/projects/contexts/ProjectsContext";
import { createProject } from "../actions/create-project";

type ProjectStep = "initial" | "editor";

export function useProjectsDrawer(closeDrawer: () => void) {
  const [step, setStep] = useState<ProjectStep>("initial");
  const [isSaving, setIsSaving] = useState(false);
  const { projects, refetchProjects } = useProjects();

  const form = useForm({
    initialValues: {
      name: "",
      address: "",
      start_date: null as Date | null,
      end_date: null as Date | null,
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
    },
  });

  const handleCreateNew = () => {
    form.reset();
    setStep("editor");
  };

  const handleBack = () => {
    setStep("initial");
  };

  const handleClose = () => {
    closeDrawer();
    setTimeout(() => {
      setStep("initial");
      form.reset();
    }, 200);
  };

  const handleSave = async () => {
    if (form.validate().hasErrors) return;

    setIsSaving(true);
    const { name, address, start_date, end_date } = form.values;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    if (start_date instanceof Date) {
      formData.append("start_date", start_date.toISOString());
    }
    if (end_date instanceof Date) {
      formData.append("end_date", end_date.toISOString());
    }

    const result = await createProject(formData);

    if (result?.error) {
      notifications.show({
        title: "Error",
        message: result.error,
        color: "red",
        icon: <AlertCircleIcon size={18} />,
      });
    } else {
      notifications.show({
        title: "Project created",
        message: "Your project has been created successfully.",
        color: "lime",
        icon: <CheckIcon size={16} />,
      });
      refetchProjects();
      form.reset();
      handleBack();
    }

    setIsSaving(false);
  };

  return {
    step,
    form,
    projects,
    isSaving,
    handleCreateNew,
    handleBack,
    handleClose,
    handleSave,
  };
}
