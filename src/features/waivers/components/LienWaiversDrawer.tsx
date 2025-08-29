"use client";

import { ActionIcon, Drawer, Group, Text, Tooltip } from "@mantine/core";
import { Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ArrowLeft02Icon } from "hugeicons-react";
import { useState } from "react";
import WaiverInitialStep from "./WaiverInitialStep";
import WaiverTemplatesStep from "./WaiverTemplatesStep";
import WaiverEditorStep from "./WaiverEditorStep";

interface LienWaiversDrawerProps {
  opened: boolean;
  close: () => void;
}

interface Waiver {
  id: string;
  title: string;
  lastModified: string;
  content: string;
}

type WaiverStep = "initial" | "templates" | "editor";

export default function LienWaiversDrawer({
  opened,
  close,
}: LienWaiversDrawerProps) {
  const [step, setStep] = useState<WaiverStep>("initial");
  const [previousStep, setPreviousStep] = useState<WaiverStep>("initial");
  const [waiverTitle, setWaiverTitle] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: "",
    immediatelyRender: false,
  });

  const handleCreateNew = () => {
    setWaiverTitle("");
    editor?.commands.setContent("");
    setPreviousStep("initial");
    setStep("editor");
  };

  const handleSelectTemplate = (content: string, name: string) => {
    setWaiverTitle(name);
    editor?.commands.setContent(content);
    setPreviousStep("templates");
    setStep("editor");
  };

  const handleEditWaiver = (waiver: Waiver) => {
    setWaiverTitle(waiver.title);
    editor?.commands.setContent(waiver.content);
    setPreviousStep("initial");
    setStep("editor");
  };

  const handleBack = () => {
    if (step === "editor") {
      setStep(previousStep);
    } else if (step === "templates") {
      setStep("initial");
    } else {
      close();
    }
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setStep("initial");
      setWaiverTitle("");
      editor?.commands.setContent("");
    }, 200);
  };

  const handleSave = () => {
    // aDD SAVE LOGIC HERE
    handleClose();
  };

  const drawerTitle =
    step === "initial" ? (
      "Lien waivers"
    ) : step === "templates" ? (
      <Group gap="xs">
        <Tooltip label="Back" position="right">
          <ActionIcon
            onClick={handleBack}
            variant="subtle"
            color="gray"
            aria-label="Go back"
          >
            <ArrowLeft02Icon size={24} />
          </ActionIcon>
        </Tooltip>
        <Text>Select a template</Text>
      </Group>
    ) : (
      <Group gap="xs">
        <Tooltip label="Back" position="right">
          <ActionIcon
            onClick={handleBack}
            variant="subtle"
            color="gray"
            aria-label="Go back"
          >
            <ArrowLeft02Icon size={24} />
          </ActionIcon>
        </Tooltip>
        <Text>{waiverTitle || "New Lien Waiver"}</Text>
      </Group>
    );

  return (
    <div>
      <Drawer
        opened={opened}
        onClose={handleClose}
        title={drawerTitle}
        padding="lg"
        size="lg"
      >
        {step === "initial" && (
          <WaiverInitialStep
            onNew={handleCreateNew}
            onTemplate={() => setStep("templates")}
            onEditWaiver={handleEditWaiver}
          />
        )}
        {step === "templates" && (
          <WaiverTemplatesStep onSelectTemplate={handleSelectTemplate} />
        )}
        {step === "editor" && (
          <WaiverEditorStep
            waiverTitle={waiverTitle}
            onWaiverTitleChange={setWaiverTitle}
            editor={editor}
            onCancel={handleClose}
            onSave={handleSave}
          />
        )}
      </Drawer>
    </div>
  );
}
