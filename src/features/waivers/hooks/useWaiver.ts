// features/waivers/hooks/useWaiver.ts
import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "@mantine/tiptap";
import { Waiver } from "../types/waiver";

type WaiverStep = "initial" | "templates" | "editor";
type EditorMode = "new" | "edit" | "template";

export function useWaiver(closeDrawer: () => void) {
  const [step, setStep] = useState<WaiverStep>("initial");
  const [previousStep, setPreviousStep] = useState<WaiverStep>("initial");
  const [waiverTitle, setWaiverTitle] = useState("");
  const [waiverType, setWaiverType] = useState<"conditional" | "unconditional">(
    "conditional"
  );
  const [editorMode, setEditorMode] = useState<EditorMode>("new");

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: "",
    immediatelyRender: false,
  });

  const handleCreateNew = () => {
    setWaiverTitle("");
    setWaiverType("conditional");
    editor?.commands.setContent("");
    setPreviousStep("initial");
    setEditorMode("new");
    setStep("editor");
  };

  const handleSelectTemplate = (content: string, name: string) => {
    setWaiverTitle(name);
    setWaiverType("conditional");
    editor?.commands.setContent(content);
    setPreviousStep("templates");
    setEditorMode("template");
    setStep("editor");
  };

  const handleEditWaiver = (waiver: Waiver) => {
    setWaiverTitle(waiver.title);
    setWaiverType(waiver.type);
    editor?.commands.setContent(waiver.content);
    setPreviousStep("initial");
    setEditorMode("edit");
    setStep("editor");
  };

  const handleBack = () => {
    if (step === "editor") {
      setStep(previousStep);
    } else if (step === "templates") {
      setStep("initial");
    } else {
      closeDrawer();
    }
  };

  const handleClose = () => {
    closeDrawer();
    setTimeout(() => {
      setStep("initial");
      setWaiverTitle("");
      setWaiverType("conditional");
      editor?.commands.setContent("");
    }, 200);
  };

  const handleSave = () => {
    // aDD SAVE LOGIC HERE
    handleClose();
  };

  return {
    step,
    setStep,
    previousStep,
    waiverTitle,
    setWaiverTitle,
    waiverType,
    setWaiverType,
    editor,
    editorMode,
    handleCreateNew,
    handleSelectTemplate,
    handleEditWaiver,
    handleBack,
    handleClose,
    handleSave,
  };
}
