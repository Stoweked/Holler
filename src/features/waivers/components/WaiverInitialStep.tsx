import {
  ActionIcon,
  Button,
  Group,
  Input,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
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

const mockWaivers = [
  {
    id: "1",
    title: "Waiver for J2 Homes - August",
    lastModified: "2 days ago",
    content:
      "<h2>Waiver for J2 Homes - August</h2><p>This is the content for the August waiver for J2 Homes.</p>",
  },
  {
    id: "2",
    title: "Layton Construction Final Waiver",
    lastModified: "1 week ago",
    content:
      "<h2>Layton Construction Final Waiver</h2><p>This is the final waiver content for Layton Construction.</p>",
  },
  {
    id: "3",
    title: "Wasatch Drywall Progress Payment",
    lastModified: "3 weeks ago",
    content:
      "<h2>Wasatch Drywall Progress Payment</h2><p>Progress payment waiver content for Wasatch Drywall.</p>",
  },
];

interface Waiver {
  id: string;
  title: string;
  lastModified: string;
  content: string;
}

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
        {mockWaivers.map((waiver) => (
          <WaiverItem key={waiver.id} waiver={waiver} onEdit={onEditWaiver} />
        ))}
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
