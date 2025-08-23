import { Drawer, Skeleton } from "@mantine/core";

interface TransferDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function TransferDrawer({ opened, close }: TransferDrawerProps) {
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Transfer funds"
        padding="lg"
        size="lg"
      >
        <Skeleton radius="lg" width="100%" height={400} />
      </Drawer>
    </div>
  );
}
