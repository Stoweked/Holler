// features/waivers/components/LienWaiversDrawer.tsx
"use client";

import { ActionIcon, Drawer, Group, Space, Text, Tooltip } from "@mantine/core";
import { ArrowLeft02Icon } from "hugeicons-react";
import WaiverInitialStep from "./WaiverInitialStep";
import WaiverTemplatesStep from "./WaiverTemplatesStep";
import WaiverEditorStep from "./WaiverEditorStep";
import { useWaiver } from "../hooks/useWaiver";

interface LienWaiversDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function LienWaiversDrawer({
  opened,
  close,
}: LienWaiversDrawerProps) {
  const {
    step,
    setStep,
    waiverTitle,
    setWaiverTitle,
    waiverType,
    setWaiverType,
    waiverPayment_type,
    setWaiverPayment_type,
    editor,
    editorMode,
    handleCreateNew,
    handleSelectTemplate,
    handleEditWaiver,
    handleBack,
    handleClose,
    handleSave,
    handleArchive,
    waivers,
    isSaving,
    isArchiving,
  } = useWaiver(close);

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
        <Text>
          {
            {
              new: "New lien waiver",
              edit: "Edit lien waiver",
              template: "Waiver template",
            }[editorMode]
          }
        </Text>
      </Group>
    );

  return (
    <Drawer
      zIndex={300}
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
          waivers={waivers}
        />
      )}
      {step === "templates" && (
        <WaiverTemplatesStep onSelectTemplate={handleSelectTemplate} />
      )}
      {step === "editor" && (
        <WaiverEditorStep
          waiverTitle={waiverTitle}
          onWaiverTitleChange={setWaiverTitle}
          waiverType={waiverType}
          onWaiverTypeChange={setWaiverType}
          waiverPaymentType={waiverPayment_type}
          onWaiverPaymentTypeChange={setWaiverPayment_type}
          editor={editor}
          editorMode={editorMode}
          onSave={handleSave}
          onArchive={handleArchive}
          isSaving={isSaving}
          isArchiving={isArchiving}
        />
      )}
      <Space h={100} />
    </Drawer>
  );
}
