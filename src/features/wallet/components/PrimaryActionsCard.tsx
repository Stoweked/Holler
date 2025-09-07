"use client";
import { Card, Stack, Title, Text } from "@mantine/core";
import ActionButtons from "../../../components/layout/SideNav/ActionButtons";
import classes from "./PrimaryActions.module.css";
import AccountToggle from "./AccountToggle/AccountToggle";
import { useWallet } from "@/contexts/WalletContext";
import { TransactionActionType } from "../types/wallet";

export default function PrimaryActionsCard() {
  const { balance, openActionDrawer } = useWallet();

  const handleOpenDrawer = (type: TransactionActionType) => {
    openActionDrawer(type);
  };

  return (
    <Card w="100%" py={48} className={classes.card}>
      <Stack align="center" gap="xl">
        <Stack align="center" gap="lg">
          <AccountToggle />
          <Stack align="center" gap={4}>
            <Text size="sm" c="dimmed">
              Current balance
            </Text>
            <Title order={1} size={48}>
              {`$${balance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            </Title>
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
