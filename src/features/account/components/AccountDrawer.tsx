import {
  ActionIcon,
  Box,
  Drawer,
  Group,
  NavLink,
  ScrollArea,
  Skeleton,
  Space,
  Stack,
  Tabs,
  Title,
  rem,
} from "@mantine/core";
import classes from "./Account.module.css";
import {
  ArrowLeft02Icon,
  Award01Icon,
  Cancel01Icon,
  CreditCardIcon,
  Notification01Icon,
  UserIcon,
} from "hugeicons-react";
import { AccountSettings } from "./tabs/account/AccountSettings";
import { NotificationsSettings } from "./tabs/NotificationsSettings";
import { BillingSettings } from "./tabs/BillingSettings";
import { useEffect, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import { useProfile } from "@/contexts/ProfileContext";

interface AccountDrawerProps {
  opened: boolean;
  close: () => void;
  position?: "left" | "right";
  initialTab?: string;
}

export default function AccountDrawer({
  opened,
  close,
  position = "right",
  initialTab = "profile",
}: AccountDrawerProps) {
  const [activeTab, setActiveTab] = useState<string | null>("profile");
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
                <ArrowLeft02Icon style={{ width: "70%", height: "70%" }} />
              </ActionIcon>
            ) : null}

            <Title order={5} style={{ flexShrink: "0" }}>
              Account
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
          defaultValue="profile"
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
          <Group gap="lg" wrap="nowrap" align="flex-start" w="100%">
            <Stack visibleFrom="sm" pt="lg">
              <Tabs.List>
                <Stack gap="sm">
                  <Tabs.Tab
                    value="profile"
                    leftSection={<UserIcon size={16} />}
                    aria-label="Profile"
                  >
                    Profile
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="achievements"
                    leftSection={<Award01Icon size={16} />}
                    aria-label="Achievements"
                  >
                    Achievements
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="notifications"
                    leftSection={<Notification01Icon size={16} />}
                    aria-label="Notifications"
                  >
                    Notifications
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="billing"
                    leftSection={<CreditCardIcon size={16} />}
                    aria-label="Billing"
                  >
                    Billing
                  </Tabs.Tab>
                </Stack>
              </Tabs.List>
            </Stack>

            <Stack w="100%" px="lg" className={classes.sectionWrapper}>
              <ScrollArea type="never" h={height}>
                <Tabs.Panel value="menu" pt="lg" hiddenFrom="sm">
                  <Stack gap={8} h={height}>
                    <NavLink
                      label="Profile"
                      leftSection={<UserIcon size="1rem" />}
                      classNames={{
                        root: classes.navLinkRoot,
                        label: classes.navLinkLabel,
                        body: classes.navLinkBody,
                      }}
                      onClick={() => setActiveTab("profile")}
                    />
                    <NavLink
                      label="Achievements"
                      leftSection={<Award01Icon size="1rem" />}
                      classNames={{
                        root: classes.navLinkRoot,
                        label: classes.navLinkLabel,
                        body: classes.navLinkBody,
                      }}
                      onClick={() => setActiveTab("achievements")}
                    />
                    <NavLink
                      label="Notifications"
                      leftSection={<Notification01Icon size="1rem" />}
                      classNames={{
                        root: classes.navLinkRoot,
                        label: classes.navLinkLabel,
                        body: classes.navLinkBody,
                      }}
                      onClick={() => setActiveTab("notifications")}
                    />
                    <NavLink
                      label="Billing"
                      leftSection={<CreditCardIcon size="1rem" />}
                      classNames={{
                        root: classes.navLinkRoot,
                        label: classes.navLinkLabel,
                        body: classes.navLinkBody,
                      }}
                      onClick={() => setActiveTab("billing")}
                    />
                  </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="profile" pt="lg">
                  <Skeleton radius="lg" h={400} />
                  <Space h={100} />
                </Tabs.Panel>

                <Tabs.Panel value="achievements" pt="lg">
                  <Skeleton radius="lg" h={400} />
                  <Space h={100} />
                </Tabs.Panel>

                <Tabs.Panel value="billing" pt="lg">
                  <Skeleton radius="lg" h={400} />
                  <Space h={100} />
                </Tabs.Panel>

                <Tabs.Panel value="notifications" pt="lg">
                  <Skeleton radius="lg" h={400} />
                  <Space h={100} />
                </Tabs.Panel>
              </ScrollArea>
            </Stack>
          </Group>
        </Tabs>
      </Box>
    </Drawer>
  );
}
