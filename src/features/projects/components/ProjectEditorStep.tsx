// src/features/projects/components/ProjectEditorStep.tsx
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface ProjectEditorStepProps {
  form: UseFormReturnType<{ name: string; address: string }>;
  onSave: () => void;
  isSaving: boolean;
}

export default function ProjectEditorStep({
  form,
  onSave,
  isSaving,
}: ProjectEditorStepProps) {
  return (
    <Stack gap="lg">
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
      <Group justify="space-between" wrap="nowrap">
        <Group w="100%" justify="flex-end">
          <Button
            aria-label="Save project"
            size="lg"
            onClick={onSave}
            style={{ flexShrink: 0 }}
            loading={isSaving}
          >
            Save
          </Button>
        </Group>
      </Group>
    </Stack>
  );
}
