// src/components/modals/FeedbackModal.tsx
"use client";

import { useEffect, useState } from "react";
//mantine
import {
  Button,
  CheckIcon,
  Checkbox,
  Group,
  Modal,
  Rating,
  SegmentedControl,
  Stack,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useProfile } from "@/contexts/ProfileContext";
import { AlertCircleIcon } from "hugeicons-react";
import { submitFeedback as submitFeedbackAction } from "@/components/modals/feedback/actions/submit-feedback";

export default function FeedbackModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const { profile } = useProfile();
  const [loading, setLoading] = useState(false); //button loading state

  const form = useForm({
    initialValues: {
      formEmail: profile?.email || "",
      formRating: 0,
      formMessage: "",
      formType: "feature" as "feature" | "bug",
      canContact: false,
    },
  });

  //Add email to profile data if exists
  useEffect(() => {
    if (profile?.email) {
      form.setFieldValue("formEmail", profile.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.email]);

  //SEND FEEDBACK
  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      await submitFeedbackAction({
        formEmail: values.formEmail,
        formRating: values.formRating,
        formMessage: values.formMessage,
        formType: values.formType,
        canContact: values.canContact,
      });

      close();
      form.reset();
      notifications.show({
        color: "lime",
        title: "Thank you!",
        message: "Your feedback has been submitted",
        icon: <CheckIcon size={16} />,
        loading: false,
        withCloseButton: true,
        autoClose: 2000,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Your feedback failed to submit";
      notifications.show({
        color: "red",
        title: "Error",
        message: errorMessage,
        icon: <AlertCircleIcon style={{ width: rem(18), height: rem(18) }} />,
        withCloseButton: true,
        autoClose: 2000,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Share feedback" centered>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="lg">
            <SegmentedControl
              fullWidth
              radius="xl"
              size="md"
              data={[
                { label: "Feature request", value: "feature" },
                { label: "Bug report", value: "bug" },
              ]}
              {...form.getInputProps("formType")}
            />
            <TextInput
              size="md"
              type="email"
              value={form.values.formEmail}
              style={{ display: "none" }}
              readOnly
            />
            <Stack gap={4} align="flex-start" w="100%">
              <Textarea
                w="100%"
                size="md"
                radius="md"
                placeholder={
                  form.values.formType === "feature"
                    ? "What feature would you like to see added to Holler?"
                    : "Describe the bug and how we can reproduce it."
                }
                autosize
                minRows={5}
                maxRows={10}
                {...form.getInputProps("formMessage")}
              />
            </Stack>

            <Checkbox
              label="I'm open to being contacted by the team for follow-up questions about this feedback."
              {...form.getInputProps("canContact", { type: "checkbox" })}
            />

            <Group align="center" justify="space-between">
              <Rating size="lg" {...form.getInputProps("formRating")} />
              <Button
                type="submit"
                loading={loading}
                disabled={!form.values.formMessage.trim()}
              >
                Send
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
