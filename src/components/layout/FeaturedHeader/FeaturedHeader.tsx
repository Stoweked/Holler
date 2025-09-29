import {
  ActionIcon,
  Group,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from "@mantine/core";
import classes from "./FeaturedHeader.module.css";
import {
  ArrowRight01Icon,
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
          <UnstyledButton
            aria-label="Getting started"
            className={classes.button}
          >
            <Group wrap="nowrap">
              <ThemeIcon size="lg" radius="xl" variant="default">
                <Coins02Icon size={20} />
              </ThemeIcon>

              <Stack gap={0}>
                <Title order={5}>Getting started</Title>
                <Text size="xs" c="dimmed">
                  Get set up to send & receive payments.
                </Text>
              </Stack>
              <ActionIcon
                component="div"
                variant="subtle"
                size="lg"
                radius="xl"
                aria-label="Get started"
              >
                <ArrowRight01Icon size={32} />
              </ActionIcon>
            </Group>
          </UnstyledButton>

          {/* Lien waivers */}
          <UnstyledButton
            aria-label="Getting started"
            className={classes.button}
          >
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
              <ActionIcon
                component="div"
                variant="subtle"
                size="lg"
                radius="xl"
                aria-label="Add waiver"
              >
                <ArrowRight01Icon size={32} />
              </ActionIcon>
            </Group>
          </UnstyledButton>

          {/* Bank deposit */}
          <UnstyledButton
            aria-label="Getting started"
            className={classes.button}
          >
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
              <ActionIcon
                component="div"
                variant="subtle"
                size="lg"
                radius="xl"
                aria-label="Set up deposit"
              >
                <ArrowRight01Icon size={32} />
              </ActionIcon>
            </Group>
          </UnstyledButton>

          {/* Project */}
          <UnstyledButton
            aria-label="Getting started"
            className={classes.button}
          >
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
              <ActionIcon
                component="div"
                variant="subtle"
                size="lg"
                radius="xl"
                aria-label="Create project"
              >
                <ArrowRight01Icon size={32} />
              </ActionIcon>
            </Group>
          </UnstyledButton>
        </Group>
      </ScrollArea.Autosize>
    </Group>
  );
}
