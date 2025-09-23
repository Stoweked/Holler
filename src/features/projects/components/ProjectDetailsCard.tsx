// src/features/projects/components/ProjectDetailsCard.tsx
"use client";

import { Project } from "@/features/projects/types/project";
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
  Button,
  Card,
  Title,
} from "@mantine/core";
import { House03Icon, PlusSignIcon, Search01Icon } from "hugeicons-react";
import classes from "./Projects.module.css";
import React, { useState } from "react";
import ProjectSelectItem from "./ProjectSelectItem";
import { useProjects } from "@/contexts/ProjectsContext";

interface ProjectDetailsCardProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

function ProjectDetailsCard({
  selectedProject,
  setSelectedProject,
}: ProjectDetailsCardProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [search, setSearch] = useState("");

  const {
    projects: userProjects,
    loading: projectsLoading,
    openDrawer,
  } = useProjects();

  const filteredProjects = userProjects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const options = filteredProjects.map((project, index) => (
    <Stack gap={4} key={project.id} style={{ paddingTop: index > 0 ? 4 : 0 }}>
      <Combobox.Option value={project.id} style={{ borderRadius: 8 }}>
        <ProjectSelectItem project={project} />
      </Combobox.Option>
      {index < filteredProjects.length - 1 && <Divider />}
    </Stack>
  ));

  return (
    <>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          const project = userProjects.find((p) => p.id === val) || null;
          setSelectedProject(project);
          combobox.closeDropdown();
          setSearch("");
        }}
      >
        <Combobox.Target>
          <Card withBorder radius="lg" p="xs" w="100%">
            <Group
              gap="sm"
              wrap={!selectedProject ? "nowrap" : "wrap"}
              justify="space-between"
            >
              <Group gap="xs" wrap="nowrap" justify="space-between" w="100%">
                {/* Header */}
                <Group wrap="nowrap" gap={8}>
                  <ThemeIcon variant="default" radius="xl" size="lg">
                    <House03Icon size={20} />
                  </ThemeIcon>

                  <Stack gap={0}>
                    <Text size="sm" c="dimmed">
                      {selectedProject ? "Project" : "Optional"}
                    </Text>
                    {/* Title */}
                    <Group wrap="nowrap" gap={4}>
                      <Text size="md" fw="bold" lh={1.2}>
                        Attach to project
                      </Text>
                    </Group>
                  </Stack>
                </Group>
              </Group>

              {selectedProject ? (
                // STATE 2: A project is selected, show the InputBase
                <InputBase
                  h="auto"
                  w="100%"
                  component="button"
                  type="button"
                  pointer
                  classNames={{ input: classes.waiverInputWrapper }}
                  rightSection={
                    <Tooltip position="left" label="Remove project">
                      <CloseButton
                        size="lg"
                        radius="xl"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => setSelectedProject(null)}
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
                    <House03Icon
                      size={18}
                      color="gray"
                      style={{ flexShrink: 0 }}
                    />
                    <Text fw="bold" lh={1.2}>
                      {selectedProject.name}
                    </Text>
                  </Group>
                </InputBase>
              ) : (
                // STATE 1: No project selected, show the "Add" Button
                <Button
                  style={{ flexShrink: 0 }}
                  variant="outline"
                  size="sm"
                  leftSection={<PlusSignIcon size={16} />}
                  onClick={() => combobox.openDropdown()}
                  aria-label="Attach a project"
                  loading={projectsLoading}
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
          {userProjects.length > 0 && (
            <Combobox.Search
              size="lg"
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder="Search your projects"
              leftSection={<Search01Icon size={16} />}
            />
          )}
          <Combobox.Options>
            <ScrollArea.Autosize type="scroll" mah={200}>
              {options.length > 0 ? (
                options
              ) : (
                <Stack align="center" p="md" gap="sm">
                  <Title order={5}>No projects found</Title>
                  <Button
                    variant="outline"
                    onClick={() => {
                      openDrawer();
                      combobox.closeDropdown();
                    }}
                  >
                    Create new project
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

export default React.memo(ProjectDetailsCard);
