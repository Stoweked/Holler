// src/components/primaryActions/deposit/SelectBankStep.tsx
import BankList from "@/components/banks/BankList";
import { Recipient } from "@/components/contacts/types";
import { mockBanks } from "@/components/mockData/mockBanks";

interface SelectBankStepProps {
  onSelectBank: (bank: Recipient) => void;
}

export default function SelectBankStep({ onSelectBank }: SelectBankStepProps) {
  return <BankList banks={mockBanks} onBankClick={onSelectBank} />;
}
