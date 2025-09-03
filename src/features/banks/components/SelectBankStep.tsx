// src/components/primaryActions/deposit/SelectBankStep.tsx
import { mockBanks } from "@/mockData/mockBanks";
import BankList from "@/features/banks/components/BankList";
import { TransactionRecipient } from "@/features/contacts/types/contact";

interface SelectBankStepProps {
  onSelectBank: (bank: TransactionRecipient) => void;
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
