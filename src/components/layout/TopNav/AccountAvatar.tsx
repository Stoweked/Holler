import { Avatar, Menu } from "@mantine/core";
import { Logout02Icon, PencilEdit01Icon, UserIcon } from "hugeicons-react";

export default function AccountAvatar() {
  return (
    <div>
      <Menu shadow="md" width={180} position="bottom-end">
        <Menu.Target>
          <Avatar radius="xl" color="lime" variant="filled">
            JS
          </Avatar>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item leftSection={<UserIcon size={16} />}>
            Your profile
          </Menu.Item>
          <Menu.Item leftSection={<PencilEdit01Icon size={16} />}>
            Share feedback
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item leftSection={<Logout02Icon size={16} />}>
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
