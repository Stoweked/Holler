import { Card, Stack, Text, Title } from "@mantine/core";
import ActionButtons from "../layout/SideNav/ActionButtons";
import { useDisclosure } from "@mantine/hooks";
import classes from "./PrimaryActionsCard.module.css";
import DepositDrawer from "./deposit/DepositDrawer";
import RequestDrawer from "./request/RequestDrawer";
import SendDrawer from "./send/SendDrawer";
import TransferDrawer from "./transfer/TransferDrawer";

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

  return (
    <div>
      <Card w="100%" py={48} className={classes.card}>
        <Stack align="center" gap="xl">
          <Stack align="center" gap="sm">
            <Text c="dimmed" size="lg">
              Welcome, Jwonahh
            </Text>
            <Stack align="center" gap={2}>
              <Title order={1} size={48}>
                $0.00
              </Title>
              <Text size="xs">Current balance</Text>
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
      <RequestDrawer opened={openedRequestDrawer} close={closeRequestDrawer} />
      <SendDrawer opened={openedSendDrawer} close={closeSendDrawer} />
      <TransferDrawer
        opened={openedTransferDrawer}
        close={closeTransferDrawer}
      />
    </div>
  );
}
