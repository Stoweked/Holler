"use client";

import { Waiver } from "@/features/waivers/types/waiver";
import {
  Group,
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
  Button,
  Menu,
  Card,
  Title,
} from "@mantine/core";
import {
  ClipboardIcon,
  File01Icon,
  InformationCircleIcon,
  MoreVerticalCircle01Icon,
  PlusSignIcon,
  Search01Icon,
  ViewIcon,
} from "hugeicons-react";
import classes from "./Waivers.module.css";
import { useState } from "react";
import WaiverSelectItem from "./WaiverSelectItem";
import { useDisclosure } from "@mantine/hooks";
import { capitalize } from "@/lib/hooks/textUtils";
import LienWaiverModal from "./LienWaiverModal";
import { useWaivers } from "@/contexts/WaiversContext";

interface LienWaiverDetailsCardProps {
  selectedWaiver: Waiver | null;
  setSelectedWaiver: (waiver: Waiver | null) => void;
}

export default function LienWaiverDetailsCard({
  selectedWaiver,
  setSelectedWaiver,
}: LienWaiverDetailsCardProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [search, setSearch] = useState("");
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const {
    waivers: userWaivers,
    loading: waiversLoading,
    openDrawer,
  } = useWaivers();

  const filteredWaivers = userWaivers.filter((waiver) =>
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
    <>
      {selectedWaiver && (
        <LienWaiverModal
          opened={modalOpened}
          onClose={closeModal}
          waiver={selectedWaiver}
        />
      )}

      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          const waiver = userWaivers.find((w) => w.id === val) || null;
          setSelectedWaiver(waiver);
          combobox.closeDropdown();
          setSearch("");
        }}
      >
        <Combobox.Target>
          <Card withBorder radius="lg" p="xs" w="100%">
            <Group
              gap="sm"
              wrap={!selectedWaiver ? "nowrap" : "wrap"}
              justify="space-between"
            >
              <Group gap="xs" wrap="nowrap" justify="space-between" w="100%">
                {/* Header */}
                <Group wrap="nowrap" gap={8}>
                  <ThemeIcon variant="default" radius="xl" size="lg">
                    <ClipboardIcon size={20} />
                  </ThemeIcon>

                  <Stack gap={0}>
                    <Text size="sm" c="dimmed">
                      {selectedWaiver
                        ? `${capitalize(selectedWaiver.type)} • ${capitalize(
                            selectedWaiver.payment_type
                          )}`
                        : "Optional"}
                    </Text>
                    {/* Title */}
                    <Group wrap="nowrap" gap={4}>
                      <Text size="md" fw="bold" lh={1.2}>
                        Lien waiver
                      </Text>
                      <HoverCard width={310} shadow="md" position="bottom">
                        <HoverCard.Target>
                          <ActionIcon
                            aria-label="Info"
                            size="sm"
                            radius="xl"
                            variant="subtle"
                            color="gray"
                            c="dimmed"
                          >
                            <InformationCircleIcon size={16} />
                          </ActionIcon>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                          <Text size="sm">
                            Attach conditional waivers (effective upon payment)
                            or unconditional waivers (effective immediately).
                          </Text>
                        </HoverCard.Dropdown>
                      </HoverCard>
                    </Group>
                  </Stack>
                </Group>

                {/* Options */}
                {selectedWaiver && (
                  <Menu
                    shadow="md"
                    width={170}
                    position="bottom-end"
                    radius="md"
                  >
                    <Menu.Target>
                      <Tooltip position="left" label="Options">
                        <ActionIcon
                          aria-label="Options"
                          size="lg"
                          variant="subtle"
                          color="grey"
                        >
                          <MoreVerticalCircle01Icon size={24} />
                        </ActionIcon>
                      </Tooltip>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<ViewIcon size={16} />}
                        aria-label="View lien waiver"
                        onClick={openModal}
                      >
                        View lien waiver
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                )}
              </Group>

              {selectedWaiver ? (
                // STATE 2: A waiver is selected, show the InputBase
                <InputBase
                  h="auto"
                  w="100%"
                  component="button"
                  type="button"
                  pointer
                  classNames={{ input: classes.waiverInputWrapper }}
                  rightSection={
                    <Tooltip position="left" label="Remove waiver">
                      <CloseButton
                        size="lg"
                        radius="xl"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => setSelectedWaiver(null)}
                        aria-label="Clear value"
                      />
                    </Tooltip>
                  }
                  onClick={() => combobox.toggleDropdown()}
                  rightSectionPointerEvents="all"
                  size="lg"
                  radius="md"
                >
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
                </InputBase>
              ) : (
                // STATE 1: No waiver selected, show the "Add" Button
                <Button
                  style={{ flexShrink: 0 }}
                  variant="outline"
                  size="sm"
                  leftSection={<PlusSignIcon size={16} />}
                  onClick={() => combobox.openDropdown()}
                  aria-label="Attach a lien waiver"
                  loading={waiversLoading}
                >
                  Attach
                </Button>
              )}
            </Group>
          </Card>
        </Combobox.Target>

        <Combobox.Dropdown
          miw={350}
          style={{
            boxShadow: "var(--mantine-shadow-xl)",
            borderRadius: "var(--mantine-radius-md)",
          }}
        >
          {userWaivers.length > 0 && (
            <Combobox.Search
              size="lg"
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder="Search your waivers"
              leftSection={<Search01Icon size={16} />}
            />
          )}
          <Combobox.Options>
            <ScrollArea.Autosize type="scroll" mah={200}>
              {options.length > 0 ? (
                options
              ) : (
                <Stack align="center" p="md" gap="sm">
                  <Title order={5}>No waivers found</Title>
                  <Button
                    variant="outline"
                    onClick={() => {
                      openDrawer();
                      combobox.closeDropdown();
                    }}
                  >
                    Create new waiver
                  </Button>
                </Stack>
              )}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
