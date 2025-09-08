import { Card, Stack, Text, Timeline, Title } from "@mantine/core";
import {
  BankIcon,
  InboxCheckIcon,
  Loading01Icon,
  Mail01Icon,
} from "hugeicons-react";

export default function TransactionTimeline() {
  return (
    <Card withBorder radius="lg" p="lg">
      <Stack gap="lg">
        <Title order={5}>Timeline</Title>

        <Timeline
          active={1}
          bulletSize={32}
          lineWidth={2}
          variant="default"
          color="green"
        >
          <Timeline.Item bullet={<Mail01Icon size={16} />} title="Sent payment">
            <Text c="dimmed" size="sm">
              Your payment was sent.
            </Text>

            <Text size="xs" mt={4}>
              2 hours ago
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<Loading01Icon size={16} />}
            title="Processing"
          >
            <Text c="dimmed" size="sm">
              Payment went through processing.
            </Text>

            <Text size="xs" mt={4}>
              52 minutes ago
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Received"
            bullet={<InboxCheckIcon size={16} />}
            lineVariant="dashed"
          >
            <Text c="dimmed" size="sm">
              Payment received.
            </Text>

            <Text size="xs" mt={4}>
              34 minutes ago
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Transferred" bullet={<BankIcon size={16} />}>
            <Text c="dimmed" size="sm">
              The payment was transferred to your account.
            </Text>

            <Text size="xs" mt={4}>
              12 minutes ago
            </Text>
          </Timeline.Item>
        </Timeline>
      </Stack>
    </Card>
  );
}
