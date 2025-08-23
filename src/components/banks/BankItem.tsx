import {
  ActionIcon,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { ArrowRight01Icon, BankIcon } from "hugeicons-react";
import classes from "./BankItem.module.css";

interface BankItemProps {
  name: string;
  details: string;
  onClick?: () => void;
}

export default function BankItem({ name, details, onClick }: BankItemProps) {
  return (
    <UnstyledButton className={classes.item} onClick={onClick}>
      <Group justify="space-between" wrap="nowrap">
        <Group
          wrap="nowrap"
          align="center"
          className={classes.details}
          gap="xs"
        >
          <ThemeIcon variant="default" radius="xl" size={44}>
            <BankIcon size={24} />
          </ThemeIcon>

          <Stack gap={0} style={{ overflow: "hidden" }}>
            <Title order={5} lineClamp={2} lh={1.2}>
              {name}
            </Title>
            <Text size="sm" c="dimmed" w="100%" className={classes.detailsText}>
              {details}
            </Text>
          </Stack>
        </Group>

        <ActionIcon
          component="div"
          variant="subtle"
          size="xl"
          radius="xl"
          aria-label="Select bank"
        >
          <ArrowRight01Icon size={32} />
        </ActionIcon>
      </Group>
    </UnstyledButton>
  );
}
