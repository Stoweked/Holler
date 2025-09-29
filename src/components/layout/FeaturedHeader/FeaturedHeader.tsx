// src/components/layout/FeaturedHeader/FeaturedHeader.tsx
import { Group, ScrollArea } from "@mantine/core";
import classes from "./FeaturedHeader.module.css";
import {
  BankIcon,
  ClipboardIcon,
  Coins02Icon,
  House03Icon,
} from "hugeicons-react";
import { useWallet } from "@/features/wallet/contexts/WalletContext";
import { useWaivers } from "@/features/waivers/contexts/WaiversContext";
import { useProjects } from "@/features/projects/contexts/ProjectsContext";
import { useDisclosure } from "@mantine/hooks";
import ConnectBankDrawer from "@/features/banks/components/ConnectBankDrawer";
import FeaturedHeaderCard from "./FeaturedHeaderCard";

export default function FeaturedHeader() {
  const { openActionDrawer } = useWallet();
  const { openDrawer: openWaiversDrawer } = useWaivers();
  const { openDrawer: openProjectsDrawer } = useProjects();
  const [
    openedConnectBankDrawer,
    { open: openConnectBankDrawer, close: closeConnectBankDrawer },
  ] = useDisclosure(false);

  return (
    <>
      <Group wrap="nowrap" className={classes.featuredHeader} grow>
        <ScrollArea.Autosize type="never">
          <Group p="md" gap="md" wrap="nowrap">
            <FeaturedHeaderCard
              icon={<Coins02Icon size={20} />}
              title="Getting started"
              description="Get set up to send & receive payments."
              ariaLabel="Getting started"
              onClick={openConnectBankDrawer}
            />
            <FeaturedHeaderCard
              icon={<ClipboardIcon size={20} />}
              title="Lien waivers"
              description="Require lien waivers before releasing funds."
              ariaLabel="Add lien waivers"
              onClick={() => openWaiversDrawer("payment")}
            />
            <FeaturedHeaderCard
              icon={<BankIcon size={20} />}
              title="Bank deposit"
              description="Fund your Holler account to pay builders and subs"
              ariaLabel="Connect bank account"
              onClick={() => openActionDrawer("deposit")}
            />
            <FeaturedHeaderCard
              icon={<House03Icon size={20} />}
              title="Projects"
              description="Organize transactions by project for easier tracking."
              ariaLabel="Create project"
              onClick={openProjectsDrawer}
            />
          </Group>
        </ScrollArea.Autosize>
      </Group>
      <ConnectBankDrawer
        opened={openedConnectBankDrawer}
        close={closeConnectBankDrawer}
      />
    </>
  );
}
