import { Drawer, Skeleton } from "@mantine/core";

interface NotificationDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function NotificationDrawer({
  opened,
  close,
}: NotificationDrawerProps) {
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Notifications"
        padding="lg"
        size="md"
        position="right"
      >
        <Skeleton radius="lg" width="100%" height={400} />
      </Drawer>
    </div>
  );
}
