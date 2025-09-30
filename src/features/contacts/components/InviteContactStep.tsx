// src/features/contacts/components/InviteContactStep.tsx
import {
  Button,
  Stack,
  TextInput,
  SegmentedControl,
  Text,
  Group,
} from "@mantine/core";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { Mail01Icon, SmartPhone01Icon } from "hugeicons-react";

type InviteMethod = "email" | "phone";

interface InviteContactStepProps {
  onInvite: (method: InviteMethod, value: string, fullName: string) => void;
  flowContext: "contacts" | "transaction";
}

export default function InviteContactStep({
  onInvite,
  flowContext,
}: InviteContactStepProps) {
  const form = useForm({
    initialValues: {
      fullName: "",
      inviteMethod: "email" as InviteMethod,
      value: "",
    },
    validate: {
      fullName: hasLength(
        { min: 2 },
        "Full name must have at least 2 characters"
      ),
      value: (value, values) => {
        if (values.inviteMethod === "email") {
          return isEmail("Invalid email")(value);
        }
        if (values.inviteMethod === "phone") {
          return /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value)
            ? null
            : "Invalid phone number";
        }
        return null;
      },
    },
  });

  const handleInvite = (values: typeof form.values) => {
    onInvite(values.inviteMethod, values.value, values.fullName);
  };

  const buttonText = flowContext === "contacts" ? "Invite contact" : "Continue";

  return (
    <form onSubmit={form.onSubmit(handleInvite)}>
      <Stack gap="lg">
        <TextInput
          type="name"
          label="Full name"
          placeholder="Enter their full name"
          size="lg"
          radius="lg"
          {...form.getInputProps("fullName")}
        />

        <SegmentedControl
          fullWidth
          size="xl"
          radius="xl"
          {...form.getInputProps("inviteMethod")}
          data={[
            {
              label: (
                <Group gap={8} align="center" justify="center">
                  <Mail01Icon size={20} />
                  <Text size="sm">Email</Text>
                </Group>
              ),
              value: "email",
            },
            {
              label: (
                <Group gap={8} align="center" justify="center">
                  <SmartPhone01Icon size={20} />
                  <Text size="sm">Phone</Text>
                </Group>
              ),
              value: "phone",
            },
          ]}
        />

        {form.values.inviteMethod === "email" ? (
          <TextInput
            type="email"
            placeholder="Enter email address"
            size="lg"
            radius="lg"
            {...form.getInputProps("value")}
          />
        ) : (
          <TextInput
            type="tel"
            placeholder="Enter phone number"
            size="lg"
            radius="md"
            {...form.getInputProps("value")}
          />
        )}

        <Button type="submit" size="xl" radius="xl">
          {buttonText}
        </Button>
      </Stack>
    </form>
  );
}
