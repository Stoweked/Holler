import { ActionIcon, Avatar, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Logout02Icon, PencilEdit01Icon, UserIcon } from "hugeicons-react";
import FeedbackModal from "./FeedbackModal";
import { ColorSchemeMenuItem } from "./ColorSchemeMenuItem";
import ProfileDrawer from "@/components/profile/AccountDrawer";
import { useRouter } from "next/navigation";
import { logout } from "@/app/auth/logout/actions";

export default function AccountAvatar() {
  const router = useRouter();
  const [
    openedFeedbackModal,
    { open: openFeedbackModal, close: closeFeedbackModal },
  ] = useDisclosure(false);

  const [
    openedProfileDrawer,
    { open: openProfileDrawer, close: closeProfileDrawer },
  ] = useDisclosure(false);

  const mockProfile = {
    name: "Jonah Stowe",
    avatar: "JS",
    details: "123-456-7890",
    topContact: true,
  };

  return (
    <div>
      <Menu shadow="md" width={170} position="bottom-end">
        <Menu.Target>
          <ActionIcon
            variant="default"
            radius="xl"
            size={38}
            aria-label="Profile menu"
          >
            <Avatar radius="xl" color="lime" variant="filled">
              JS
            </Avatar>
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<UserIcon size={16} />}
            onClick={openProfileDrawer}
          >
            Your account
          </Menu.Item>
          <Menu.Item
            leftSection={<PencilEdit01Icon size={16} />}
            onClick={openFeedbackModal}
          >
            Share feedback
          </Menu.Item>
          <ColorSchemeMenuItem />
          <Menu.Divider />
          <form action={logout}>
            <Menu.Item
              leftSection={<Logout02Icon size={16} />}
              onClick={() => router.push("/login")}
            >
              Log out
            </Menu.Item>
          </form>
        </Menu.Dropdown>
      </Menu>

      <FeedbackModal opened={openedFeedbackModal} close={closeFeedbackModal} />

      <ProfileDrawer
        opened={openedProfileDrawer}
        close={closeProfileDrawer}
        contact={mockProfile}
        position="right"
        showButtons={false}
      />
    </div>
  );
}
