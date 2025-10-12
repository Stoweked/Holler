// src/features/wallet/components/steps/SuccessStep.tsx

import {
  Anchor,
  Avatar,
  Box,
  Button,
  CheckIcon,
  Group,
  Stack,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import Image from "next/image"; // Switched to Next.js Image component
import { notifications } from "@mantine/notifications";
import classes from "./Actions.module.css";
import { useEffect, useState } from "react";
import { TransactionActionType } from "../../types/wallet";
import ProjectDetailsCard from "@/features/projects/components/ProjectDetailsCard";
import { Project } from "@/features/projects/types/project";
import { ArrowRight02Icon, BankIcon } from "hugeicons-react";
import { useWallet } from "@/features/wallet/contexts/WalletContext";

// Import the image from the feature's assets folder
import coinsImage from "../../assets/coins.png";
import { TransactionParty } from "@/features/transactions/types/transactionParty";
import { useProfile } from "@/features/account/contexts/ProfileContext";
import { getInitials } from "@/lib/hooks/textUtils";
import { ContactType } from "@/features/contacts/types/contact";

// Helper component to render the correct avatar for each party
const TransactionPartyAvatar = ({ party }: { party: TransactionParty }) => {
  const { profile } = useProfile();

  switch (party.type) {
    case "self":
      return (
        <Avatar
          src={profile?.avatar_url}
          variant="default"
          size={80}
          radius="50%"
        >
          {getInitials(profile?.full_name)}
        </Avatar>
      );
    case "contact":
      const name =
        party.data.contactType === ContactType.Person
          ? party.data.full_name
          : party.data.business_name;
      return (
        <Avatar
          src={party.data.avatar_url}
          variant="default"
          size={80}
          radius="50%"
        >
          {getInitials(name)}
        </Avatar>
      );
    case "bank":
      return (
        <Avatar src={party.data.avatar_url} size={80} radius="50%">
          <BankIcon size={40} />
        </Avatar>
      );
    default:
      return <Avatar color="gray" size={80} radius="50%" variant="default" />;
  }
};
interface SuccessStepProps {
  transactionType: TransactionActionType;
  transactionId?: string;
  onDone: () => void;
  onStartOver: () => void;
  fromParty: TransactionParty;
  toParty: TransactionParty;
}

export default function SuccessStep({
  transactionType,
  transactionId,
  onDone,
  onStartOver,
  fromParty,
  toParty,
}: SuccessStepProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { openDetailsDrawer } = useWallet();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDoneClick = () => {
    notifications.show({
      title: "Transaction complete",
      message: (
        <Text size="sm">
          {transactionId && (
            <Anchor
              href="#"
              onClick={(event) => {
                event.preventDefault();
                openDetailsDrawer(transactionId);
                notifications.clean();
              }}
            >
              View details
            </Anchor>
          )}
        </Text>
      ),
      color: "lime",
      icon: <CheckIcon size={18} />,
      autoClose: 8000,
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
      <Button onClick={handleDoneClick} size="xl" fullWidth>
        Done
      </Button>
    </Stack>
  );

  const fromAvatar = transactionType === "request" ? toParty : fromParty;
  const toAvatar = transactionType === "request" ? fromParty : toParty;

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
                src={coinsImage}
                height={440}
                width={440}
                alt="Coins graphic"
                className={classes.coinImage}
                priority
                placeholder="blur"
              />
            </Box>
          )}
        </Transition>

        <Transition
          mounted={mounted}
          transition="fade"
          duration={1000}
          timingFunction="ease"
        >
          {(styles) => (
            <Group align="center" justify="center" wrap="nowrap" style={styles}>
              <TransactionPartyAvatar party={fromAvatar} />
              <ArrowRight02Icon size={32} />
              <TransactionPartyAvatar party={toAvatar} />
            </Group>
          )}
        </Transition>

        {/* Title, subheading, and conditional content */}
        <Transition
          mounted={mounted}
          transition="fade-up"
          duration={1200}
          timingFunction="ease"
        >
          {(styles) => (
            <Stack align="center" w="100%" gap="lg" style={styles}>
              <Stack align="center" gap="xs">
                <Title order={1} ta="center" lh={1.2}>
                  {title}
                </Title>
                <Text c="dimmed" ta="center">
                  {message}
                </Text>
              </Stack>

              {showProjectDetails ? (
                <>
                  <ProjectDetailsCard
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                  />
                  <ActionButtons />
                </>
              ) : (
                <ActionButtons />
              )}
            </Stack>
          )}
        </Transition>
      </Stack>
    </Stack>
  );
}
