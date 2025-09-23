// src/features/projects/components/ProjectEditorStep.tsx
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface ProjectEditorStepProps {
  form: UseFormReturnType<{ name: string; address: string }>;
  onSave: () => void;
  onArchive: () => void;
  isSaving: boolean;
  isArchiving: boolean;
  editorMode: "new" | "edit";
}

export default function ProjectEditorStep({
  form,
  onSave,
  onArchive,
  isSaving,
  isArchiving,
  editorMode,
}: ProjectEditorStepProps) {
  return (
    <Stack gap="lg">
      <TextInput
        required
        label="Project name"
        size="lg"
        radius="md"
        placeholder="Enter project name"
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Address"
        size="lg"
        radius="md"
        placeholder="Enter project address"
        {...form.getInputProps("address")}
      />
      <Group justify="space-between" wrap="nowrap">
        {editorMode === "edit" && (
          <Button
            aria-label="Archive project"
            size="lg"
            color="red"
            variant="outline"
            style={{ flexShrink: 0 }}
            onClick={onArchive}
            loading={isArchiving}
          >
            Archive
          </Button>
        )}
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
