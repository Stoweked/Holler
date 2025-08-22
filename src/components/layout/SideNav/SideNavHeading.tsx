import { Card, Stack, Text, Title } from "@mantine/core";
import classes from "./SideNav.module.css";
import ActionButtons from "./ActionButtons";

export default function SideNavHeading() {
  return (
    <div>
      <Card w="100%" py={48} className={classes.headingCard}>
        <Stack align="center" gap="xl">
          <Stack align="center" gap="sm">
            <Text c="dimmed" size="lg">
              Welcome, Jwonahh
            </Text>
            <Stack align="center" gap={2}>
              <Title order={1} size={40}>
                $0.00
              </Title>
              <Text size="xs">Current balance</Text>
            </Stack>
          </Stack>

          <ActionButtons />
        </Stack>
      </Card>
    </div>
  );
}
