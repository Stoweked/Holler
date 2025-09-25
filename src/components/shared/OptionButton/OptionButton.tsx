import { UnstyledButton, Stack, Title } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./OptionButton.module.css";

interface OptionButtonProps {
  icon: ReactNode;
  label?: string;
  onClick: () => void;
  minHeight?: string | number;
}

export default function OptionButton({
  icon,
  label,
  onClick,
  minHeight,
}: OptionButtonProps) {
  return (
    <UnstyledButton
      aria-label={label}
      className={classes.button}
      onClick={onClick}
      mih={minHeight}
    >
      <Stack gap="xs" align="center">
        {icon}
        {label && (
          <Title order={5} ta="center">
            {label}
          </Title>
        )}
      </Stack>
    </UnstyledButton>
  );
}
