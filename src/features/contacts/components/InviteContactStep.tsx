// src/features/contacts/components/InviteContactStep.tsx
import { useState } from "react";
import {
  Button,
  Stack,
  TextInput,
  SegmentedControl,
  Text,
  Group,
} from "@mantine/core";
import { Mail01Icon, SmartPhone01Icon } from "hugeicons-react";

type InviteMethod = "email" | "phone";

interface InviteContactStepProps {
  onInvite: (method: InviteMethod, value: string) => void;
}

export default function InviteContactStep({
  onInvite,
}: InviteContactStepProps) {
  const [inviteMethod, setInviteMethod] = useState<InviteMethod>("email");
  const [value, setValue] = useState("");

  const handleInvite = () => {
    onInvite(inviteMethod, value);
  };

  return (
    <Stack gap="lg">
      <SegmentedControl
        fullWidth
        size="xl"
        radius="xl"
        value={inviteMethod}
        onChange={(val) => setInviteMethod(val as InviteMethod)}
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

      {inviteMethod === "email" ? (
        <TextInput
          type="email"
          label="Email address"
          placeholder="Enter email address"
          size="xl"
          radius="md"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      ) : (
        <TextInput
          type="tel"
          label="Phone number"
          placeholder="Enter phone number"
          size="xl"
          radius="md"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      )}

      <Button size="xl" radius="xl" onClick={handleInvite} disabled={!value}>
        Continue
      </Button>
    </Stack>
  );
}
