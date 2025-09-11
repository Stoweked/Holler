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
      formType: "feature",
      canContact: false,
    },
  });

  //Add email to profile data if exists
  useEffect(() => {
    form.setValues({
      formEmail: profile?.email || "",
    });
    form.resetDirty();
    form.resetTouched();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.email]);

  //SEND FEEDBACK
  const submitFeedback = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setLoading(true);
    const res: Response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formEmail: form.values.formEmail,
        formRating: form.values.formRating,
        formMessage: form.values.formMessage,
        formType: form.values.formType,
        canContact: form.values.canContact,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setLoading(false);
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
    } else {
      setLoading(false); //remove button loading state
      const errorMessage = "Your feedback failed to submit";
      notifications.show({
        color: "red",
        title: "Error",
        message: errorMessage,
        icon: <AlertCircleIcon style={{ width: rem(18), height: rem(18) }} />,
        withCloseButton: true,
        autoClose: 2000,
      });
      console.log(data.error.message);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Share feedback" centered>
        <form onSubmit={submitFeedback}>
          <Stack gap="lg">
            <SegmentedControl
              fullWidth
              radius="xl"
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
                value={form.values.formMessage}
                onChange={(event) =>
                  form.setFieldValue("formMessage", event.currentTarget.value)
                }
              />
            </Stack>

            <Checkbox
              label="I'm open to being contacted by the team for follow-up questions about this feedback."
              {...form.getInputProps("canContact", { type: "checkbox" })}
            />

            <Group align="center" justify="space-between">
              <Rating
                size="lg"
                onChange={(value) => form.setFieldValue("formRating", value)}
              />
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
