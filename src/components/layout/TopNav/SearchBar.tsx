import { Box, Group, Kbd, Text, UnstyledButton } from "@mantine/core";
import { Search01Icon } from "hugeicons-react";
import classes from "./TopNav.module.css";
import { spotlight } from "@mantine/spotlight";

export default function SearchBar() {
  return (
    <>
      <UnstyledButton
        aria-label="Search"
        className={classes.search}
        onClick={spotlight.open}
      >
        <Group align="center" justify="space-between" w="100%">
          <Group align="center" gap="xs" wrap="nowrap">
            <Search01Icon size={16} />
            <Text style={{ whiteSpace: "nowrap" }}>Search</Text>
          </Group>
          <Box visibleFrom="md" style={{ marginTop: "-4px" }}>
            <Kbd c="dimmed">⌘</Kbd> <Kbd c="dimmed">K</Kbd>
          </Box>
        </Group>
      </UnstyledButton>
    </>
  );
}
