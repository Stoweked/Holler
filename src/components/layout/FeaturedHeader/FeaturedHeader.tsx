import {
  Button,
  Card,
  Group,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import classes from "./FeaturedHeader.module.css";
import {
  BankIcon,
  ClipboardIcon,
  Coins02Icon,
  House03Icon,
} from "hugeicons-react";

export default function FeaturedHeader() {
  return (
    <Group wrap="nowrap" className={classes.featuredHeader}>
      <ScrollArea.Autosize type="never">
        <Group p="md" gap="md" wrap="nowrap">
          {/* Getting started */}
          <Card withBorder p="sm" radius="lg" miw={400} shadow="xs">
            <Group wrap="nowrap">
              <ThemeIcon size="lg" radius="xl" variant="default">
                <Coins02Icon size={20} />
              </ThemeIcon>

              <Stack gap={0}>
                <Title order={5}>Getting started</Title>
                <Text size="xs" c="dimmed">
                  Send & receive payments with builders and subs.
                </Text>
              </Stack>
              <Button variant="light" size="sm">
                Connect bank
              </Button>
            </Group>
          </Card>

          {/* Lien waivers */}
          <Card withBorder p="sm" radius="lg" miw={400} shadow="xs">
            <Group wrap="nowrap">
              <ThemeIcon size="lg" radius="xl" variant="default">
                <ClipboardIcon size={20} />
              </ThemeIcon>

              <Stack gap={0}>
                <Title order={5}>Lien waivers</Title>
                <Text size="xs" c="dimmed">
                  Require lien waivers before releasing funds.
                </Text>
              </Stack>
              <Button variant="light" size="sm">
                Add waiver
              </Button>
            </Group>
          </Card>

          {/* Bank deposit */}
          <Card withBorder p="sm" radius="lg" miw={400} shadow="xs">
            <Group wrap="nowrap">
              <ThemeIcon size="lg" radius="xl" variant="default">
                <BankIcon size={20} />
              </ThemeIcon>

              <Stack gap={0}>
                <Title order={5}>Bank deposit</Title>
                <Text size="xs" c="dimmed">
                  Fund your Holler account to pay subs and employees.
                </Text>
              </Stack>
              <Button variant="light" size="sm">
                Set up
              </Button>
            </Group>
          </Card>

          {/* Project */}
          <Card withBorder p="sm" radius="lg" miw={400} shadow="xs">
            <Group wrap="nowrap">
              <ThemeIcon size="lg" radius="xl" variant="default">
                <House03Icon size={20} />
              </ThemeIcon>

              <Stack gap={0}>
                <Title order={5}>Projects</Title>
                <Text size="xs" c="dimmed">
                  Organize your transactions by project for easier tracking.
                </Text>
              </Stack>
              <Button variant="light" size="sm">
                Create
              </Button>
            </Group>
          </Card>
        </Group>
      </ScrollArea.Autosize>
    </Group>
  );
}
