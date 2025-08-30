// src/features/wallet/components/PrimaryActionsCard.tsx

import { Card, Stack, Text, Title } from "@mantine/core";
import ActionButtons from "../../../components/layout/SideNav/ActionButtons";
import { useDisclosure } from "@mantine/hooks";
import classes from "./PrimaryActions.module.css";
import AccountToggle from "./AccountToggle/AccountToggle";
import { useEffect, useState } from "react";
import { TransactionActionType } from "@/components/shared/hooks/useTransactionState";
import TransactionDrawer from "@/components/shared/components/TransactionDrawer";
import { useWallet } from "@/contexts/WalletContext";

export default function PrimaryActionsCard() {
  const [opened, { open, close }] = useDisclosure(false);
  // Use the correct type for state
  const [transactionType, setTransactionType] =
    useState<TransactionActionType>("send");

  const { balance } = useWallet();

  // Use the correct type in the handler function
  const handleOpenDrawer = (type: TransactionActionType) => {
    setTransactionType(type);
    open();
  };

  useEffect(() => {
    const handleOpenDeposit = () => handleOpenDrawer("deposit");
    const handleOpenSend = () => handleOpenDrawer("send");
    const handleOpenRequest = () => handleOpenDrawer("request");
    const handleOpenTransfer = () => handleOpenDrawer("transfer");

    window.addEventListener("open-deposit", handleOpenDeposit);
    window.addEventListener("open-send", handleOpenSend);
    window.addEventListener("open-request", handleOpenRequest);
    window.addEventListener("open-transfer", handleOpenTransfer);

    return () => {
      window.removeEventListener("open-deposit", handleOpenDeposit);
      window.removeEventListener("open-send", handleOpenSend);
      window.removeEventListener("open-request", handleOpenRequest);
      window.removeEventListener("open-transfer", handleOpenTransfer);
    };
  }, []);

  return (
    <div>
      <Card w="100%" py={48} className={classes.card}>
        <Stack align="center" gap="xl">
          <Stack align="center" gap="lg">
            <AccountToggle />

            <Stack align="center" gap={0}>
              <Title order={1} size={48}>
                {/* Display the balance from the context */}
                {`$${balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              </Title>
              <Text size="xs" c="dimmed">
                Current balance
              </Text>
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

      <TransactionDrawer
        opened={opened}
        close={close}
        transactionType={transactionType}
      />
    </div>
  );
}
