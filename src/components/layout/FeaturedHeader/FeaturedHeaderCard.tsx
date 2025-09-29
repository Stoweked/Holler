// src/components/layout/FeaturedHeader/FeaturedHeaderCard.tsx
import {
  ActionIcon,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from "@mantine/core";
import classes from "./FeaturedHeader.module.css";
import { ArrowRight01Icon } from "hugeicons-react";

interface FeaturedHeaderCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  ariaLabel: string;
  onClick?: () => void;
}

export default function FeaturedHeaderCard({
  icon,
  title,
  description,
  ariaLabel,
  onClick,
}: FeaturedHeaderCardProps) {
  return (
    <UnstyledButton
      aria-label={ariaLabel}
      className={classes.button}
      onClick={onClick}
    >
      <Group wrap="nowrap" justify="space-between">
        <Group wrap="nowrap">
          <ThemeIcon size="lg" radius="xl" variant="light">
            {icon}
          </ThemeIcon>

          <Stack gap={0}>
            <Title order={5}>{title}</Title>
            <Text size="xs" c="dimmed">
              {description}
            </Text>
          </Stack>
        </Group>

        <ActionIcon
          component="div"
          variant="subtle"
          size="lg"
          radius="xl"
          aria-label={ariaLabel}
        >
          <ArrowRight01Icon size={32} />
        </ActionIcon>
      </Group>
    </UnstyledButton>
  );
}
