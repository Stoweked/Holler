import { Stack, Text, Title } from "@mantine/core";

interface SectionHeaderProps {
  heading: string;
  subHeading: string;
}

export default function SectionHeader({
  heading,
  subHeading,
}: SectionHeaderProps) {
  return (
    <Stack gap={0} py="xs">
      <Title order={2}>{heading}</Title>
      <Text c="dimmed" size="lg">
        {subHeading}
      </Text>
    </Stack>
  );
}
