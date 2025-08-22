import { Drawer, Skeleton } from "@mantine/core";

interface RequestDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function RequestDrawer({ opened, close }: RequestDrawerProps) {
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Request funds"
        padding="lg"
        size="lg"
      >
        <Skeleton radius="lg" width="100%" height={400} />
      </Drawer>
    </div>
  );
}
