import { Menu, Indicator, Button } from "@mantine/core";
import { UserMultiple02Icon } from "hugeicons-react";

export function ContactFilter() {
  return (
    <Menu shadow="md" width={170} radius="md" position="bottom-start">
      <Menu.Target>
        <Indicator
          disabled
          color="lime"
          position="top-end"
          size={10}
          offset={6}
        >
          <Button
            size="sm"
            variant="default"
            leftSection={<UserMultiple02Icon size={16} />}
          >
            Contacts
          </Button>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Filter by contact</Menu.Label>
        <Menu.Item>Show all</Menu.Item>
        <Menu.Divider />
        Contacts list
      </Menu.Dropdown>
    </Menu>
  );
}
