// src/features/projects/components/ProjectInitialStep.tsx
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
import ProjectItem from "./ProjectItem";
import {
  Cancel01Icon,
  PlusSignIcon,
  Search01Icon,
  House03Icon,
} from "hugeicons-react";
import { useState } from "react";
import classes from "./Projects.module.css";
import { Project } from "../types/project";
import OptionButton from "@/components/shared/OptionButton/OptionButton";

interface ProjectInitialStepProps {
  onNew: () => void;
  onEditProject: (project: Project) => void;
  projects: Project[];
}

export default function ProjectInitialStep({
  onNew,
  onEditProject,
  projects,
}: ProjectInitialStepProps) {
  const [searchValue, setSearchValue] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const hasProjects = projects.length > 0;
  const noSearchResults = filteredProjects.length === 0 && searchValue !== "";

  return (
    <Stack gap="md">
      {hasProjects && (
        <Stack>
          <Input
            placeholder="Search projects"
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
          {filteredProjects.length > 0 &&
            filteredProjects.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
                onEdit={onEditProject}
              />
            ))}
        </Stack>
      )}

      {!hasProjects && (
        <Center>
          <Stack align="center" my="xl" gap="lg">
            <House03Icon size={40} color="grey" />
            <Stack gap={4} align="center">
              <Title order={2} ta="center">
                Organize payments with projects
              </Title>
              <Text c="dimmed" ta="center" maw={400}>
                Create projects to track transactions for specific jobs.
              </Text>
            </Stack>
          </Stack>
        </Center>
      )}

      {noSearchResults && (
        <Center>
          <Stack align="center" my="xl" gap="lg">
            <Search01Icon size={40} color="grey" />
            <Stack gap={0} align="center">
              <Title order={4} ta="center">
                No projects found
              </Title>
              <Text c="dimmed" ta="center">
                Try adjusting your search terms.
              </Text>
            </Stack>
          </Stack>
        </Center>
      )}

      <Group grow className={classes.buttonGroup}>
        <OptionButton
          icon={<PlusSignIcon size={24} />}
          label="Add new project"
          onClick={onNew}
        />
      </Group>
    </Stack>
  );
}
