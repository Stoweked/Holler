"use client";

import { Drawer } from "@mantine/core";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface LienWaiversDrawerProps {
  opened: boolean;
  close: () => void;
}

const content = `
  <h2>Lien Waiver Agreement</h2>
  <p>This Conditional Waiver and Release of Lien is made and entered into as of [Date], by and between <strong>[Your Company Name]</strong> ("Releasor") and <strong>[Customer Name]</strong> ("Owner").</p>
  <p>For and in consideration of the progress payment of [Payment Amount], the receipt and sufficiency of which is hereby acknowledged, Releasor does hereby waive and release any and all liens, claims, or rights of lien on the above-described property and improvements thereon.</p>
  <p>This waiver is conditional upon clear and final payment of the amount stated above. Until such payment is received and cleared, this waiver is void.</p>
  <p><strong>IN WITNESS WHEREOF</strong>, the Releasor has executed this Conditional Waiver and Release of Lien on the date first above written.</p>
`;

export default function LienWaiversDrawer({
  opened,
  close,
}: LienWaiversDrawerProps) {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content,
    immediatelyRender: false,
  });

  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Lien Waivers"
        padding="lg"
        size="lg"
      >
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
      </Drawer>
    </div>
  );
}
