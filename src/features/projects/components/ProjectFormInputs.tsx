// src/features/projects/components/ProjectFormInputs.tsx
import { Group, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";

interface ProjectFormInputsProps {
  form: UseFormReturnType<{
    name: string;
    address: string;
    start_date: Date | null;
    end_date: Date | null;
  }>;
}

export default function ProjectFormInputs({ form }: ProjectFormInputsProps) {
  return (
    <Stack gap="lg">
      <TextInput
        required
        label="Project name"
        size="lg"
        radius="lg"
        placeholder="Enter project name"
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Address"
        size="lg"
        radius="lg"
        placeholder="Enter project address"
        {...form.getInputProps("address")}
      />
      <Group grow>
        <DateInput
          label="Start date"
          valueFormat="MM/DD/YYYY"
          size="lg"
          radius="lg"
          placeholder="Select start date"
          {...form.getInputProps("start_date")}
        />
        <DateInput
          label="End date"
          valueFormat="MM/DD/YYYY"
          size="lg"
          radius="lg"
          placeholder="Select end date"
          {...form.getInputProps("end_date")}
        />
      </Group>
    </Stack>
  );
}
