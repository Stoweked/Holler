import { Waiver } from "@/features/waivers/types/waiver";
import { mockWaivers } from "../../../mockData/mockWaivers";
import {
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Combobox,
  useCombobox,
  InputBase,
  ScrollArea,
  CloseButton,
  Tooltip,
  Divider,
  HoverCard,
  ActionIcon,
} from "@mantine/core";
import {
  ClipboardIcon,
  File01Icon,
  InformationCircleIcon,
  PlusSignIcon,
  Search01Icon,
} from "hugeicons-react";
import classes from "./EnterAmount.module.css";
import { useState } from "react";
import WaiverSelectItem from "./WaiverSelectItem";

interface LienWaiverDetailsCardProps {
  selectedWaiver: Waiver | null;
  setSelectedWaiver: (waiver: Waiver | null) => void;
}

export default function LienWaiverDetailsCard({
  selectedWaiver,
  setSelectedWaiver,
}: LienWaiverDetailsCardProps) {
  const combobox = useCombobox({});
  const [search, setSearch] = useState("");

  const filteredWaivers = mockWaivers.filter((waiver) =>
    waiver.title.toLowerCase().includes(search.toLowerCase().trim())
  );

  const options = filteredWaivers.map((waiver, index) => (
    <Stack gap={4} key={waiver.id} style={{ paddingTop: index > 0 ? 4 : 0 }}>
      <Combobox.Option value={waiver.id} style={{ borderRadius: 8 }}>
        <WaiverSelectItem waiver={waiver} />
      </Combobox.Option>
      {index < filteredWaivers.length - 1 && <Divider />}
    </Stack>
  ));

  return (
    <Paper withBorder radius="lg" p="xs" w="100%">
      <Stack gap="sm">
        <Group gap="xs" justify="space-between" wrap="nowrap">
          <Group wrap="nowrap" gap={8}>
            <ThemeIcon variant="default" radius="xl" size="lg">
              <ClipboardIcon size={20} />
            </ThemeIcon>
            <Stack gap={0} className={classes.recipientTextContainer}>
              <Text size="sm" c="dimmed">
                {selectedWaiver ? "Required" : "Optional"}
              </Text>
              <Text size="md" fw="bold" lh={1.2}>
                Lien waiver
              </Text>
            </Stack>
          </Group>

          <HoverCard width={310} shadow="md" position="bottom-end">
            <HoverCard.Target>
              <ActionIcon
                aria-label="Info"
                size="md"
                radius="xl"
                variant="subtle"
                color="gray"
                c="dimmed"
              >
                <InformationCircleIcon size={20} />
              </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm">
                You can create conditional waivers (effective upon payment) or
                unconditional waivers (effective immediately).
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>

        <Combobox
          store={combobox}
          withinPortal={false}
          onOptionSubmit={(val) => {
            const waiver = mockWaivers.find((w) => w.id === val) || null;
            setSelectedWaiver(waiver);
            combobox.closeDropdown();
            setSearch("");
          }}
        >
          <Combobox.Target>
            <InputBase
              h="auto"
              w="100%"
              component="button"
              type="button"
              pointer
              classNames={{ input: classes.waiverInputWrapper }}
              rightSection={
                selectedWaiver ? (
                  <Tooltip position="left" label="Remove waiver">
                    <CloseButton
                      size="lg"
                      radius="xl"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => setSelectedWaiver(null)}
                      aria-label="Clear value"
                    />
                  </Tooltip>
                ) : (
                  <PlusSignIcon size={20} />
                )
              }
              onClick={() => combobox.toggleDropdown()}
              rightSectionPointerEvents={selectedWaiver ? "all" : "none"}
              size="lg"
              radius="md"
            >
              {selectedWaiver ? (
                <Group wrap="nowrap" gap={8} py="md">
                  <File01Icon
                    size={18}
                    color="gray"
                    style={{ flexShrink: 0 }}
                  />
                  <Text fw="bold" lh={1.2}>
                    {selectedWaiver.title}
                  </Text>
                </Group>
              ) : (
                <Text c="dimmed" component="span" size="md">
                  Add a lien waiver
                </Text>
              )}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Search
              size="lg"
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder="Search your waivers"
              leftSection={<Search01Icon size={16} />}
            />
            <Combobox.Options>
              <ScrollArea.Autosize type="scroll" mah={200}>
                {options.length > 0 ? (
                  options
                ) : (
                  <Combobox.Empty>No waivers found</Combobox.Empty>
                )}
              </ScrollArea.Autosize>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Stack>
    </Paper>
  );
}
