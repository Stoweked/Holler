// features/waivers/components/WaiverInitialStep.tsx
import {
  ActionIcon,
  Group,
  Input,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
  Center,
} from "@mantine/core";
import WaiverItem from "./WaiverItem";
import {
  Cancel01Icon,
  DocumentValidationIcon,
  PlusSignIcon,
  Search01Icon,
} from "hugeicons-react";
import { useState } from "react";
import classes from "./Waivers.module.css";
import { mockWaivers } from "@/mockData/mockWaivers";
import { Waiver } from "../types/waiver";

interface WaiverInitialStepProps {
  onNew: () => void;
  onTemplate: () => void;
  onEditWaiver: (waiver: Waiver) => void;
}

export default function WaiverInitialStep({
  onNew,
  onTemplate,
  onEditWaiver,
}: WaiverInitialStepProps) {
  const [searchValue, setSearchValue] = useState("");

  const filteredWaivers = mockWaivers.filter((waiver) =>
    waiver.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Stack gap="xl">
      {/* Existing waivers */}
      <Stack>
        <Input
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
        {filteredWaivers.length > 0 ? (
          filteredWaivers.map((waiver) => (
            <WaiverItem key={waiver.id} waiver={waiver} onEdit={onEditWaiver} />
          ))
        ) : (
          <Center>
            <Stack align="center" mt="xl" gap="lg">
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

      {/* Create buttons */}
      <Group grow className={classes.buttonGroup}>
        <UnstyledButton
          aria-label="Create new waiver"
          className={classes.createButton}
          onClick={onNew}
        >
          <Stack gap="xs" align="center">
            <PlusSignIcon size={24} />
            <Text ta="center">Create new waiver</Text>
          </Stack>
        </UnstyledButton>

        <UnstyledButton
          aria-label="Start from template"
          className={classes.createButton}
          onClick={onTemplate}
        >
          <Stack gap="xs" align="center">
            <DocumentValidationIcon size={24} />
            <Text ta="center">Start from template</Text>
          </Stack>
        </UnstyledButton>
      </Group>
    </Stack>
  );
}
