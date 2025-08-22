import { Modal, Skeleton } from "@mantine/core";

interface FeedbackModalProps {
  opened: boolean;
  close: () => void;
}

export default function FeedbackModal({ opened, close }: FeedbackModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Share feedback"
      size="md"
      centered
      radius="lg"
    >
      <Skeleton radius="lg" width="100%" height={400} />
    </Modal>
  );
}
