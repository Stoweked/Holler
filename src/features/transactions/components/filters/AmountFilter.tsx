import { Menu, Indicator, Button } from "@mantine/core";
import { CoinsDollarIcon } from "hugeicons-react";

export function AmountFilter() {
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
            leftSection={<CoinsDollarIcon size={16} />}
          >
            Amount
          </Button>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Filter by amount</Menu.Label>
        <Menu.Item>Show all</Menu.Item>
        <Menu.Divider />
        Slider components
      </Menu.Dropdown>
    </Menu>
  );
}
