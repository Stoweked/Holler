import { Modal, Skeleton } from "@mantine/core";

export default function WhatsNewModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="What's new"
      centered
      size="xl"
    >
      <Skeleton h={200} radius="lg" />
    </Modal>
  );
}
