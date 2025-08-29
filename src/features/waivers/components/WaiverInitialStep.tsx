import {
  ActionIcon,
  Button,
  Group,
  Input,
  Stack,
  Title,
  Tooltip,
} from "@mantine/core";
import WaiverItem from "./WaiverItem";
import { Cancel01Icon, Search01Icon } from "hugeicons-react";
import { useState } from "react";
import classes from "./Waivers.module.css";

const mockWaivers = [
  {
    id: "1",
    title: "Waiver for J2 Homes - August",
    lastModified: "2 days ago",
  },
  {
    id: "2",
    title: "Layton Construction Final Waiver",
    lastModified: "1 week ago",
  },
  {
    id: "3",
    title: "Wasatch Drywall Progress Payment",
    lastModified: "3 weeks ago",
  },
];

interface WaiverInitialStepProps {
  onNew: () => void;
  onTemplate: () => void;
}

export default function WaiverInitialStep({
  onNew,
  onTemplate,
}: WaiverInitialStepProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Stack gap="xl">
      <Group grow className={classes.buttonGroup}>
        <Button onClick={onNew} variant="default" size="lg">
          Create new waiver
        </Button>
        <Button onClick={onTemplate} size="lg">
          Start from template
        </Button>
      </Group>
      <Stack>
        <Title order={4}>Your lien waivers</Title>
        <Input
          placeholder="Search your waivers"
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
        {mockWaivers.map((waiver) => (
          <WaiverItem key={waiver.id} waiver={waiver} />
        ))}
      </Stack>
    </Stack>
  );
}
