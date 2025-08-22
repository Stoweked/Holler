import { Card, Stack, Text, Title } from "@mantine/core";
import ActionButtons from "../SideNav/ActionButtons";
import { useDisclosure } from "@mantine/hooks";
import DepositDrawer from "@/components/deposit/DepositDrawer";
import classes from "./PrimaryActionsCard.module.css";

export default function PrimaryActionsCard() {
  const [
    openedDepositDrawer,
    { open: openDepositDrawer, close: closeDepositDrawer },
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
              <Title order={1} size={40}>
                $0.00
              </Title>
              <Text size="xs">Current balance</Text>
            </Stack>
          </Stack>

          <ActionButtons onDepositClick={openDepositDrawer} />
        </Stack>
      </Card>

      <DepositDrawer opened={openedDepositDrawer} close={closeDepositDrawer} />
    </div>
  );
}
