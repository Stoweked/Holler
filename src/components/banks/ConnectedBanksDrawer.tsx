import { Drawer, Skeleton } from "@mantine/core";

interface ConnectedBanksDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function ConnectedBanksDrawer({
  opened,
  close,
}: ConnectedBanksDrawerProps) {
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Connected Bank Accounts"
        padding="lg"
        size="lg"
      >
        <Skeleton radius="lg" width="100%" height={400} />
      </Drawer>
    </div>
  );
}
