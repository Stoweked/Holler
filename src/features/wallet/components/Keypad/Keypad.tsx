// src/features/wallet/components/Keypad/Keypad.tsx
import { Drawer, SimpleGrid, Button } from "@mantine/core";
import { Delete01Icon } from "hugeicons-react";
import classes from "./Keypad.module.css";

interface KeypadButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function KeypadButton({ children, onClick }: KeypadButtonProps) {
  return (
    <Button
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      variant="default"
      size="xl"
      radius="md"
      style={{ height: "60px" }}
    >
      {children}
    </Button>
  );
}

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onContinue?: () => void;
}

function Keypad({ onKeyPress, onBackspace, onContinue }: KeypadProps) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];
  return (
    <SimpleGrid cols={3} spacing="sm">
      {keys.map((key) => (
        <KeypadButton key={key} onClick={() => onKeyPress(key)}>
          {key}
        </KeypadButton>
      ))}
      <KeypadButton onClick={onBackspace}>
        <Delete01Icon size={24} />
      </KeypadButton>
      {onContinue && (
        <Button
          onClick={onContinue}
          size="xl"
          radius="xl"
          style={{ gridColumn: "span 3" }}
        >
          Done
        </Button>
      )}
    </SimpleGrid>
  );
}

interface KeypadDrawerProps {
  opened: boolean;
  onClose: () => void;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onContinue?: () => void;
}

export function KeypadDrawer({
  opened,
  onClose,
  onKeyPress,
  onBackspace,
  onContinue,
}: KeypadDrawerProps) {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      withCloseButton={true}
      title="Enter amount"
      position="bottom"
      size={500}
      classNames={{ body: classes.drawerBody, content: classes.drawerContent }}
      overlayProps={{ backgroundOpacity: 0 }}
    >
      <Keypad
        onKeyPress={onKeyPress}
        onBackspace={onBackspace}
        onContinue={onContinue}
      />
    </Drawer>
  );
}
