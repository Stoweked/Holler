import { Card, Stack, Text, Title } from "@mantine/core";
import ActionButtons from "../../../components/layout/SideNav/ActionButtons";
import { useDisclosure } from "@mantine/hooks";
import classes from "./PrimaryActions.module.css";
import TransferDrawer from "../../transfer/components/TransferDrawer";
import PaymentDrawer from "../../send-request/components/PaymentDrawer";
import AccountToggle from "./AccountToggle/AccountToggle";
import { useEffect } from "react";
import DepositDrawer from "@/features/deposit/components/DepositDrawer";

export default function PrimaryActionsCard() {
  const [
    openedDepositDrawer,
    { open: openDepositDrawer, close: closeDepositDrawer },
  ] = useDisclosure(false);

  const [
    openedRequestDrawer,
    { open: openRequestDrawer, close: closeRequestDrawer },
  ] = useDisclosure(false);

  const [openedSendDrawer, { open: openSendDrawer, close: closeSendDrawer }] =
    useDisclosure(false);

  const [
    openedTransferDrawer,
    { open: openTransferDrawer, close: closeTransferDrawer },
  ] = useDisclosure(false);

  useEffect(() => {
    const handleOpenDeposit = () => openDepositDrawer();
    const handleOpenSend = () => openSendDrawer();
    const handleOpenRequest = () => openRequestDrawer();
    const handleOpenTransfer = () => openTransferDrawer();

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
  }, [
    openDepositDrawer,
    openSendDrawer,
    openRequestDrawer,
    openTransferDrawer,
  ]);

  return (
    <div>
      <Card w="100%" py={48} className={classes.card}>
        <Stack align="center" gap="xl">
          <Stack align="center" gap="lg">
            <AccountToggle />

            <Stack align="center" gap={0}>
              <Title order={1} size={48}>
                $3,260.00
              </Title>
              <Text size="xs" c="dimmed">
                Current balance
              </Text>
            </Stack>
          </Stack>

          <ActionButtons
            onDepositClick={openDepositDrawer}
            onRequestClick={openRequestDrawer}
            onSendClick={openSendDrawer}
            onTransferClick={openTransferDrawer}
          />
        </Stack>
      </Card>

      <DepositDrawer opened={openedDepositDrawer} close={closeDepositDrawer} />
      <PaymentDrawer
        opened={openedRequestDrawer}
        close={closeRequestDrawer}
        actionType="request"
      />
      <PaymentDrawer
        opened={openedSendDrawer}
        close={closeSendDrawer}
        actionType="send"
      />
      <TransferDrawer
        opened={openedTransferDrawer}
        close={closeTransferDrawer}
      />
    </div>
  );
}
