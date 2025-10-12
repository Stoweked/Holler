// src/features/projects/hooks/useProjectDrawer.ts
import { useState } from "react";
import { useForm } from "@mantine/form";
import { Project } from "../types/project";
import { notifications } from "@mantine/notifications";
import { CheckIcon } from "@mantine/core";
import { AlertCircleIcon } from "hugeicons-react";
import { useProjects } from "@/features/projects/contexts/ProjectsContext";
import { createProject } from "../actions/create-project";
import { updateProject } from "../actions/update-project";
import { archiveProject } from "../actions/archive-project";

type ProjectStep = "initial" | "editor";
type EditorMode = "new" | "edit";

export function useProjectsDrawer(closeDrawer: () => void) {
  const [step, setStep] = useState<ProjectStep>("initial");
  const [editorMode, setEditorMode] = useState<EditorMode>("new");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  const { projects, refetchProjects } = useProjects();

  const form = useForm({
    initialValues: {
      name: "",
      address: "",
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
    },
  });

  const handleCreateNew = () => {
    form.reset();
    setSelectedProject(null);
    setEditorMode("new");
    setStep("editor");
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    form.setValues({
      name: project.name,
      address: project.address,
    });
    setEditorMode("edit");
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
      setSelectedProject(null);
    }, 200);
  };

  const handleSave = async () => {
    if (form.validate().hasErrors) return;

    setIsSaving(true);
    const { name, address } = form.values;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);

    let result;
    if (editorMode === "edit" && selectedProject) {
      result = await updateProject(formData, selectedProject.id);
    } else {
      result = await createProject(formData);
    }

    if (result?.error) {
      notifications.show({
        title: "Error",
        message: result.error,
        color: "red",
        icon: <AlertCircleIcon size={18} />,
      });
    } else {
      notifications.show({
        title: "Project saved",
        message: "Your project has been saved successfully.",
        color: "lime",
        icon: <CheckIcon size={16} />,
      });
      refetchProjects();
      form.reset();
      handleBack();
    }

    setIsSaving(false);
  };

  const handleArchive = async () => {
    if (selectedProject) {
      setIsArchiving(true);
      const result = await archiveProject(selectedProject.id);
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
        refetchProjects();
        handleClose();
      }
      setIsArchiving(false);
    }
  };

  return {
    step,
    setStep,
    editorMode,
    form,
    projects,
    isSaving,
    isArchiving,
    handleCreateNew,
    handleEditProject,
    handleBack,
    handleClose,
    handleSave,
    handleArchive,
  };
}
