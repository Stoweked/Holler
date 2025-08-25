import { Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { ArrowDown01Icon } from "hugeicons-react";
import classes from "./AccountToggle.module.css";

export default function AccountToggle() {
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
                Mountain View Woodworking
              </Text>
              <ArrowDown01Icon size={20} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Account name</Menu.Item>
          <Menu.Item>Account name</Menu.Item>
          <Menu.Item>Account name</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
