import { Menu, Tooltip, ActionIcon } from "@mantine/core";
import {
  FileDownloadIcon,
  FileExportIcon,
  MoreVerticalCircle01Icon,
  SearchRemoveIcon,
} from "hugeicons-react";

interface OptionsProps {
  resetFilters: () => void;
}

export function Options({ resetFilters }: OptionsProps) {
  return (
    <Menu shadow="md" width={180} radius="md" position="bottom-end">
      <Menu.Target>
        <Tooltip position="left" label="Options">
          <ActionIcon
            aria-label="Options"
            variant="subtle"
            color="gray"
            size="lg"
          >
            <MoreVerticalCircle01Icon size={24} />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Options</Menu.Label>
        <Menu.Item leftSection={<FileExportIcon size={16} />}>
          Export as PDF
        </Menu.Item>
        <Menu.Item leftSection={<FileDownloadIcon size={16} />}>
          Download as CSV
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          leftSection={<SearchRemoveIcon size={16} />}
          onClick={resetFilters}
        >
          Clear all filters
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
