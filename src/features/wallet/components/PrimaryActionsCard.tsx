// /src/features/wallet/components/PrimaryActionsCard.tsx

import { Card, Stack, Text, Title } from "@mantine/core";
import ActionButtons from "../../../components/layout/SideNav/ActionButtons";
import { useDisclosure } from "@mantine/hooks";
import classes from "./PrimaryActions.module.css";
import AccountToggle from "./AccountToggle/AccountToggle";
import { useEffect, useState, useCallback } from "react";
import { useWallet } from "@/contexts/WalletContext";
import TransactionDrawer from "@/features/wallet/components/actions/TransactionDrawer";
import { TransactionActionType } from "@/features/wallet/hooks/useTransactionState";

export default function PrimaryActionsCard() {
  const [opened, { open, close }] = useDisclosure(false);
  const [transactionType, setTransactionType] =
    useState<TransactionActionType>("send");
  const { balance } = useWallet();

  const handleOpenDrawer = useCallback(
    (type: TransactionActionType) => {
      setTransactionType(type);
      open();
    },
    [open]
  );

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
  }, [handleOpenDrawer]);

  return (
    <div>
      <Card w="100%" py={48} className={classes.card}>
        <Stack align="center" gap="xl">
          <Stack align="center" gap="lg">
            <AccountToggle />

            <Stack align="center" gap={0}>
              <Title order={1} size={48}>
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
