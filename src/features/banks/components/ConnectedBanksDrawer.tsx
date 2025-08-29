import { Drawer } from "@mantine/core";
import { useState } from "react";
import { Recipient } from "@/features/contacts/types/recipient";
import BankProfileModal from "./BankProfileModal";
import { useDisclosure } from "@mantine/hooks";
import BankList from "./BankList";
import { mockBanks } from "@/mockData/mockBanks";
import ConnectBankDrawer from "./ConnectBankDrawer";

interface ConnectedBanksDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function ConnectedBanksDrawer({
  opened,
  close,
}: ConnectedBanksDrawerProps) {
  const [selectedBank, setSelectedBank] = useState<Recipient | null>(null);
  const [
    openedBankProfileModal,
    { open: openBankProfileModal, close: closeBankProfileModal },
  ] = useDisclosure(false);
  const [
    openedConnectBankDrawer,
    { open: openConnectBankDrawer, close: closeConnectBankDrawer },
  ] = useDisclosure(false);

  const handleSelectBank = (bank: Recipient) => {
    setSelectedBank(bank);
    openBankProfileModal();
  };

  const handleConnectNew = () => {
    close();
    openConnectBankDrawer();
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
        <BankList
          banks={mockBanks}
          onBankClick={handleSelectBank}
          onConnectNew={handleConnectNew}
        />
      </Drawer>
      <BankProfileModal
        opened={openedBankProfileModal}
        close={closeBankProfileModal}
        bank={selectedBank}
      />
      <ConnectBankDrawer
        opened={openedConnectBankDrawer}
        close={closeConnectBankDrawer}
      />
    </div>
  );
}
