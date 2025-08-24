// src/components/primaryActions/deposit/SelectBankStep.tsx
import BankList from "@/components/banks/BankList";
import { mockBanks } from "@/components/mockData/mockBanks";
import { Recipient } from "@/types/recipient";

interface SelectBankStepProps {
  onSelectBank: (bank: Recipient) => void;
}

export default function SelectBankStep({ onSelectBank }: SelectBankStepProps) {
  return <BankList banks={mockBanks} onBankClick={onSelectBank} />;
}
