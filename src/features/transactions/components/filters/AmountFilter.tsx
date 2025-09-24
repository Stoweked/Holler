// src/features/transactions/filters/AmountFilter.tsx
import {
  Menu,
  Indicator,
  Button,
  RangeSlider,
  Stack,
  Group,
  NumberInput,
} from "@mantine/core";
import { CoinsDollarIcon } from "hugeicons-react";
import { useState, useEffect } from "react";

interface AmountFilterProps {
  activeAmountFilter: [number, number];
  onAmountFilterChange: (range: [number, number]) => void;
}

export function AmountFilter({
  activeAmountFilter,
  onAmountFilterChange,
}: AmountFilterProps) {
  const isAmountFilterActive =
    activeAmountFilter[0] !== 0 || activeAmountFilter[1] !== 999999;
  const [value, setValue] = useState<[number, number]>(activeAmountFilter);

  useEffect(() => {
    setValue(activeAmountFilter);
  }, [activeAmountFilter]);

  return (
    <Menu
      shadow="md"
      width={280}
      radius="md"
      position="bottom-start"
      closeOnItemClick={false}
    >
      <Menu.Target>
        <Indicator
          disabled={!isAmountFilterActive}
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
        <Stack p="sm" gap="lg">
          <RangeSlider
            min={0}
            max={999999}
            step={1000}
            value={value}
            onChange={setValue}
            onChangeEnd={onAmountFilterChange}
            label={null}
            minRange={1000}
            size="lg"
          />
          <Group justify="space-between" grow>
            <NumberInput
              value={value[0]}
              onChange={(val) => setValue([Number(val), value[1]])}
              onBlur={() => onAmountFilterChange(value)}
              prefix="$"
              thousandSeparator
              step={1000}
              min={0}
              max={value[1]}
              size="md"
              radius="md"
              hideControls
            />
            <NumberInput
              value={value[1]}
              onChange={(val) => setValue([value[0], Number(val)])}
              onBlur={() => onAmountFilterChange(value)}
              prefix="$"
              thousandSeparator
              step={1000}
              min={value[0]}
              max={250000}
              size="md"
              radius="md"
              hideControls
            />
          </Group>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
