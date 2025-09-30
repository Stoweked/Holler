// features/waivers/components/WaiverInitialStep.tsx
import {
  ActionIcon,
  Group,
  Input,
  Stack,
  Text,
  Title,
  Tooltip,
  Center,
} from "@mantine/core";
import WaiverItem from "./WaiverItem";
import {
  Cancel01Icon,
  PlusSignIcon,
  Search01Icon,
  ClipboardIcon,
} from "hugeicons-react";
import { useState } from "react";
import classes from "./Waivers.module.css";
import { Waiver } from "../types/waiver";
import OptionButton from "@/components/shared/OptionButton/OptionButton";

interface WaiverInitialStepProps {
  onNew: () => void;
  onTemplate: () => void;
  onEditWaiver: (waiver: Waiver) => void;
  waivers: Waiver[];
}

export default function WaiverInitialStep({
  onNew,
  onTemplate,
  onEditWaiver,
  waivers,
}: WaiverInitialStepProps) {
  const [searchValue, setSearchValue] = useState("");

  const filteredWaivers = waivers.filter((waiver) =>
    waiver.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const hasWaivers = waivers.length > 0;
  const noSearchResults = filteredWaivers.length === 0 && searchValue !== "";

  return (
    <Stack gap="md">
      {/* Search and existing waivers */}
      {hasWaivers && (
        <Stack>
          <Group wrap="nowrap" w="100%">
            <Tooltip label="New waiver" position="right">
              <ActionIcon
                onClick={onNew}
                size={60}
                radius="xl"
                aria-label="Create new waiver"
              >
                <PlusSignIcon size={32} />
              </ActionIcon>
            </Tooltip>
            <Input
              w="100%"
              placeholder="Search lien waivers"
              leftSection={<Search01Icon size={20} />}
              radius="xl"
              size="xl"
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              rightSectionPointerEvents="all"
              rightSection={
                searchValue && (
                  <Tooltip label="Clear search" position="left">
                    <ActionIcon
                      onClick={() => setSearchValue("")}
                      variant="subtle"
                      aria-label="Clear search"
                      radius="xl"
                      size="lg"
                      color="gray"
                    >
                      <Cancel01Icon size={24} />
                    </ActionIcon>
                  </Tooltip>
                )
              }
            />
          </Group>
          {filteredWaivers.length > 0 &&
            filteredWaivers.map((waiver) => (
              <WaiverItem
                key={waiver.id}
                waiver={waiver}
                onEdit={onEditWaiver}
              />
            ))}
        </Stack>
      )}

      {/* Zero-state: No waivers at all */}
      {!hasWaivers && (
        <Center>
          <Stack align="center" my="xl" gap="lg">
            <ClipboardIcon size={40} color="grey" />
            <Stack gap={4} align="center">
              <Title order={2} ta="center">
                Lien waivers made easy
              </Title>
              <Text c="dimmed" ta="center" maw={400}>
                Create, manage, and attach lien waivers to your payments to
                ensure you get paid on time.
              </Text>
            </Stack>

            {/* Create buttons */}
            <Group grow className={classes.buttonGroup}>
              <OptionButton
                icon={<PlusSignIcon size={24} />}
                label="Add new waiver"
                onClick={onNew}
              />
            </Group>
          </Stack>
        </Center>
      )}

      {/* No search results */}
      {noSearchResults && (
        <Center>
          <Stack align="center" my="xl" gap="lg">
            <Search01Icon size={40} color="grey" />
            <Stack gap={0} align="center">
              <Title order={4} ta="center">
                No waivers found
              </Title>
              <Text c="dimmed" ta="center">
                Try adjusting your search terms
              </Text>
            </Stack>
          </Stack>
        </Center>
      )}
    </Stack>
  );
}
