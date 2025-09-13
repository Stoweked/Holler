import { Button, Drawer, Stack, Text, Title } from "@mantine/core";
import { House03Icon } from "hugeicons-react";
import { useProjects } from "@/contexts/ProjectsContext";

export default function ProjectsDrawer() {
  const { drawerOpened, closeDrawer } = useProjects();

  const handleOpenFeedback = () => {
    window.dispatchEvent(new CustomEvent("open-feedback"));
    closeDrawer();
  };

  return (
    <Drawer
      opened={drawerOpened}
      onClose={closeDrawer}
      title="Projects"
      padding="md"
      size="lg"
    >
      <Stack align="center" mt="xl" gap="lg">
        <House03Icon size={40} color="grey" />
        <Stack gap={0} align="center">
          <Title order={3} ta="center">
            Coming soon
          </Title>
          <Text c="dimmed" ta="center" size="lg">
            Have ideas on how we can design and build this feature?
          </Text>
          <Button onClick={handleOpenFeedback} mt="lg" size="lg">
            Give us feedback
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
