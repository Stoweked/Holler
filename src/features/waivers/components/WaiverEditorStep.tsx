import { Button, Group, Stack, TextInput } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { Editor } from "@tiptap/react";

interface WaiverEditorStepProps {
  waiverTitle: string;
  onWaiverTitleChange: (newTitle: string) => void;
  editor: Editor | null;
  onCancel: () => void;
  onSave: () => void;
}

export default function WaiverEditorStep({
  waiverTitle,
  onWaiverTitleChange,
  editor,
  onCancel,
  onSave,
}: WaiverEditorStepProps) {
  return (
    <Stack gap="lg">
      <TextInput
        label="Title"
        size="lg"
        radius="md"
        placeholder="Enter waiver title"
        aria-label="Lien waver title"
        value={waiverTitle}
        onChange={(event) => onWaiverTitleChange(event.currentTarget.value)}
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

      <Group justify="flex-end">
        <Button
          aria-label="Save"
          size="lg"
          variant="default"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button aria-label="Save" size="lg" onClick={onSave}>
          Save
        </Button>
      </Group>
    </Stack>
  );
}
