// features/waivers/components/WaiverEditorStep.tsx
import { Button, Group, Stack, TextInput, Select } from "@mantine/core";
import { Editor } from "@tiptap/react";
import { WaiverEditor } from "./WaiverEditor"; // Import the new component

interface WaiverEditorStepProps {
  waiverTitle: string;
  onWaiverTitleChange: (newTitle: string) => void;
  waiverType: "conditional" | "unconditional";
  onWaiverTypeChange: (type: "conditional" | "unconditional") => void;
  editor: Editor | null;
  onSave: () => void;
}

export default function WaiverEditorStep({
  waiverTitle,
  onWaiverTitleChange,
  waiverType,
  onWaiverTypeChange,
  editor,
  onSave,
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

      <WaiverEditor editor={editor} />

      <Group justify="space-between">
        <Button
          aria-label="Delete waiver"
          size="lg"
          color="red"
          variant="outline"
        >
          Delete
        </Button>
        <Button aria-label="Save waiver" size="lg" onClick={onSave}>
          Save
        </Button>
      </Group>
    </Stack>
  );
}
