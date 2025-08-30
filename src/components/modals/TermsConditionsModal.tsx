import { Modal } from "@mantine/core";

export default function TermsConditionsModal({
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
      title="Terms & Conditions"
      centered
      size="xl"
    >
      Terms and conditions
    </Modal>
  );
}
