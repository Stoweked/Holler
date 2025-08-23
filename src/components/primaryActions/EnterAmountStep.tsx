import {
  Avatar,
  Button,
  Group,
  Stack,
  Text,
  NumberInput,
  ActionIcon,
  Tooltip,
  Textarea,
  ThemeIcon,
  Paper,
  Menu,
} from "@mantine/core";
import classes from "./EnterAmount.module.css";
import { useEffect, useRef } from "react";
import { Recipient } from "../contacts/types";
import {
  CancelCircleIcon,
  BankIcon,
  MoreVerticalCircle01Icon,
  PencilEdit02Icon,
  UserIcon,
} from "hugeicons-react";
import { useDisclosure } from "@mantine/hooks";
import ProfileModal from "../profile/ProfileModal";

interface EnterAmountStepProps {
  contact: Recipient;
  amount: string | number;
  setAmount: (value: string | number) => void;
  note: string;
  setNote: (value: string) => void;
  onContinue?: () => void;
  onEdit?: () => void;
  recipientType?: "contact" | "bank";
}

export default function EnterAmountStep({
  contact,
  amount,
  setAmount,
  note,
  setNote,
  onContinue,
  onEdit,
  recipientType = "contact",
}: EnterAmountStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [
    openedProfileModal,
    { open: openProfileModal, close: closeProfileModal },
  ] = useDisclosure(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Stack justify="space-between" gap={60} pt="lg">
        <Stack align="center" gap="xs">
          <NumberInput
            ref={inputRef}
            value={amount}
            onChange={setAmount}
            classNames={{ input: classes.amountInput }}
            variant="unstyled"
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator
            prefix="$"
            hideControls
            type="tel"
            placeholder="$0.00"
            rightSection={
              amount ? (
                <Tooltip label="Clear amount" position="left">
                  <ActionIcon
                    onClick={() => setAmount("")}
                    variant="transparent"
                    c="gray"
                    aria-label="Clear amount"
                  >
                    <CancelCircleIcon size={24} />
                  </ActionIcon>
                </Tooltip>
              ) : null
            }
          />

          <Text c="dimmed" size="md" ta="center">
            Available balance: $40,000.00
          </Text>
        </Stack>

        <Stack>
          <Paper withBorder radius="xl" p="xs" w="100%">
            <Group gap="xs" className={classes.recipientContainer}>
              <Group
                wrap="nowrap"
                gap={8}
                className={classes.recipientDetailsGroup}
              >
                {recipientType === "bank" ? (
                  <ThemeIcon variant="default" radius="xl" size="lg">
                    <BankIcon size={18} />
                  </ThemeIcon>
                ) : (
                  <Avatar variant="default" radius="xl" size={34}>
                    {contact.avatar}
                  </Avatar>
                )}
                <Stack gap={0} className={classes.recipientTextContainer}>
                  <Text fw={500} lineClamp={3} lh={1.2}>
                    {contact.name}
                  </Text>
                  <Text
                    size="xs"
                    c="dimmed"
                    lineClamp={1}
                    className={classes.detailsText}
                  >
                    {contact.details}
                  </Text>
                </Stack>
              </Group>

              <Menu shadow="md" width={155} position="bottom-end" radius="md">
                <Menu.Target>
                  <Tooltip position="left" label="Options">
                    <ActionIcon
                      aria-label="Options"
                      size="lg"
                      variant="subtle"
                      color="grey"
                    >
                      <MoreVerticalCircle01Icon size={24} />
                    </ActionIcon>
                  </Tooltip>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<PencilEdit02Icon size={16} />}
                    onClick={onEdit}
                  >
                    {`Edit ${recipientType === "bank" ? "bank" : "recipient"}`}
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<UserIcon size={16} />}
                    onClick={openProfileModal}
                  >
                    View profile
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Paper>
          <Textarea
            placeholder="Add a note or description (optional)"
            value={note}
            onChange={(event) => setNote(event.currentTarget.value)}
            radius="lg"
            size="md"
            autosize
            minRows={3}
          />

          <Button
            size="xl"
            radius="xl"
            disabled={!amount || Number(amount) === 0}
            onClick={onContinue}
          >
            Continue to review
          </Button>

          <Text c="dimmed" size="sm" ta="center">
            All transactions are secure, encrypted, and private.
          </Text>
        </Stack>
      </Stack>

      <ProfileModal
        opened={openedProfileModal}
        close={closeProfileModal}
        contact={contact}
        showButtons={false}
      />
    </>
  );
}
