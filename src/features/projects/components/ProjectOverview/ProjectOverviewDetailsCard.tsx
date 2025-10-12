// src/features/projects/components/ProjectDetailsCard.tsx
"use client";

import { useState } from "react";
import { Paper } from "@mantine/core";
import ProjectDetailsView from "./ProjectDetailsView";
import ProjectDetailsForm from "./ProjectDetailsForm";
import { Project } from "../../types/project";

interface ProjectDetailsCardProps {
  project: Project;
}

export default function ProjectOverviewDetailsCard({
  project,
}: ProjectDetailsCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Paper withBorder radius="lg" shadow="xs" p="md">
      {isEditing ? (
        <ProjectDetailsForm
          project={project}
          onCancel={() => setIsEditing(false)}
          onSaveSuccess={() => setIsEditing(false)}
        />
      ) : (
        <ProjectDetailsView
          project={project}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </Paper>
  );
}
