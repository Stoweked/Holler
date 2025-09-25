import { useState } from "react";
import OptionButton from "@/components/shared/OptionButton/OptionButton";
import SectionHeader from "@/features/settings/components/SectionHeader";
import {
  Image,
  SimpleGrid,
  Stack,
  Input,
  Tooltip,
  ActionIcon,
  Center,
  Title,
  Text,
  Button,
} from "@mantine/core";
import classes from "./Integrations.module.css";
import { Search01Icon, Cancel01Icon } from "hugeicons-react";

const allIntegrations = [
  {
    label: "Autodesk",
    image: "/images/integration-logos/autodesk-logo.svg",
    alt: "Autodesk",
  },
  {
    label: "Buildertrend",
    image: "/images/integration-logos/buildertrend-logo.svg",
    alt: "Buildertrend",
  },
  {
    label: "Fieldwire",
    image: "/images/integration-logos/fieldwire-logo.svg",
    alt: "Fieldwire",
  },
  {
    label: "Knowify",
    image: "/images/integration-logos/knowify-logo.svg",
    alt: "Knowify",
  },
  {
    label: "Procore",
    image: "/images/integration-logos/procore-logo.svg",
    alt: "Procore",
  },
  {
    label: "QuickBooks",
    image: "/images/integration-logos/quickbooks-logo.svg",
    alt: "QuickBooks",
  },
  {
    label: "Sage",
    image: "/images/integration-logos/sage-logo.svg",
    alt: "Sage",
  },
  {
    label: "Xero",
    image: "/images/integration-logos/Xero-logo.svg",
    alt: "Xero",
  },
];

export default function AddNewIntegrations() {
  const [searchValue, setSearchValue] = useState("");

  const filteredIntegrations = allIntegrations.filter((integration) =>
    integration.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <Stack>
        <SectionHeader
          heading="Add new integration"
          subHeading="Connect with more third-party services."
        />
        <Stack gap="lg">
          <Input
            placeholder="Search integrations"
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

          {filteredIntegrations.length > 0 ? (
            <SimpleGrid cols={3} spacing="lg">
              {filteredIntegrations.map((integration) => (
                <OptionButton
                  key={integration.label}
                  icon={
                    <Image
                      src={integration.image}
                      alt={integration.alt}
                      className={classes.integrationLogo}
                    />
                  }
                  minHeight={100}
                  onClick={() => console.log("clicked")}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Center>
              <Stack align="center" my="xl" gap="lg">
                <Search01Icon size={40} color="grey" />
                <Stack gap={0} align="center">
                  <Title order={4} ta="center">
                    No integrations found
                  </Title>
                  <Text c="dimmed" ta="center">
                    Try adjusting your search terms or request a new
                    integration.
                  </Text>
                </Stack>
                <Button variant="outline" aria-label="Request integration">
                  Request integration
                </Button>
              </Stack>
            </Center>
          )}
        </Stack>
      </Stack>
    </div>
  );
}
