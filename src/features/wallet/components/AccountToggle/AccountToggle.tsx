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
                Granite Builder Co
              </Text>
              <ArrowDown01Icon size={20} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Wasatch Framing</Menu.Item>
          <Menu.Item>Mountain View Carpentry</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
