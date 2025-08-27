"use client";

import { useEffect, useState } from "react";
//mantine
import {
  Button,
  CheckIcon,
  Group,
  Modal,
  Rating,
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
    },
  });

  //Add email to profile data if exists
  useEffect(() => {
    form.setValues({
      formEmail: profile?.email || "",
    });
    form.resetDirty();
    form.resetTouched();
  }, [profile]);

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
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setLoading(false);
      close();
      form.reset();
      notifications.show({
        color: "green",
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
          <Stack>
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
                placeholder="Your feedback..."
                autosize
                minRows={5}
                maxRows={10}
                value={form.values.formMessage}
                onChange={(event) =>
                  form.setFieldValue("formMessage", event.currentTarget.value)
                }
              />
            </Stack>
            <Group align="center" justify="space-between">
              <Rating
                size="lg"
                onChange={(value) => form.setFieldValue("formRating", value)}
              />
              <Button
                type="submit"
                loading={loading}
                disabled={!form.isDirty()}
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
