// src/features/projects/components/ProjectSelectItem.tsx
import { Project } from "@/features/projects/types/project";
import { Group, Stack, Title } from "@mantine/core";
import { PlusSignIcon } from "hugeicons-react";
import React from "react";

interface ProjectSelectItemProps {
  project: Project;
}

function ProjectSelectItem({ project }: ProjectSelectItemProps) {
  return (
    <Group wrap="nowrap" gap="xs" justify="space-between">
      <Stack gap={8}>
        <Stack gap={4} style={{ overflow: "hidden" }}>
          <Title order={6} lineClamp={2} lh={1.2}>
            {project.name}
          </Title>
        </Stack>
      </Stack>

      <PlusSignIcon size={20} color="gray" style={{ flexShrink: 0 }} />
    </Group>
  );
}

export default React.memo(ProjectSelectItem);
