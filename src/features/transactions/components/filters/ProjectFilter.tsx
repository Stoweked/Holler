// src/features/transactions/components/filters/ProjectFilter.tsx
import {
  Menu,
  Indicator,
  Button,
  TextInput,
  ScrollArea,
  Group,
  Text,
  Stack,
  CloseButton,
} from "@mantine/core";
import { House03Icon, Search01Icon } from "hugeicons-react";
import { useState } from "react";
import { Project } from "@/features/projects/types/project";
import { useProjects } from "@/features/projects/contexts/ProjectsContext"; // <-- Import useProjects

interface ProjectFilterProps {
  activeProjectFilter: string;
  onProjectFilterChange: (project: string) => void;
}

export function ProjectFilter({
  activeProjectFilter,
  onProjectFilterChange,
}: ProjectFilterProps) {
  const [searchValue, setSearchValue] = useState("");
  const { projects } = useProjects(); // <-- Get projects from context

  const filteredProjects = projects
    .filter((project: Project) => {
      const name = project.name;
      return name?.toLowerCase().includes(searchValue.toLowerCase());
    })
    .sort((a, b) => {
      const nameA = a.name;
      const nameB = b.name;
      return (nameA || "").localeCompare(nameB || "");
    });

  const isProjectFilterActive = activeProjectFilter !== "All";

  return (
    <Menu
      shadow="md"
      width={300}
      radius="md"
      position="bottom-end"
      closeOnItemClick
    >
      <Menu.Target>
        <Indicator
          disabled={!isProjectFilterActive}
          color="lime"
          position="top-end"
          size={10}
          offset={6}
        >
          <Button
            size="sm"
            variant="default"
            leftSection={<House03Icon size={16} />}
            aria-label="Filter by projects"
          >
            Projects
          </Button>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown p="sm">
        <TextInput
          placeholder="Search projects"
          leftSection={<Search01Icon size={16} />}
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          onClick={(event) => event.stopPropagation()}
          radius="md"
          size="md"
          mb={8}
          rightSection={
            searchValue ? (
              <CloseButton
                size="sm"
                onClick={() => setSearchValue("")}
                aria-label="Clear search"
              />
            ) : null
          }
        />
        <ScrollArea h={300}>
          {filteredProjects.map((project) => {
            const name = project.name;
            return (
              <Menu.Item
                key={project.id}
                onClick={() => onProjectFilterChange(project.id || "")} // <-- Use project ID
                styles={{ item: { paddingLeft: "6px", paddingRight: "6px" } }}
              >
                <Group wrap="nowrap" gap="xs">
                  <Stack gap={0}>
                    <Text size="sm" fw="bold">
                      {name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {project.address}
                    </Text>
                  </Stack>
                </Group>
              </Menu.Item>
            );
          })}
        </ScrollArea>
      </Menu.Dropdown>
    </Menu>
  );
}
