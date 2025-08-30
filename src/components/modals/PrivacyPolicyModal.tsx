import { Modal } from "@mantine/core";

export default function PrivacyPolicyModal({
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
      title="Privacy Policy"
      centered
      size="xl"
    >
      Privacy Policy
    </Modal>
  );
}
