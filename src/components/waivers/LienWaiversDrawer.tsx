import { Drawer, Skeleton } from "@mantine/core";

interface LienWaiversDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function LienWaiversDrawer({
  opened,
  close,
}: LienWaiversDrawerProps) {
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Lien Waivers"
        padding="lg"
        size="lg"
      >
        <Skeleton radius="lg" width="100%" height={400} />
      </Drawer>
    </div>
  );
}
