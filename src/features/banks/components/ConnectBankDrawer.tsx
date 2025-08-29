import { Button, Drawer, Select, Stack, TextInput, Text } from "@mantine/core";

interface ConnectBankDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function ConnectBankDrawer({
  opened,
  close,
}: ConnectBankDrawerProps) {
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Connect a new bank account"
        padding="md"
        size="md"
      >
        <Stack gap="lg">
          <Select
            label="Account Type"
            placeholder="Select account type"
            data={["Checking", "Savings"]}
            size="lg"
            radius="md"
            required
          />
          <TextInput
            label="Account Nickname"
            placeholder="e.g., Business Checking"
            size="lg"
            radius="md"
          />
          <TextInput
            label="Routing Number"
            placeholder="Enter routing number"
            size="lg"
            radius="md"
            required
          />
          <TextInput
            label="Account Number"
            placeholder="Enter account number"
            size="lg"
            radius="md"
            required
          />
          <Button size="lg" radius="xl" mt="md">
            Connect account
          </Button>
        </Stack>
      </Drawer>
    </div>
  );
}
