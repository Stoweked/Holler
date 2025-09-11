import { UnstyledButton, Stack, Text, Title } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./OptionButton.module.css";

interface OptionButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export default function OptionButton({
  icon,
  label,
  onClick,
}: OptionButtonProps) {
  return (
    <UnstyledButton
      aria-label={label}
      className={classes.button}
      onClick={onClick}
    >
      <Stack gap="xs" align="center">
        {icon}
        <Title order={5} ta="center">
          {label}
        </Title>
      </Stack>
    </UnstyledButton>
  );
}
