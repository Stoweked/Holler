import { useState } from "react";
import { Image } from "@mantine/core";
import OptionButton from "@/components/shared/OptionButton/OptionButton";
import SectionHeader from "@/features/settings/components/SectionHeader";
import {
  SimpleGrid,
  Stack,
  Input,
  Tooltip,
  ActionIcon,
  Center,
  Title,
  Text,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import classes from "./Integrations.module.css";
import { Search01Icon, Cancel01Icon } from "hugeicons-react";

// Ordinary public URLs work in any React host.
const autodeskLogo = "/images/integrations/autodesk-logo.svg";
const autodeskLogoDark = "/images/integrations/autodesk-logo-dark.svg";
const buildertrendLogo = "/images/integrations/buildertrend-logo.svg";
const buildertrendLogoDark = "/images/integrations/buildertrend-logo-dark.svg";
const fieldwireLogo = "/images/integrations/fieldwire-logo.svg";
const fieldwireLogoDark = "/images/integrations/fieldwire-logo-dark.svg";
const knowifyLogo = "/images/integrations/knowify-logo.svg";
const knowifyLogoDark = "/images/integrations/knowify-logo-dark.svg";
const procoreLogo = "/images/integrations/procore-logo.svg";
const procoreLogoDark = "/images/integrations/procore-logo-dark.svg";
const quickbooksLogo = "/images/integrations/quickbooks-logo.svg";
const quickbooksLogoDark = "/images/integrations/quickbooks-logo-dark.svg";
const sageLogo = "/images/integrations/sage-logo.svg";
const xeroLogo = "/images/integrations/xero-logo.svg";

const allIntegrations = [
  {
    label: "Autodesk",
    image: autodeskLogo,
    darkImage: autodeskLogoDark,
    alt: "Autodesk",
  },
  {
    label: "Buildertrend",
    image: buildertrendLogo,
    darkImage: buildertrendLogoDark,
    alt: "Buildertrend",
  },
  {
    label: "Fieldwire",
    image: fieldwireLogo,
    darkImage: fieldwireLogoDark,
    alt: "Fieldwire",
  },
  {
    label: "Knowify",
    image: knowifyLogo,
    darkImage: knowifyLogoDark,
    alt: "Knowify",
  },
  {
    label: "Procore",
    image: procoreLogo,
    darkImage: procoreLogoDark,
    alt: "Procore",
  },
  {
    label: "QuickBooks",
    image: quickbooksLogo,
    darkImage: quickbooksLogoDark,
    alt: "QuickBooks",
  },
  {
    label: "Sage",
    image: sageLogo,
    alt: "Sage",
  },
  {
    label: "Xero",
    image: xeroLogo,
    alt: "Xero",
  },
];

export default function AddNewIntegrations() {
  const [searchValue, setSearchValue] = useState("");
  const { colorScheme } = useMantineColorScheme();

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
            <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="lg">
              {filteredIntegrations.map((integration) => (
                <OptionButton
                  key={integration.label}
                  icon={
                    <Image
                      src={
                        colorScheme === "dark" && integration.darkImage
                          ? integration.darkImage
                          : integration.image
                      }
                      alt={integration.alt}
                      className={classes.integrationLogo}
                      w={120}
                      h={40}
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
