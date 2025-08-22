import { Drawer, Skeleton, Stack } from "@mantine/core";

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
        <Stack>
          <Skeleton radius="lg" width="100%" height={80} />
          <Skeleton radius="lg" width="100%" height={80} />
          <Skeleton radius="lg" width="100%" height={80} />
          <Skeleton radius="lg" width="100%" height={80} />
          <Skeleton radius="lg" width="100%" height={80} />
        </Stack>
      </Drawer>
    </div>
  );
}
