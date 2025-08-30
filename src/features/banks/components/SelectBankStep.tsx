// src/components/primaryActions/deposit/SelectBankStep.tsx
import { mockBanks } from "@/mockData/mockBanks";
import { Recipient } from "@/features/contacts/types/recipient";
import BankList from "@/features/banks/components/BankList";

interface SelectBankStepProps {
  onSelectBank: (bank: Recipient) => void;
  onConnectNew?: () => void;
}

export default function SelectBankStep({
  onSelectBank,
  onConnectNew,
}: SelectBankStepProps) {
  return (
    <BankList
      banks={mockBanks}
      onBankClick={onSelectBank}
      onConnectNew={onConnectNew}
    />
  );
}
