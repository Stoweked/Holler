import { ActionIcon, Avatar, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Logout02Icon, PencilEdit01Icon, UserIcon } from "hugeicons-react";
import FeedbackModal from "./FeedbackModal";
import { ColorSchemeMenuItem } from "./ColorSchemeMenuItem";
import ProfileDrawer from "@/components/profile/AccountDrawer";
import { useRouter } from "next/navigation";
import { logout } from "@/app/auth/logout/actions";
import { useProfile } from "@/contexts/ProfileContext";

export default function AccountAvatar() {
  const router = useRouter();
  const { profile, loading } = useProfile();
  const [
    openedFeedbackModal,
    { open: openFeedbackModal, close: closeFeedbackModal },
  ] = useDisclosure(false);

  const [
    openedProfileDrawer,
    { open: openProfileDrawer, close: closeProfileDrawer },
  ] = useDisclosure(false);

  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
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
              {!loading && profile ? getInitials(profile.full_name) : null}
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

          <Menu.Item leftSection={<Logout02Icon size={16} />} onClick={logout}>
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <FeedbackModal opened={openedFeedbackModal} close={closeFeedbackModal} />

      <ProfileDrawer
        opened={openedProfileDrawer}
        close={closeProfileDrawer}
        profile={profile}
        position="right"
        showButtons={false}
      />
    </div>
  );
}
