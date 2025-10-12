"use client";
import {
  Card,
  Stack,
  Title,
  Text,
  Button,
  Group,
  CloseButton,
  Paper,
} from "@mantine/core";
import ActionButtons from "../../../components/layout/SideNav/ActionButtons";
import classes from "./PrimaryActions.module.css";
import AccountToggle from "./AccountToggle/AccountToggle";
import { useWallet } from "@/features/wallet/contexts/WalletContext";
import { TransactionActionType } from "../types/wallet";
import { useBusinessProfile } from "@/features/business";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/features/account";

export default function PrimaryActionsCard() {
  const { balance, openActionDrawer } = useWallet();
  const { businessProfile, loading } = useBusinessProfile();
  const { profile } = useProfile();
  const [showBusinessPrompt, setShowBusinessPrompt] = useState(
    !profile?.dismissed_business_prompt
  );
  const supabase = createClient();

  const handleOpenDrawer = (type: TransactionActionType) => {
    openActionDrawer(type);
  };

  const handleDismiss = async () => {
    setShowBusinessPrompt(false);
    if (profile) {
      await supabase
        .from("profiles")
        .update({ dismissed_business_prompt: true })
        .eq("id", profile.id);
    }
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

  const handleConnectBusiness = () => {
    window.dispatchEvent(
      new CustomEvent("open-settings", { detail: { tab: "business" } })
    );
  };

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

        {showBusinessPrompt ? (
          <Paper withBorder radius="lg" p="md">
            <Stack>
              <Group wrap="nowrap" align="flex-start">
                <Stack gap={0}>
                  <Title order={5}>Set up a business profile</Title>
                  <Text c="dimmed" size="sm">
                    Connect with clients and get paid faster.
                  </Text>
                </Stack>
                <CloseButton onClick={handleDismiss} radius="xl" />
              </Group>
              <Button onClick={handleConnectBusiness}>
                Connect business profile
              </Button>
            </Stack>
          </Paper>
        ) : null}
      </Stack>
    </Card>
  );
}
