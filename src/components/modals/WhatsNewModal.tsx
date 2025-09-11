import {
  Modal,
  Stack,
  Title,
  Text,
  Button,
  Card,
  Center,
  Badge,
  useMantineColorScheme,
} from "@mantine/core";
import { Moon02Icon } from "hugeicons-react";

export default function WhatsNewModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  // Action for when the app is in LIGHT mode
  const handleSwitchToDark = () => {
    setColorScheme("dark");
  };

  // Action for when the app is already in DARK mode
  const handleOpenSettings = () => {
    // This event is handled by the SideNav to open the settings drawer
    window.dispatchEvent(
      new CustomEvent("open-settings", { detail: { tab: "account" } })
    );
    // Close this modal after dispatching the event
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="What's new in Holler"
      centered
      size="md"
      radius="lg"
    >
      <Stack gap="lg">
        <Card withBorder radius="lg" p="lg">
          <Center>
            <Stack align="center" gap="lg">
              <Moon02Icon size={40} />

              <Stack gap="xs" align="center">
                <Badge variant="light" size="lg">
                  New feature
                </Badge>

                <Title order={2} lh={1.2} ta="center">
                  {colorScheme === "dark"
                    ? "Hello darkness, our new friend"
                    : "Introducing dark mode"}
                </Title>

                <Text c="dimmed" ta="center">
                  {colorScheme === "dark"
                    ? "Enjoy the new look! You can switch back anytime in your account settings."
                    : "Holler is now available in a sleek new dark mode. It's perfect for low-light environments and designed to be easier on your eyes."}
                </Text>
              </Stack>

              {/* Conditionally render the button based on the color scheme */}
              {colorScheme === "light" ? (
                <Button onClick={handleSwitchToDark} size="lg" fullWidth>
                  Try it out
                </Button>
              ) : (
                <Button
                  onClick={handleOpenSettings}
                  size="lg"
                  fullWidth
                  variant="default"
                >
                  Open account settings
                </Button>
              )}
            </Stack>
          </Center>
        </Card>
      </Stack>
    </Modal>
  );
}
