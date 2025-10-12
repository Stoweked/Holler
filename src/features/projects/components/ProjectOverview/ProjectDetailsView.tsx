// src/features/projects/components/ProjectDetailsView.tsx
import { Stack, Title, Text, Button, Group } from "@mantine/core";
import { Project } from "../../types/project";
import { useFormattedDate } from "@/lib/hooks/useFormattedDate";
import { Calendar02Icon, House03Icon, Location01Icon } from "hugeicons-react";

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
          <Group gap="sm" wrap="nowrap">
            <House03Icon size={20} color="gray" />
            <Title order={3}>{project.name}</Title>
          </Group>
        ) : null}

        {project.address ? (
          <Group gap="sm" wrap="nowrap">
            <Location01Icon size={20} color="gray" />
            <Stack gap={0}>
              <Text size="sm" c="dimmed">
                Address
              </Text>
              <Text>{project.address}</Text>
            </Stack>
          </Group>
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
