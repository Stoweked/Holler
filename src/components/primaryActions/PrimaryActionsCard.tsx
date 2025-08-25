import { Card, Stack, Text, Title } from "@mantine/core";
import ActionButtons from "../layout/SideNav/ActionButtons";
import { useDisclosure } from "@mantine/hooks";
import classes from "./PrimaryActions.module.css";
import DepositDrawer from "./deposit/DepositDrawer";
import TransferDrawer from "./transfer/TransferDrawer";
import PaymentDrawer from "./PaymentDrawer";

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
            <Text size="lg">Welcome, Jwonahh</Text>
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
