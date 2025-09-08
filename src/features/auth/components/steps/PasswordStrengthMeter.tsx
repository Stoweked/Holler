// src/features/auth/components/steps/PasswordStrengthMeter.tsx

import { Box, Progress, Text, Popover, Group } from "@mantine/core";
import { Cancel01Icon, CheckmarkCircle02Icon } from "hugeicons-react";
import React, { useState } from "react";

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text component="div" c={meets ? "teal" : "red"} mt={5} size="sm">
      <Group gap="xs">
        {meets ? (
          <CheckmarkCircle02Icon size={14} />
        ) : (
          <Cancel01Icon size={14} />
        )}
        <Box component="span">{label}</Box>
      </Group>
    </Text>
  );
}

interface PasswordStrengthMeterProps {
  value: string;
  children: React.ReactElement<{
    onFocus?: () => void;
    onBlur?: () => void;
  }>;
}

export function PasswordStrengthMeter({
  value,
  children,
}: PasswordStrengthMeterProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const handleFocus = () => {
    setPopoverOpened(true);
    children.props.onFocus?.();
  };

  const handleBlur = () => {
    setPopoverOpened(false);
    children.props.onBlur?.();
  };

  const target = React.cloneElement(children, {
    onFocus: handleFocus,
    onBlur: handleBlur,
  });

  return (
    <Popover
      opened={popoverOpened && !!value}
      position="bottom"
      width="target"
      trapFocus={false}
      radius="md"
    >
      <Popover.Target>{target}</Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement
          label="Includes at least 6 characters"
          meets={value.length > 5}
        />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
