import { Drawer, Skeleton } from "@mantine/core";

interface ContactsDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function ContactsDrawer({ opened, close }: ContactsDrawerProps) {
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Contacts"
        padding="lg"
        size="lg"
      >
        <Skeleton radius="lg" width="100%" height={400} />
      </Drawer>
    </div>
  );
}
