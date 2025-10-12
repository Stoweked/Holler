"use client";
import { Card, Stack, Title, Text } from "@mantine/core";
import ActionButtons from "../../../components/layout/SideNav/ActionButtons";
import classes from "./PrimaryActions.module.css";
import AccountToggle from "./AccountToggle/AccountToggle";
import { useWallet } from "@/features/wallet/contexts/WalletContext";
import { TransactionActionType } from "../types/wallet";
import { useBusinessProfile } from "@/features/business";

export default function PrimaryActionsCard() {
  const { balance, openActionDrawer } = useWallet();
  const { businessProfile, loading } = useBusinessProfile();

  const handleOpenDrawer = (type: TransactionActionType) => {
    openActionDrawer(type);
  };

  // Determine font size based on the length of the balance
  const balanceIntegerPart = Math.floor(balance);
  const balanceLength = String(balanceIntegerPart).length;
  let fontSize = "3rem"; // Default size (48px)

  if (balanceLength > 9) {
    // For balances in the billions (e.g., 1,000,000,000)
    fontSize = "2rem";
  } else if (balanceLength > 7) {
    // For balances in the tens of millions (e.g., 10,000,000)
    fontSize = "2.5rem";
  }

  return (
    <Card w="100%" py={48} className={classes.card}>
      <Stack align="center" gap="xl">
        <Stack align="center" gap="lg">
          {businessProfile || loading ? <AccountToggle /> : null}
          <Stack align="center" gap={4} py="xs">
            <Title order={1} style={{ fontSize, whiteSpace: "nowrap" }}>
              {`$${balance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            </Title>

            <Text c="dimmed">Current balance</Text>
          </Stack>
        </Stack>
        <ActionButtons
          onDepositClick={() => handleOpenDrawer("deposit")}
          onRequestClick={() => handleOpenDrawer("request")}
          onSendClick={() => handleOpenDrawer("send")}
          onTransferClick={() => handleOpenDrawer("transfer")}
        />
      </Stack>
    </Card>
  );
}
