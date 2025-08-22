import { Drawer, Skeleton } from "@mantine/core";

interface DepositDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function DepositDrawer({ opened, close }: DepositDrawerProps) {
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Deposit funds"
        padding="lg"
        size="lg"
      >
        <Skeleton radius="lg" width="100%" height={400} />
      </Drawer>
    </div>
  );
}
