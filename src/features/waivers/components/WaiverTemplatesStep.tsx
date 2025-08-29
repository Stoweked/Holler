import { Stack, Title, UnstyledButton } from "@mantine/core";
import classes from "./Waivers.module.css";
import { waiverTemplates } from "@/mockData/mockWaiverTemplates";

interface WaiverTemplatesStepProps {
  onSelectTemplate: (content: string, name: string) => void;
}

export default function WaiverTemplatesStep({
  onSelectTemplate,
}: WaiverTemplatesStepProps) {
  return (
    <Stack>
      {waiverTemplates.map((template) => (
        <UnstyledButton
          key={template.name}
          className={classes.item}
          onClick={() => onSelectTemplate(template.content, template.name)}
        >
          <Title order={5}>{template.name}</Title>
        </UnstyledButton>
      ))}
    </Stack>
  );
}
