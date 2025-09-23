import { Group, Menu, Text, UnstyledButton } from "@mantine/core";
import {
  ArrowDown01Icon,
  ArrowLeftRightIcon,
  Settings01Icon,
} from "hugeicons-react";
import classes from "./AccountToggle.module.css";

export default function AccountToggle() {
  const handleManageAccounts = () => {
    window.dispatchEvent(
      new CustomEvent("open-settings", { detail: { tab: "business" } })
    );
  };

  return (
    <div>
      <Menu shadow="md" width={240} radius="md" position="bottom">
        <Menu.Target>
          <UnstyledButton
            aria-label="Switch account"
            className={classes.accountToggle}
          >
            <Group wrap="nowrap" gap="xs">
              <Text fw="bold" lineClamp={1} size="sm">
                Granite Builder Co
              </Text>
              <ArrowDown01Icon size={20} />
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
            Manage accounts
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
