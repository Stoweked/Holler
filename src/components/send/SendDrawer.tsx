import { Drawer, Skeleton } from "@mantine/core";

interface SendDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function SendDrawer({ opened, close }: SendDrawerProps) {
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Send funds"
        padding="lg"
        size="lg"
      >
        <Skeleton radius="lg" width="100%" height={400} />
      </Drawer>
    </div>
  );
}
