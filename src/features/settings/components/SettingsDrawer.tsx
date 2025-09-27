import {
  ActionIcon,
  Box,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Tabs,
  Title,
  rem,
} from "@mantine/core";
import classes from "./Settings.module.css";
import {
  ArrowLeft02Icon,
  Cancel01Icon,
  ConnectIcon,
  CreditCardIcon,
  Notification01Icon,
  OfficeIcon,
  UserIcon,
} from "hugeicons-react";
import { useEffect, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import { useProfile } from "@/features/account/contexts/ProfileContext";
import OptionButton from "@/components/shared/OptionButton/OptionButton";
import { BillingSettings } from "../../billing/components/BillingSettings";
import Account from "@/features/account/components/Account";
import { BusinessSettings } from "@/features/business/components/BusinessSettings";
import { NotificationsSettings } from "@/features/notifications/components/NotificationsSettings";
import { IntegrationSettings } from "@/features/integrations/components/IntegrationSettings";

interface SettingsDrawerProps {
  opened: boolean;
  close: () => void;
  position?: "left" | "right";
  initialTab?: string;
}

export default function SettingsDrawer({
  opened,
  close,
  position = "left",
  initialTab = "account",
}: SettingsDrawerProps) {
  const [activeTab, setActiveTab] = useState<string | null>("account");
  const { profile } = useProfile();
  const { height } = useViewportSize();

  useEffect(() => {
    if (opened) {
      setActiveTab(initialTab);
    }
  }, [opened, initialTab]);

  if (!profile) {
    return null;
  }

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title={false}
      withCloseButton={false}
      size={rem(1000)}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      position={position}
      classNames={{
        content: classes.drawerContent,
      }}
    >
      <Box pt={50}>
        <Group
          wrap="nowrap"
          align="center"
          justify="space-between"
          className={classes.drawerHeading}
        >
          <Group gap="xs" wrap="nowrap">
            {activeTab !== "menu" ? (
              <ActionIcon
                size="lg"
                variant="subtle"
                radius="xl"
                aria-label="Back to menu"
                color="gray"
                onClick={() => setActiveTab("menu")}
                hiddenFrom="sm"
              >
                <ArrowLeft02Icon size={24} />
              </ActionIcon>
            ) : null}

            <Title order={5} style={{ flexShrink: "0" }}>
              Settings
            </Title>
          </Group>

          <ActionIcon
            size="lg"
            variant="subtle"
            radius="xl"
            aria-label="Close"
            color="gray"
            onClick={close}
          >
            <Cancel01Icon style={{ width: "70%", height: "70%" }} />
          </ActionIcon>
        </Group>

        <Tabs
          w="100%"
          radius="md"
          variant="pills"
          orientation="vertical"
          defaultValue="account"
          value={activeTab}
          onChange={setActiveTab}
          classNames={{
            root: classes.root,
            list: classes.list,
            panel: classes.panel,
            tab: classes.tab,
            tabLabel: classes.tabLabel,
            tabSection: classes.tabSection,
          }}
        >
          <Group gap="md" wrap="nowrap" align="flex-start" w="100%">
            <Stack visibleFrom="sm" pt="lg">
              <Tabs.List>
                <Stack gap="sm">
                  <Tabs.Tab
                    value="account"
                    leftSection={<UserIcon size={24} color="gray" />}
                    aria-label="Account"
                  >
                    Account
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="business"
                    leftSection={<OfficeIcon size={24} color="gray" />}
                    aria-label="Business"
                  >
                    Business
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="integrations"
                    leftSection={<ConnectIcon size={24} color="gray" />}
                    aria-label="Integrations"
                  >
                    Integrations
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="notifications"
                    leftSection={<Notification01Icon size={24} color="gray" />}
                    aria-label="Notifications"
                  >
                    Notifications
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="billing"
                    leftSection={<CreditCardIcon size={24} color="gray" />}
                    aria-label="Billing"
                  >
                    Billing
                  </Tabs.Tab>
                </Stack>
              </Tabs.List>
            </Stack>

            <Stack w="100%" px="md" className={classes.sectionWrapper}>
              <ScrollArea type="never" h={height}>
                <Tabs.Panel value="menu" pt="lg" hiddenFrom="sm">
                  <Stack gap="lg" h={height}>
                    <OptionButton
                      icon={<UserIcon size={24} />}
                      label="Account"
                      onClick={() => setActiveTab("account")}
                    />
                    <OptionButton
                      icon={<OfficeIcon size={24} />}
                      label="Business"
                      onClick={() => setActiveTab("business")}
                    />
                    <OptionButton
                      icon={<ConnectIcon size={24} />}
                      label="Integrations"
                      onClick={() => setActiveTab("integrations")}
                    />
                    <OptionButton
                      icon={<Notification01Icon size={24} />}
                      label="Notifications"
                      onClick={() => setActiveTab("notifications")}
                    />
                    <OptionButton
                      icon={<CreditCardIcon size={24} />}
                      label="Billing"
                      onClick={() => setActiveTab("billing")}
                    />
                  </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="account" pt="lg">
                  <Account />
                </Tabs.Panel>

                <Tabs.Panel value="business" pt="lg">
                  <BusinessSettings />
                </Tabs.Panel>

                <Tabs.Panel value="integrations" pt="lg">
                  <IntegrationSettings />
                </Tabs.Panel>

                <Tabs.Panel value="billing" pt="lg">
                  <BillingSettings />
                </Tabs.Panel>

                <Tabs.Panel value="notifications" pt="lg">
                  <NotificationsSettings />
                </Tabs.Panel>
              </ScrollArea>
            </Stack>
          </Group>
        </Tabs>
      </Box>
    </Drawer>
  );
}
