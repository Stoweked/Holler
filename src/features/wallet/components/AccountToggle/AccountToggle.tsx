import {
  Avatar,
  Group,
  Menu,
  Stack,
  Text,
  UnstyledButton,
  Skeleton,
  Loader,
  Center,
} from "@mantine/core";
import { ArrowLeftRightIcon, Settings01Icon } from "hugeicons-react";
import classes from "./AccountToggle.module.css";
import { useBusinessProfile } from "@/features/business";
import { getInitials } from "@/lib/hooks/textUtils";

export default function AccountToggle() {
  const { businessProfile, loading } = useBusinessProfile();

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
          {loading ? (
            <Group className={classes.accountToggle} wrap="nowrap" gap="xs">
              <Center w={40} h={40}>
                <Loader size={32} />
              </Center>
              <Stack gap={8}>
                <Skeleton height={16} width={128} radius="xl" />
                <Skeleton height={8} width={64} radius="xl" />
              </Stack>
            </Group>
          ) : (
            <UnstyledButton
              aria-label="Switch account"
              className={classes.accountToggle}
            >
              <Group wrap="nowrap" gap="xs">
                <Avatar
                  src={businessProfile?.avatar_url}
                  color="lime"
                  size={40}
                  radius="xl"
                >
                  {initials}
                </Avatar>
                <Stack gap={0}>
                  <Text fw="bold" lineClamp={1} size="sm">
                    {businessProfile?.business_name || ""}
                  </Text>
                  <Text c="dimmed" lineClamp={1} size="xs">
                    @{businessProfile?.username || ""}
                  </Text>
                </Stack>
              </Group>
            </UnstyledButton>
          )}
        </Menu.Target>
        <Menu.Dropdown>
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
