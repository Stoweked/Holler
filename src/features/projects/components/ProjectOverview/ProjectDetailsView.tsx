// src/features/projects/components/ProjectDetailsView.tsx
import { Stack, Title, Text, Button, Group } from "@mantine/core";
import { Project } from "../../types/project";
import { useFormattedDate } from "@/lib/hooks/useFormattedDate";
import { Calendar02Icon } from "hugeicons-react";

interface ProjectDetailsViewProps {
  project: Project;
  onEdit: () => void;
}

export default function ProjectDetailsView({
  project,
  onEdit,
}: ProjectDetailsViewProps) {
  const formattedStartDate = useFormattedDate(project.start_date);
  const formattedEndDate = useFormattedDate(project.end_date);

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
              Project
            </Text>
            <Title order={3}>{project.name}</Title>
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

      {(project.start_date || project.end_date) && (
        <Group grow>
          {project.start_date && (
            <Group gap="sm" wrap="nowrap">
              <Calendar02Icon size={20} color="gray" />
              <Stack gap={0}>
                <Text size="sm" c="dimmed">
                  Start date
                </Text>
                <Text fw={500}>{formattedStartDate}</Text>
              </Stack>
            </Group>
          )}

          {project.end_date && (
            <Group gap="sm" wrap="nowrap">
              <Calendar02Icon size={20} color="gray" />
              <Stack gap={0}>
                <Text size="sm" c="dimmed">
                  End date
                </Text>
                <Text fw={500}>{formattedEndDate}</Text>
              </Stack>
            </Group>
          )}
        </Group>
      )}
    </Stack>
  );
}
