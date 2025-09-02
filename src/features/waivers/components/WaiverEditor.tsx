// features/waivers/components/WaiverEditor.tsx
import { RichTextEditor } from "@mantine/tiptap";
import { Editor } from "@tiptap/react";

interface WaiverEditorProps {
  editor: Editor | null;
}

export function WaiverEditor({ editor }: WaiverEditorProps) {
  return (
    <RichTextEditor
      editor={editor}
      styles={{
        root: {
          fontSize: "var(--mantine-font-size-lg)",
          borderRadius: "var(--mantine-radius-md)",
        },
        content: {
          minHeight: 200,
          borderRadius: "var(--mantine-radius-md)",
        },
        toolbar: {
          borderTopLeftRadius: "var(--mantine-radius-md)",
          borderTopRightRadius: "var(--mantine-radius-md)",
        },
      }}
    >
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
  );
}
