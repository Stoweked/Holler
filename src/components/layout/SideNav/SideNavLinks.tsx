import { Badge, Group, NavLink } from "@mantine/core";
import {
  ArrowRight01Icon,
  BankIcon,
  Call02Icon,
  ClipboardIcon,
  Logout02Icon,
  PencilEdit01Icon,
  UserIcon,
  UserMultiple02Icon,
} from "hugeicons-react";
import classes from "./SideNav.module.css";

export default function SideNavLinks() {
  return (
    <div>
      {/* <NavLink
        href="#required-for-focus"
        label="Your profile"
        leftSection={<UserIcon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
      /> */}

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
        leftSection={<Call02Icon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
      />
      {/* 
      <NavLink
        href="#required-for-focus"
        label="Share feedback"
        leftSection={<PencilEdit01Icon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
      />

      <NavLink
        href="#required-for-focus"
        label="Log out"
        leftSection={<Logout02Icon size={20} />}
        rightSection={<ArrowRight01Icon size={24} color="grey" />}
        className={classes.navLink}
      /> */}
    </div>
  );
}
