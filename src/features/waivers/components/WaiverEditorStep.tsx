// features/waivers/components/WaiverEditorStep.tsx
import { Button, Group, Stack, TextInput, Select, Text } from "@mantine/core";
import { Editor } from "@tiptap/react";
import { WaiverEditor } from "./WaiverEditor";

interface WaiverEditorStepProps {
  waiverTitle: string;
  onWaiverTitleChange: (newTitle: string) => void;
  waiverType: "conditional" | "unconditional";
  onWaiverTypeChange: (type: "conditional" | "unconditional") => void;
  editor: Editor | null;
  onSave: () => void;
  onArchive: () => void;
  editorMode: "new" | "edit" | "template";
  isSaving: boolean;
  isArchiving: boolean;
}

export default function WaiverEditorStep({
  waiverTitle,
  onWaiverTitleChange,
  waiverType,
  onWaiverTypeChange,
  editor,
  editorMode,
  onSave,
  onArchive,
  isSaving,
  isArchiving,
}: WaiverEditorStepProps) {
  return (
    <Stack gap="lg">
      <TextInput
        label="Title"
        size="lg"
        radius="md"
        placeholder="Enter waiver title"
        aria-label="Lien waiver title"
        value={waiverTitle}
        onChange={(event) => onWaiverTitleChange(event.currentTarget.value)}
      />

      <Select
        label="Waiver type"
        size="lg"
        radius="md"
        placeholder="Select waiver type"
        data={[
          { value: "conditional", label: "Conditional" },
          { value: "unconditional", label: "Unconditional" },
        ]}
        value={waiverType}
        onChange={(value) =>
          onWaiverTypeChange(value as "conditional" | "unconditional")
        }
      />

      <Stack gap={4}>
        <Text component="label" size="lg" fw={500}>
          Content
        </Text>
        <WaiverEditor editor={editor} />
      </Stack>

      <Group justify="space-between" wrap="nowrap">
        {editorMode === "edit" && (
          <Button
            aria-label="Archive waiver"
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
            aria-label="Save waiver"
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
