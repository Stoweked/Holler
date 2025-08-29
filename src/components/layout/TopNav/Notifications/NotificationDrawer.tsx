import {
  Drawer,
  Stack,
  Center,
  Text,
  Title,
  Button,
  Group,
} from "@mantine/core";
import {
  AlertCircleIcon,
  ArrowDown02Icon,
  ArrowUp02Icon,
  BankIcon,
  Mail01Icon,
} from "hugeicons-react";
import NotificationItem from "./NotificationItem";

interface NotificationDrawerProps {
  opened: boolean;
  close: () => void;
}

const mockNotifications = [
  {
    id: "1",
    icon: <ArrowDown02Icon size={20} />,
    title: "Payment Received",
    description: "You received a payment of $1,852.00 from J2 Homes.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    icon: <AlertCircleIcon size={20} />,
    title: "Payment Failed",
    description: "Your payment of $185.00 to Frontier Building Co failed.",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: "3",
    icon: <ArrowUp02Icon size={20} />,
    title: "Payment Sent",
    description: "You sent a payment of $1,575.55 to Layton Construction.",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: "4",
    icon: <BankIcon size={20} />,
    title: "Deposit Complete",
    description: "Your deposit of $9,850.00 has been completed.",
    timestamp: "5 days ago",
    read: true,
  },
];

export default function NotificationDrawer({
  opened,
  close,
}: NotificationDrawerProps) {
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        title="Notifications"
        size="md"
        position="right"
      >
        {mockNotifications.length > 0 ? (
          <Stack gap={0}>
            {mockNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                icon={notification.icon}
                title={notification.title}
                description={notification.description}
                timestamp={notification.timestamp}
                read={notification.read}
              />
            ))}
            <Group justify="center" p="md">
              <Button variant="default" size="sm">
                Mark all as read
              </Button>
            </Group>
          </Stack>
        ) : (
          <Center h="100%">
            <Stack align="center" gap="lg">
              <Mail01Icon size={40} color="grey" />
              <Stack gap={0} align="center">
                <Title order={4} ta="center">
                  No new notifications
                </Title>
                <Text c="dimmed" ta="center">
                  You&apos;re all caught up!
                </Text>
              </Stack>
            </Stack>
          </Center>
        )}
      </Drawer>
    </div>
  );
}
