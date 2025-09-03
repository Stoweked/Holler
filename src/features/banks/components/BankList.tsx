import { useState } from "react";
import {
  Input,
  Stack,
  Title,
  ActionIcon,
  Tooltip,
  Button,
  Text,
  Center,
} from "@mantine/core";
import { Cancel01Icon, Search01Icon, BankIcon } from "hugeicons-react";
import BankItem from "./BankItem";
import { TransactionRecipient } from "@/features/contacts/types/contact";

interface BankListProps {
  banks: TransactionRecipient[];
  onBankClick?: (bank: TransactionRecipient) => void;
  onConnectNew?: () => void;
}

export default function BankList({
  banks,
  onBankClick,
  onConnectNew,
}: BankListProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleBankClick = (bank: TransactionRecipient) => {
    if (onBankClick) {
      onBankClick(bank);
    }
  };

  const filteredBanks = banks.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      bank.details.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Stack gap="lg">
      <Input
        placeholder="Search for a bank"
        leftSection={<Search01Icon size={20} />}
        radius="xl"
        size="xl"
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        rightSection={
          searchValue && (
            <Tooltip label="Clear search" position="left">
              <ActionIcon
                onClick={() => setSearchValue("")}
                variant="subtle"
                aria-label="Clear search"
                radius="xl"
                size="lg"
              >
                <Cancel01Icon size={24} />
              </ActionIcon>
            </Tooltip>
          )
        }
      />

      {/* Show content only if there are results */}

      {filteredBanks.length > 0 ? (
        <Stack>
          <Title order={4}>Your connected accounts</Title>
          <Stack gap={0}>
            {filteredBanks.map((bank) => (
              <BankItem
                key={bank.name}
                name={bank.name}
                details={bank.details}
                onClick={() => handleBankClick(bank)}
              />
            ))}
          </Stack>
        </Stack>
      ) : (
        // Show a message and a create button if no results are found
        <Center>
          <Stack align="center" mt="xl" gap="lg">
            <BankIcon size={40} color="grey" />
            <Stack gap={0} align="center">
              <Title order={4} ta="center">
                No banks found
              </Title>
              <Text c="dimmed" ta="center">
                Try adjusting your search or connect a new bank account.
              </Text>
            </Stack>

            <Button
              size="lg"
              radius="xl"
              variant="default"
              fullWidth
              onClick={() => setSearchValue("")}
            >
              Clear search
            </Button>
          </Stack>
        </Center>
      )}

      <Button size="lg" variant="default" onClick={onConnectNew}>
        Connect new account
      </Button>
    </Stack>
  );
}
