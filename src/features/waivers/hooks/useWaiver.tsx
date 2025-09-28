// src/features/waivers/hooks/useWaiver.tsx
import { useState, useEffect, useCallback } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "@mantine/tiptap";
import { Waiver } from "../types/waiver";
import { createClient } from "@/lib/supabase/client";
import Placeholder from "@tiptap/extension-placeholder";
import { notifications } from "@mantine/notifications";
import { CheckIcon } from "@mantine/core";
import { AlertCircleIcon } from "hugeicons-react";
import { useWaivers } from "@/features/waivers/contexts/WaiversContext";

type WaiverStep = "initial" | "templates" | "editor";
type EditorMode = "new" | "edit" | "template";

export function useWaiver(closeDrawer: () => void) {
  const [step, setStep] = useState<WaiverStep>("initial");
  const [previousStep, setPreviousStep] = useState<WaiverStep>("initial");
  const [waiverTitle, setWaiverTitle] = useState("");
  const [waiverType, setWaiverType] = useState<"conditional" | "unconditional">(
    "conditional"
  );
  const [waiverPayment_type, setWaiverPayment_type] = useState<
    "progress" | "final"
  >("progress");
  const [editorMode, setEditorMode] = useState<EditorMode>("new");
  const [selectedWaiver, setSelectedWaiver] = useState<Waiver | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  const {
    waivers,
    refetchWaivers,
    setNewlyCreatedWaiver,
    source,
    drawerOpened,
  } = useWaivers();
  const supabase = createClient();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
      }),
      Link,
      Placeholder.configure({ placeholder: "Enter waiver content here..." }),
    ],
    content: "",
    immediatelyRender: false,
  });

  const handleCreateNew = useCallback(() => {
    setWaiverTitle("");
    setWaiverType("conditional");
    setWaiverPayment_type("progress");
    editor?.commands.setContent("");
    setSelectedWaiver(null);
    setPreviousStep("initial");
    setEditorMode("new");
    setStep("editor");
  }, [editor]);

  useEffect(() => {
    if (drawerOpened && source === "payment") {
      handleCreateNew();
    }
  }, [drawerOpened, source, handleCreateNew]);

  const handleSelectTemplate = (content: string, name: string) => {
    setWaiverTitle(name);
    setWaiverType("conditional");
    setWaiverPayment_type("progress");
    editor?.commands.setContent(content);
    setSelectedWaiver(null);
    setPreviousStep("templates");
    setEditorMode("template");
    setStep("editor");
  };

  const handleEditWaiver = (waiver: Waiver) => {
    setSelectedWaiver(waiver);
    setWaiverTitle(waiver.title);
    setWaiverType(waiver.type);
    setWaiverPayment_type(waiver.payment_type);
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
      setWaiverPayment_type("progress");
      editor?.commands.setContent("");
      setSelectedWaiver(null);
    }, 200);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setIsSaving(false);
      return;
    }

    try {
      let newWaiverId = null;
      if (editorMode === "edit" && selectedWaiver) {
        const { error } = await supabase
          .from("lien_waivers")
          .update({
            title: waiverTitle,
            content: editor?.getHTML(),
            type: waiverType,
            payment_type: waiverPayment_type,
            updated_at: new Date().toISOString(),
          })
          .eq("id", selectedWaiver.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("lien_waivers")
          .insert([
            {
              user_id: user.id,
              title: waiverTitle,
              content: editor?.getHTML(),
              type: waiverType,
              payment_type: waiverPayment_type,
            },
          ])
          .select("id")
          .single();
        if (error) throw error;
        newWaiverId = data.id;
      }

      notifications.show({
        title: "Waiver Saved",
        message: "Your lien waiver has been saved successfully.",
        color: "lime",
        icon: <CheckIcon size={16} />,
      });

      const allWaivers = await refetchWaivers();
      if (
        source === "payment" &&
        allWaivers &&
        allWaivers.length === 1 &&
        newWaiverId
      ) {
        const newWaiver = allWaivers.find((w) => w.id === newWaiverId);
        if (newWaiver) {
          setNewlyCreatedWaiver(newWaiver);
        }
        handleClose();
      } else {
        setStep("initial");
      }
    } catch (error) {
      console.error("Error saving waiver:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save the waiver.";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        icon: <AlertCircleIcon size={18} />,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleArchive = async () => {
    if (selectedWaiver) {
      setIsArchiving(true);
      try {
        const { error } = await supabase
          .from("lien_waivers")
          .update({ archived: true })
          .eq("id", selectedWaiver.id);

        if (error) throw error;

        notifications.show({
          title: "Waiver Archived",
          message: "Your lien waiver has been archived.",
          color: "lime",
          icon: <CheckIcon size={16} />,
        });

        refetchWaivers();
        handleClose();
      } catch (error) {
        console.error("Error archiving waiver:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to archive the waiver.";
        notifications.show({
          title: "Error",
          message: errorMessage,
          color: "red",
          icon: <AlertCircleIcon size={18} />,
        });
      } finally {
        setIsArchiving(false);
      }
    }
  };

  return {
    step,
    setStep,
    previousStep,
    waiverTitle,
    setWaiverTitle,
    waiverType,
    setWaiverType,
    waiverPayment_type,
    setWaiverPayment_type,
    editor,
    editorMode,
    waivers,
    isSaving,
    isArchiving,
    handleCreateNew,
    handleSelectTemplate,
    handleEditWaiver,
    handleBack,
    handleClose,
    handleSave,
    handleArchive,
  };
}
