import { SimpleGrid, Text, UnstyledButton } from "@mantine/core";
import classes from "./Keypad.module.css";
import { SquareArrowLeft03Icon } from "hugeicons-react";

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
}

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];

export default function Keypad({ onKeyPress, onDelete }: KeypadProps) {
  return (
    <SimpleGrid cols={3} spacing="md" verticalSpacing="md">
      {keys.map((key) =>
        key ? (
          <UnstyledButton
            key={key}
            className={classes.key}
            onClick={() => onKeyPress(key)}
          >
            <Text size="xl" fw="bold">
              {key}
            </Text>
          </UnstyledButton>
        ) : (
          <div key="placeholder" />
        )
      )}
      <UnstyledButton className={classes.key} onClick={onDelete}>
        <SquareArrowLeft03Icon size={28} />
      </UnstyledButton>
    </SimpleGrid>
  );
}
