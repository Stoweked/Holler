// src/features/projects/components/ProjectDetailsView.tsx
import { Stack, Title, Text, Button, Group } from "@mantine/core";
import { Project } from "../../types/project";

interface ProjectDetailsViewProps {
  project: Project;
  onEdit: () => void;
}

export default function ProjectDetailsView({
  project,
  onEdit,
}: ProjectDetailsViewProps) {
  return (
    <Stack>
      <Group justify="space-between">
        <Title order={5}>Details</Title>
        <Button size="compact-sm" variant="subtle" onClick={onEdit}>
          Edit
        </Button>
      </Group>
      <Stack gap="xs">
        {project.name ? (
          <Stack gap={0}>
            <Text size="sm" c="dimmed">
              Project name
            </Text>
            <Title order={2}>{project.name}</Title>
          </Stack>
        ) : null}

        {project.address ? (
          <Stack gap={0}>
            <Text size="sm" c="dimmed">
              Address
            </Text>
            <Text>{project.address}</Text>
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
}
