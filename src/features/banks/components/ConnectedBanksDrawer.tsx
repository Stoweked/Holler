import { Drawer } from "@mantine/core";
import { useState } from "react";
import { Recipient } from "@/features/contacts/types/recipient";
import SelectBankStep from "@/features/deposit/components/SelectBankStep";

interface ConnectedBanksDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function ConnectedBanksDrawer({
  opened,
  close,
}: ConnectedBanksDrawerProps) {
  const [selectedBank, setSelectedBank] = useState<Recipient | null>(null);
  const handleSelectBank = (bank: Recipient) => {
    setSelectedBank(bank);
  };

  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Connected bank accounts"
        padding="md"
        size="md"
      >
        <SelectBankStep onSelectBank={handleSelectBank} />
      </Drawer>
    </div>
  );
}
