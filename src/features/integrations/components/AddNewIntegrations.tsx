import { useState } from "react";
import Image from "next/image"; // Changed to Next.js Image component for optimization
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

// Import logos from the new assets folder
import autodeskLogo from "../assets/logos/autodesk-logo.svg";
import autodeskLogoDark from "../assets/logos/autodesk-logo-dark.svg";
import buildertrendLogo from "../assets/logos/buildertrend-logo.svg";
import buildertrendLogoDark from "../assets/logos/buildertrend-logo-dark.svg";
import fieldwireLogo from "../assets/logos/fieldwire-logo.svg";
import fieldwireLogoDark from "../assets/logos/fieldwire-logo-dark.svg";
import knowifyLogo from "../assets/logos/knowify-logo.svg";
import knowifyLogoDark from "../assets/logos/knowify-logo-dark.svg";
import procoreLogo from "../assets/logos/procore-logo.svg";
import procoreLogoDark from "../assets/logos/procore-logo-dark.svg";
import quickbooksLogo from "../assets/logos/quickbooks-logo.svg";
import quickbooksLogoDark from "../assets/logos/quickbooks-logo-dark.svg";
import sageLogo from "../assets/logos/sage-logo.svg";
import xeroLogo from "../assets/logos/xero-logo.svg";

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
                      width={120} // Added width for Next.js Image
                      height={40} // Added height for Next.js Image
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
