import {
  ActionIcon,
  Avatar,
  Group,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { ArrowRight01Icon } from "hugeicons-react";
import classes from "./Contacts.module.css";
import { Contact, ContactType } from "../types/contact";
import { getInitials } from "@/lib/hooks/getInitials";

interface ContactItemProps {
  contact: Contact;
  onClick?: () => void;
}

export default function ContactItem({ contact, onClick }: ContactItemProps) {
  const name =
    contact.contactType === ContactType.Person
      ? contact.full_name
      : contact.business_name;

  return (
    <UnstyledButton className={classes.item} onClick={onClick}>
      <Group justify="space-between" wrap="nowrap">
        <Group
          wrap="nowrap"
          align="center"
          className={classes.details}
          gap="xs"
        >
          <Avatar
            src={contact.avatar_url}
            variant="light"
            radius="xl"
            size={44}
            color="lime"
          >
            {getInitials(name)}
          </Avatar>

          <Stack gap={0} style={{ overflow: "hidden" }}>
            <Title order={5} lineClamp={2} lh={1.2}>
              {name}
            </Title>
            <Text size="sm" c="dimmed" w="100%" className={classes.detailsText}>
              {contact.email || contact.phone_number || ""}
            </Text>
          </Stack>
        </Group>

        <ActionIcon
          component="div"
          variant="subtle"
          size="xl"
          radius="xl"
          aria-label="Select contact"
        >
          <ArrowRight01Icon size={32} />
        </ActionIcon>
      </Group>
    </UnstyledButton>
  );
}
