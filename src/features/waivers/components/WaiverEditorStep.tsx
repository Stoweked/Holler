// features/waivers/components/WaiverEditorStep.tsx
import { Button, Group, Stack, TextInput, Select, Text } from "@mantine/core";
import { Editor } from "@tiptap/react";
import { WaiverEditor } from "./WaiverEditor";

interface WaiverEditorStepProps {
  waiverTitle: string;
  onWaiverTitleChange: (newTitle: string) => void;
  waiverType: "conditional" | "unconditional";
  onWaiverTypeChange: (type: "conditional" | "unconditional") => void;
  waiverPaymentType: "progress" | "final";
  onWaiverPaymentTypeChange: (paymentType: "progress" | "final") => void;
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
  waiverPaymentType,
  onWaiverPaymentTypeChange,
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

      <Stack gap={4}>
        <Select
          label="Waiver Type"
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
        <Text c="dimmed" size="xs">
          Conditional waivers are effective upon payment, while unconditional
          waivers are effective immediately.
        </Text>
      </Stack>

      <Stack gap={4}>
        <Select
          label="Payment Type"
          size="lg"
          radius="md"
          placeholder="Select payment type"
          data={[
            { value: "progress", label: "Progress" },
            { value: "final", label: "Final" },
          ]}
          value={waiverPaymentType}
          onChange={(value) =>
            onWaiverPaymentTypeChange(value as "progress" | "final")
          }
        />
        <Text c="dimmed" size="xs">
          Progress payments are for ongoing work, while final payments are for
          completed projects.
        </Text>
      </Stack>

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
