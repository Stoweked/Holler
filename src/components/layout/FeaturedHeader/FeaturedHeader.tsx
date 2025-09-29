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
import { BankIcon, ClipboardIcon, Coins02Icon } from "hugeicons-react";

export default function FeaturedHeader() {
  return (
    <Group wrap="nowrap" className={classes.featuredHeader}>
      <ScrollArea.Autosize type="never">
        <Group p="md" gap="md" wrap="nowrap">
          {/* Getting started */}
          <Card withBorder radius="lg" miw={490} shadow="xs">
            <Group wrap="nowrap">
              <ThemeIcon size="xl" radius="xl" variant="default">
                <Coins02Icon size={24} />
              </ThemeIcon>

              <Stack gap={0}>
                <Title order={4}>Getting started</Title>
                <Text size="sm" c="dimmed">
                  Send and receive payments between developers, builders, and
                  subs.
                </Text>
              </Stack>
              <Button variant="light" size="sm">
                Connect bank
              </Button>
            </Group>
          </Card>

          {/* Lien waivers */}
          <Card withBorder radius="lg" miw={490} shadow="xs">
            <Group wrap="nowrap">
              <ThemeIcon size="xl" radius="xl" variant="default">
                <ClipboardIcon size={24} />
              </ThemeIcon>

              <Stack gap={0}>
                <Title order={4}>Lien waivers</Title>
                <Text size="sm" c="dimmed">
                  Require lien waiver acknowledgment before releasing funds.
                </Text>
              </Stack>
              <Button variant="light" size="sm">
                Add waiver
              </Button>
            </Group>
          </Card>

          {/* Bank deposit */}
          <Card withBorder radius="lg" miw={490} shadow="xs">
            <Group wrap="nowrap">
              <ThemeIcon size="xl" radius="xl" variant="default">
                <BankIcon size={24} />
              </ThemeIcon>

              <Stack gap={0}>
                <Title order={4}>Bank deposit</Title>
                <Text size="sm" c="dimmed">
                  Fund your Holler account to pay subs and employees.
                </Text>
              </Stack>
              <Button variant="light" size="sm">
                Set up
              </Button>
            </Group>
          </Card>
        </Group>
      </ScrollArea.Autosize>
    </Group>
  );
}
