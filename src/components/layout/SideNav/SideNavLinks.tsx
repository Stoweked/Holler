import { Badge, Group, NavLink } from "@mantine/core";
import {
  ArrowRight01Icon,
  BankIcon,
  ClipboardIcon,
  Message01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";
import classes from "./SideNav.module.css";

export default function SideNavLinks() {
  return (
    <div>
      <NavLink
        href="#required-for-focus"
        label="Contacts"
        leftSection={<UserMultiple02Icon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
      />

      <NavLink
        href="#required-for-focus"
        label={
          <>
            <Group wrap="nowrap" gap="xs">
              Connected bank accounts{" "}
              <Badge variant="default" size="sm">
                2
              </Badge>
            </Group>
          </>
        }
        leftSection={<BankIcon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
      />

      <NavLink
        href="#required-for-focus"
        label="Lien waiver"
        leftSection={<ClipboardIcon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
      />

      <NavLink
        href="#required-for-focus"
        label="Get support"
        leftSection={<Message01Icon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
      />
    </div>
  );
}
