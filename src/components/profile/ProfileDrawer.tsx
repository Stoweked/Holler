import { Drawer, Skeleton } from "@mantine/core";

interface ProfileDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function ProfileDrawer({ opened, close }: ProfileDrawerProps) {
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Profile"
        padding="lg"
        size="lg"
        position="right"
      >
        <Skeleton radius="lg" width="100%" height={400} />
      </Drawer>
    </div>
  );
}
