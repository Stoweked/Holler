import {
  Avatar,
  Group,
  Menu,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  ArrowDown01Icon,
  ArrowLeftRightIcon,
  MoreVerticalCircle01Icon,
  Settings01Icon,
} from "hugeicons-react";
import classes from "./AccountToggle.module.css";
import { useBusinessProfile } from "@/features/business";
import { getInitials } from "@/lib/hooks/textUtils";

export default function AccountToggle() {
  const { businessProfile } = useBusinessProfile();

  const handleManageAccounts = () => {
    window.dispatchEvent(
      new CustomEvent("open-settings", { detail: { tab: "business" } })
    );
  };

  const initials = getInitials(businessProfile?.business_name);

  return (
    <div>
      <Menu shadow="md" width={240} radius="md" position="bottom">
        <Menu.Target>
          <UnstyledButton
            aria-label="Switch account"
            className={classes.accountToggle}
          >
            <Group wrap="nowrap" gap="xs">
              <Avatar
                src={businessProfile?.avatar_url}
                color="lime"
                size="lg"
                radius="xl"
              >
                {initials}
              </Avatar>
              <Stack gap={0}>
                <Text fw="bold" lineClamp={1} size="sm">
                  {businessProfile?.business_name || "Your Account"}
                </Text>
                <Text c="dimmed" lineClamp={1} size="xs">
                  @{businessProfile?.username || "@username"}
                </Text>
              </Stack>
              {/* <MoreVerticalCircle01Icon size={20} /> */}
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<ArrowLeftRightIcon size={16} />}>
            Wasatch Framing
          </Menu.Item>
          <Menu.Item leftSection={<ArrowLeftRightIcon size={16} />}>
            Mountain View Carpentry
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            leftSection={<Settings01Icon size={16} />}
            onClick={handleManageAccounts}
          >
            Business settings
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
