// /src/features/wallet/components/actions/SuccessStep.tsx

import { Box, Button, Image, Stack, Text, Title } from "@mantine/core";
import { TransactionActionType } from "../../hooks/useTransactionState";
import classes from "./Actions.module.css";

interface SuccessStepProps {
  transactionType: TransactionActionType;
  onDone: () => void;
  onStartOver: () => void;
}

export default function SuccessStep({
  transactionType,
  onDone,
  onStartOver,
}: SuccessStepProps) {
  const getSuccessMessages = () => {
    switch (transactionType) {
      case "deposit":
        return {
          title: "Deposit initiated",
          message: "The funds are on their way to your Holler wallet.",
        };
      case "send":
        return {
          title: "Payment sent",
          message: "Your payment has been sent successfully.",
        };
      case "request":
        return {
          title: "Request sent",
          message: "Your request for payment has been sent.",
        };
      case "transfer":
        return {
          title: "Transfer initiated",
          message: "The funds are on their way to your bank account.",
        };
      default:
        return {
          title: "Success",
          message: "Your transaction has been processed.",
        };
    }
  };

  const { title, message } = getSuccessMessages();

  return (
    <Stack align="center" justify="center" h="100%" gap="lg" px="md">
      <Box className={classes.coinContainer} mt={-100}>
        <Image
          src="/images/success-step/coins.png" // The rotating PNG
          h="auto"
          w="100%"
          alt="Coins graphic"
          className={classes.rotatingCoin}
        />
        <Image
          src="/images/success-step/coins-fade.svg" // The SVG overlay
          h="auto"
          w="100%"
          alt="Fade overlay"
          className={classes.coinOverlay}
        />
      </Box>
      <Stack gap="xl" w="100%" style={{ zIndex: 9 }}>
        <Stack align="center" gap="xs">
          <Title order={1} style={{ color: "white" }} ta="center" lh={1.2}>
            {title}
          </Title>
          <Text c="dimmed" ta="center">
            {message}
          </Text>
        </Stack>

        <Stack align="center" w="100%">
          <Button onClick={onStartOver} size="lg" fullWidth>
            Start a new transaction
          </Button>
          <Button onClick={onDone} size="lg" variant="outline" fullWidth>
            Close
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
