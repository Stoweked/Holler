import {
  Button,
  Group,
  Stack,
  TextInput,
  Select, // Import Select component
} from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { Editor } from "@tiptap/react";

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

      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

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
