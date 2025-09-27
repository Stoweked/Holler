// /src/features/wallet/components/actions/SuccessStep.tsx

import {
  Box,
  Button,
  CheckIcon,
  Image,
  Stack,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import classes from "./Actions.module.css";
import { useEffect, useState } from "react";
import { TransactionActionType } from "../../types/wallet";
import ProjectDetailsCard from "@/features/projects/components/ProjectDetailsCard";
import { Project } from "@/features/projects/types/project";
import { PaymentSuccess02Icon } from "hugeicons-react";
import { useWallet } from "@/contexts/WalletContext";

interface SuccessStepProps {
  transactionType: TransactionActionType;
  transactionId?: string;
  onDone: () => void;
  onStartOver: () => void;
}

export default function SuccessStep({
  transactionType,
  transactionId,
  onDone,
  onStartOver,
}: SuccessStepProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { openDetailsDrawer } = useWallet();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDoneClick = () => {
    notifications.show({
      title: "Success",
      message: "Transaction complete.",
      color: "lime",
      icon: <CheckIcon size={18} />,
      autoClose: 5000,
    });
    onDone();
  };

  const showProjectDetails =
    transactionType === "send" || transactionType === "request";

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

  // Reusable component for the action buttons
  const ActionButtons = () => (
    <Stack w="100%" gap="sm">
      <Button onClick={handleDoneClick} size="lg" fullWidth>
        Done
      </Button>
      {transactionId && (
        <Button
          variant="light"
          size="lg"
          fullWidth
          onClick={() => openDetailsDrawer(transactionId)}
        >
          View details
        </Button>
      )}
    </Stack>
  );

  return (
    <Stack align="center" justify="center" gap="lg" px="md">
      <Stack gap="xl" w="100%" style={{ zIndex: 9 }}>
        {/* Coin image */}
        <Transition
          mounted={mounted}
          transition="fade-down"
          duration={1000}
          timingFunction="ease"
        >
          {(styles) => (
            <Box className={classes.coinContainer} style={styles}>
              <Image
                src="/images/success-step/coins.png"
                h="auto"
                w={440}
                alt="Coins graphic"
                className={classes.coinImage}
              />
            </Box>
          )}
        </Transition>

        {/* Title and subheading */}
        <Transition
          mounted={mounted}
          transition="slide-up"
          duration={1000}
          timingFunction="ease"
        >
          {(styles) => (
            <Stack align="center" gap="xs" style={styles}>
              <PaymentSuccess02Icon size={48} color="green" />
              <Title order={1} ta="center" lh={1.2}>
                {title}
              </Title>
              <Text c="dimmed" ta="center">
                {message}
              </Text>
            </Stack>
          )}
        </Transition>
      </Stack>

      {/* Project details card */}
      {showProjectDetails && (
        <Transition
          mounted={mounted}
          transition="slide-up"
          duration={1200}
          timingFunction="ease"
        >
          {(styles) => (
            <Stack align="center" w="100%" gap="lg" style={styles}>
              <ProjectDetailsCard
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />
              <ActionButtons />
            </Stack>
          )}
        </Transition>
      )}

      {/* Button */}
      {!showProjectDetails && (
        <Transition
          mounted={mounted}
          transition="slide-up"
          duration={1200}
          timingFunction="ease"
        >
          {(styles) => (
            <Stack align="center" w="100%" gap="lg" style={styles}>
              <ActionButtons />
            </Stack>
          )}
        </Transition>
      )}
    </Stack>
  );
}
